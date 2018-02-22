import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { IPost, IAuthor, IMeta, IPostContent } from '../';
import { Author, Meta } from './';

@Entity()
export class Post implements IPost {

	@ObjectIdColumn()
	public id: ObjectID;

	@Column()
	public title: string;

	@Column()
	public content: IPostContent;

	@Column()
	public tags: string[];

	@Column()
	public featured: boolean;

	@Column()
	public relatedPost: ObjectID[];

	@Column(type => Author)
	public author: IAuthor;

	@Column(type => Meta)
	public meta: IMeta;

}
