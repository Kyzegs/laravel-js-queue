type ModelOptions = {
	class: string;
	id: number | string;
	relations?: string[];
	connection?: string;
	collectionClass?: string;
};

class Model {
	public class: string;
	public id: number | string;
	public relations: string[];
	public connection: string;
	// eslint-disable-next-line @typescript-eslint/ban-types
	public collectionClass: string | null;

	constructor(options: ModelOptions) {
		const args = {
			relations: [],
			connection: 'mysql',
			collectionClass: null,
			...options,
		};

		this.class = args.class;
		this.id = args.id;
		this.relations = args.relations;
		this.connection = args.connection;
		this.collectionClass = args.collectionClass;
	}
}

export default Model;
