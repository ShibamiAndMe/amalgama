import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { IPost, IAuthor, IMeta } from '../';
import { Author, Meta } from './';

@Entity()
export class Post implements IPost {

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
	public author: IAuthor;

	@Column(type => Meta)
	public meta: IMeta;

}
