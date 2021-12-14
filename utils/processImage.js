import fs from 'fs';
import Jimp from 'jimp';
import { bufferToStream } from './bufferToStream';

const path = './imageTmp/processed.jpg';

export const processImage = async (imageFile, config) => {
	const { width, height, quality } = config;
	if ((width || height) && quality) {
		// let output;
		const inpImg = await Jimp.read(imageFile.filepath);
		const output = await inpImg
			.resize(width || Jimp.AUTO, height || Jimp.AUTO)
			.quality(quality)
			.getBufferAsync(Jimp.MIME_JPEG, (err, buffer) => {
				if (err) throw err;
				return buffer;
			});

		const readableStream = bufferToStream(output);

		return readableStream;
	}

	throw new Error('Width || height && quality required!');
};
