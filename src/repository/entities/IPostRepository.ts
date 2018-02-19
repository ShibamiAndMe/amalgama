import { ObjectID } from 'typeorm';

import { IPost } from '../../components/entities/IPost';
import { IAuthorRepository } from './IAuthorRepository';
import { IMetaRepository } from './IMetaRepository';

export interface IPostRepository extends IPost {
	id: ObjectID;
	title: string;
	content: string;
	tags: string[];
	relatedPost: ObjectID[];
	author: IAuthorRepository;
	meta: IMetaRepository;
}
