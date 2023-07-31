import {createClient, type RedisClientOptions} from 'redis';
import {v4 as uuidv4} from 'uuid';
import type Job from './job';

export type QueueOptions = {
	appName?: string;
	prefix?: string;
	queue?: string;
	connection?: RedisClientOptions;
};

class Queue {
	appName: string;

	prefix: string;

	queue: string;

	client: ReturnType<typeof createClient>;

	constructor(options: QueueOptions = {}) {
		const args = {
			appName: 'laravel',
			prefix: '_database_',
			queue: 'default',
			connection: {
				socket: {
					host: '127.0.0.1',
					port: 6379,
				},
			},
			...options,
		};

		this.appName = args.appName.toLowerCase();
		this.prefix = args.prefix;
		this.queue = args.queue;
		this.client = createClient(args.connection);
	}

	public async dispatch(job: Job) {
		await this.client.connect();
		await this.client.rPush(this.getKey(), JSON.stringify(this.payload(job)));
		await this.client.rPush(this.getNotifyKey(), JSON.stringify(1));
		await this.client.disconnect();
	}

	private getKey(): string {
		return `${this.appName}${this.prefix}queues:${this.queue}`;
	}

	private getNotifyKey(): string {
		return `${this.getKey()}:notify`;
	}

	private payload(job: Job) {
		return {
			uuid: uuidv4(),
			displayName: job.getCommandName(),
			job: 'Illuminate\\Queue\\CallQueuedHandler@call',
			maxTries: null,
			maxExceptions: null,
			failOnTimeout: false,
			backoff: null,
			timeout: null,
			retryUntil: null,
			data: {
				commandName: job.getCommandName(),
				command: job.getCommand(),
			},
			id: uuidv4(),
			attempts: 0,
		};
	}
}

export default Queue;
