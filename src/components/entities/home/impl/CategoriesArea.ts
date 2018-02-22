import { ICategoriesArea } from '../IHome';

export class CategoriesArea implements ICategoriesArea {

	public tags: string[];

	constructor() {
		this.tags = new Array<string>();
	}
}
