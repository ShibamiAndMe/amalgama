import { Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { IThumb } from '../';

export class Thumb implements IThumb {

	@Column()
	public image: string;

	@Column()
	public alt?: string;

	constructor(image: string, alt?: string) {
		this.image = image;
		this.alt = alt;
	}
}
