/** yggdrasil imports */
import { Request, Response } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';

import { IHome } from '../../components/components.interfaces';

/**
 * @class HomeCtrl
 */
export class HomeCtrl {

	/** HomeCtrl logger */
	private logger: FileLogger;

	private homeData: IHome;

	/** Default constructor */
	constructor() {
		this.logger = new FileLogger(HomeCtrl.name);

		this.homeData = {
			commonComponents: {
				logoAreaComponent: {
					title: 'Shibami & Me'
				}
			}
		};
	}

	/**
	 * Render Home page
	 *
	 * @method home
	 * @param req Request
	 * @param res Response
	 */
	public home = (req: Request, res: Response) => {
		this.logger.debug('go to home.');

		res.render('home/home', {
			data: this.homeData,
			title: 'Home'
		});
	}

	/**
	 * Render Contact page
	 *
	 * @method contact
	 * @param req Request
	 * @param res Response
	 */
	public contact = (req: Request, res: Response) => {
		this.logger.debug('go to contact.');

		res.render('contact', {
			title: 'Contact'
		});
	}

}
