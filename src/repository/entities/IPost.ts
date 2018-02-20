import { ObjectID } from 'typeorm';

import { IAuthor, IMeta } from './';

export interface IPost {
	id: ObjectID;
	title: string;
	content: string;
	tags: string[];
	author?: IAuthor;
	meta?: IMeta;
}
