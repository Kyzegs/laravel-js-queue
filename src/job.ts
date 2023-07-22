import {serialize} from 'php-serialize';
import ObjectMock from './object';
import Model from './model';

export type JobOptions = {
	name: string;
	namespace?: string;
	data?: Record<string, unknown>;
};

class Job {
	name: string;

	namespace: string;

	data: Record<string, unknown>;

	constructor(options: JobOptions) {
		const args = {
			namespace: 'App\\Jobs\\',
			data: {},
			...options,
		};

		this.name = args.name;
		this.namespace = args.namespace;
		this.data = args.data;
	}

	public getCommandName() {
		return `${this.namespace}${this.name}`;
	}

	public getCommand(): string {
		return serialize(new ObjectMock(this.data), {
			[this.getCommandName()]: ObjectMock,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'Illuminate\\Contracts\\Database\\ModelIdentifier': Model,
		});
	}
}

export default Job;
