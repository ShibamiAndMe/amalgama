/** yggdrasil imports */
import { Request, Response } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';

import { BaseCtrl } from '../base.ctrl';
import { IHome } from '../../components/components.interfaces';

/**
 * @class HomeCtrl
 */
export class HomeCtrl extends BaseCtrl {

	/** HomeCtrl logger */
	private logger: FileLogger;

	private homeData: IHome;

	/** Default constructor */
	constructor() {
		super();
		this.logger = new FileLogger(HomeCtrl.name);
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
			data: this.data,
			title: 'Home'
		});
	}

	/**
	 * Render pages page
	 *
	 * @method pages
	 * @param req Request
	 * @param res Response
	 */
	public pages = (req: Request, res: Response) => {
		this.logger.debug('go to pages.');

		res.render('pages/pages', {
			data: this.data,
			title: 'Pages'
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
