import fs from 'fs';
import Jimp from 'jimp';

const path = './imageTmp/processed.jpg';

export const processImage = async (imageFile, config) => {
	const { width, height, quality } = config;
	if ((width || height) && quality) {
		// let output;
		const inpImg = await Jimp.read(imageFile.filepath);
		const output = await inpImg
			.resize(width || Jimp.AUTO, height || Jimp.AUTO)
			.quality(quality)
			.writeAsync(path)
			.then((res) => {
				return path;
			})
			.catch((err) => {
				throw err;
			});

		return output;
	}

	throw new Error('Width || height && quality required!');
};
