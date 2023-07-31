import {createClient} from 'redis';
import type Queue from '../queue';
import {type Driver} from '../queue';
import type Job from '../job';
import {v4 as uuidv4} from 'uuid';

class Redis {
	private readonly client: ReturnType<typeof createClient>;
	private readonly prefix: string;

	constructor(private readonly queue: Queue, {options, prefix}: Extract<Driver, {type: 'redis'}>) {
		this.client = createClient(options);
		this.prefix = prefix!;
	}

	public async push(job: Job): Promise<void> {
		const key = `${this.queue.appName}${this.prefix}queues:${this.queue.queue}`;
		const notifyKey = `${key}:notify`;

		await this.client.connect();
		await this.client.rPush(key, JSON.stringify(Object.assign(this.queue.payload(job), {attempts: 0, id: uuidv4()})));
		await this.client.rPush(notifyKey, JSON.stringify(1));
		await this.client.disconnect();
	}
}

export default Redis;
