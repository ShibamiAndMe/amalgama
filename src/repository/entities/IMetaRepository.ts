import { ObjectID } from 'typeorm';
import { IMeta } from '../../components/entities/IMeta';

export interface IMetaRepository extends IMeta {
	id: ObjectID;
}
