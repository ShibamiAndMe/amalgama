import { IAuthor } from './IAuthor';
import { IMeta } from './IMeta';

export interface IPost {
	title: string;
	content: string;
	tags: string[];
	author: IAuthor;
	meta: IMeta;
}
