import {DataSource} from 'typeorm';
import {Job as JobEntity} from '../entities';
import type Queue from '../queue';
import {type Driver} from '../queue';
import type Job from '../job';
import 'reflect-metadata';

class Database {
	private readonly dataSource: DataSource;

	constructor(private readonly queue: Queue, {options}: Extract<Driver, {type: 'database'}>) {
		this.dataSource = new DataSource({entities: [JobEntity], ...options});
	}

	public async push(job: Job): Promise<void> {
		const now = Math.floor(Date.now() / 1000);

		await this.dataSource.initialize();
		await this.dataSource.getRepository(JobEntity).save(
			this.dataSource.getRepository(JobEntity).create({
				queue: this.queue.queue,
				payload: JSON.stringify(this.queue.payload(job)),
				attempts: 0,
				availableAt: now,
				createdAt: now,
			}),
		);
		await this.dataSource.destroy();
	}
}

export default Database;
