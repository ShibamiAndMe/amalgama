import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { IAuthorRepository } from './IAuthorRepository';

@Entity()
export class Author implements IAuthorRepository {

	@ObjectIdColumn()
	public id: ObjectID;

	@Column()
	public name: string;

}
