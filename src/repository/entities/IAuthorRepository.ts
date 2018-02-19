import { ObjectID } from 'typeorm';
import { IAuthor } from '../../components/entities/IAuthor';

export interface IAuthorRepository extends IAuthor {
	id: ObjectID;
}
