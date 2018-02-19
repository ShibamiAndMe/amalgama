import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Post {

	@ObjectIdColumn()
	public id: ObjectID;

	@Column()
	@IsNotEmpty()
	public title: string;

	@Column()
	@IsNotEmpty()
	public text: string;

}
