import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { IMetaRepository } from './IMetaRepository';

@Entity()
export class Meta implements IMetaRepository {

	@ObjectIdColumn()
	public id: ObjectID;

}
