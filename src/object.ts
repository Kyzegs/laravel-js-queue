// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ObjectMock {
	constructor(data: Record<string, unknown>) {
		Object.entries(data).forEach(([key, value]) => {
			this[key] = value;
		});
	}
}

export default ObjectMock;
