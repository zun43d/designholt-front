import fs from 'fs';
import Jimp from 'jimp';
import { bufferToStream } from './bufferToStream';

export const processImage = async (imageFile, config, watermarkPath) => {
	const { width, height, quality } = config;
	if ((width || height) && quality) {
		const inpImg = await Jimp.read(imageFile.filepath);

		let imgTmp;

		try {
			imgTmp = inpImg.resize(width || Jimp.AUTO, height || Jimp.AUTO);
		} catch (err) {
			console.log('#18', err);
		}

		if (watermarkPath) {
			const watermarkImg = await Jimp.read(watermarkPath);

			try {
				imgTmp.composite(watermarkImg, 0, 0, {
					mode: Jimp.BLEND_SOURCE_OVER,
					opacityDest: 1,
					opacitySource: 0.25,
				});
			} catch (err) {
				console.log('#24', err);
			}
		}

		try {
			imgTmp.quality(quality);
		} catch (err) {
			console.log('#30', err);
		}

		return await imgTmp.getBufferAsync(Jimp.MIME_JPEG).then((buffer) => {
			console.log('Got the image output buffer');
			return bufferToStream(buffer);
		});
	}

	throw new Error('Width || height && quality required!');
};
