import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { IPostRepository } from './IPostRepository';

import { Author } from './Author';
import { Meta } from './Meta';

@Entity()
export class Post implements IPostRepository {

	@ObjectIdColumn()
	public id: ObjectID;

	@Column()
	public title: string;

	@Column()
	public content: string;

	@Column()
	public tags: string[];

	@Column()
	public relatedPost: ObjectID[];

	@Column(type => Author)
	public author: Author;

	@Column(type => Meta)
	public meta: Meta;

}
