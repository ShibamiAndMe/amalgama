import { Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { IFeaturedImage, IThumb } from '../';

export class FeaturedImage implements IFeaturedImage {

	@Column()
	public thumb: IThumb;

	constructor(thumb: IThumb) {
		this.thumb = thumb;
	}
}
