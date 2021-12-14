import { Readable } from 'stream';

export const bufferToStream = (buffer) => {
	const readable = new Readable();
	readable._read = () => {};
	readable.push(buffer);
	readable.push(null);

	return readable;
};
