/** yggdrasil imports */
import { Router } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

/** Application controllers imports */
import { HomeCtrl, ContactCtrl } from '../controllers/routes';

/**
 * @class HomeRoute
 */
export class HomeRoute {

	/** HomeRoute logger */
	public logger: FileLogger;

	/** HomeCtrl Ctrl */
	private homeCtrl: HomeCtrl;

	/** Default constructor */
	constructor(repository: MongoDBRepository) {
		this.logger = new FileLogger(HomeRoute.name);
		this.homeCtrl = new HomeCtrl(repository);
	}

	/**
	 * Creates routes.
	 *
	 * @class HomeRoute
	 * @method createRoutes
	 */
	public createRoutes(router: Router) {
		this.logger.debug('Creating Home routes.');

		router.route('/home').get(this.homeCtrl.home);
	}

}
