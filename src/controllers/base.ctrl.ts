/** yggdrasil imports */
import { Request, Response } from '@yggdrasilts/mvc';

import { ILayoutComponent, ICommonComponents } from '../components/common/common.interfaces';

interface IData {
	layoutComponent: ILayoutComponent;
	commonComponents: ICommonComponents;
	pageData?: any;
}

/**
 * @class BaseCtrl
 */
export abstract class BaseCtrl {

	public data: IData;

	constructor() {
		this.data = {
			layoutComponent: {
				blogTitle: 'Amalgama'
			},
			commonComponents: {
				logoAreaComponent: {
					title: 'Amalgama'
				}
			}
		};
	}

}
