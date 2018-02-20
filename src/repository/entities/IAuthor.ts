import { ObjectID } from 'typeorm';

export interface IAuthor {
	id: ObjectID;
	name: string;
}
