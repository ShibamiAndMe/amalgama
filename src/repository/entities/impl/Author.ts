import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { IAuthor } from '../';

@Entity()
export class Author implements IAuthor {

	@ObjectIdColumn()
	public id: ObjectID;

	@Column()
	public name: string;

}
