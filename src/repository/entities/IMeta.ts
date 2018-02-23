import { IFeaturedImage } from './';

export interface IMeta {
	likes: number;
	numberOfComments: number;
	createdDate: Date;
	featuredImage: IFeaturedImage;
}
