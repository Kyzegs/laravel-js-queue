import {type RedisClientOptions} from 'redis';
import {v4 as uuidv4} from 'uuid';
import type Job from './job';
import {type DataSourceOptions} from 'typeorm';
import Redis from './drivers/redis';
import Database from './drivers/database';

export type Driver =
	| {
		type: 'database';
		options: DataSourceOptions;
		prefix: never;
	}
	| {
		type: 'redis';
		options?: RedisClientOptions;
		prefix?: string;
	};

export type QueueOptions = {
	appName?: string;
	queue?: string;
	driver?: Driver;
};

class Queue {
	appName: string;

	queue: string;

	driver: Database | Redis;

	constructor(options: QueueOptions = {}) {
		const {
			appName,
			queue,
			driver,
		}: QueueOptions = {
			appName: 'laravel',
			queue: 'default',
			driver: {
				type: 'redis',
				options: {
					socket: {
						host: '127.0.0.1',
						port: 6379,
					},
				},
				prefix: '_database_',
			},
			...options,
		};

		this.appName = appName.toLowerCase();
		this.queue = queue;

		// eslint-disable-next-line default-case
		switch (driver.type) {
			case 'database':
				this.driver = new Database(this, driver);
				break;
			case 'redis':
				this.driver = new Redis(this, driver);
				break;
		}
	}

	public async dispatch(job: Job) {
		await this.driver.push(job);
	}

	payload(job: Job) {
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
		};
	}
}

export default Queue;
