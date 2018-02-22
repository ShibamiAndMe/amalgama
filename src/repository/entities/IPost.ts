import { ObjectID } from 'typeorm';

import { IAuthor, IMeta } from './';

export interface IPostContent {
	html: string;
	text: string;
}

export interface IPost {
	id: ObjectID;
	title: string;
	content: IPostContent;
	tags: string[];
	featured: boolean;
	relatedPost: ObjectID[];
	author?: IAuthor;
	meta?: IMeta;
}
