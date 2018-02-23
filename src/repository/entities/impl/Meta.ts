import { Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { IMeta, IFeaturedImage } from '../';

export class Meta implements IMeta {

	@Column()
	public likes: number;

	@Column()
	public numberOfComments: number;

	@Column()
	public createdDate: Date;

	@Column()
	public featuredImage: IFeaturedImage;

	constructor(likes: number, numberOfComments: number, createdDate: Date, featuredImage: IFeaturedImage) {
		this.likes = likes;
		this.numberOfComments = numberOfComments;
		this.createdDate = createdDate;
		this.featuredImage = featuredImage;
	}
}
