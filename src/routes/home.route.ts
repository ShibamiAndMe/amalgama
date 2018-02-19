/** yggdrasil imports */
import { BaseRoutes, Router } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

/** Application controllers imports */
import { HomeCtrl, ContactCtrl } from '../controllers/routes';

/**
 * @class HomeRoute
 */
export class HomeRoute extends BaseRoutes {

	/** HomeCtrl logger */
	public logger: FileLogger;

	/** HomeCtrl Ctrl */
	private homeCtrl: HomeCtrl;

	/** ContactCtrl Ctrl */
	private contactCtrl: ContactCtrl;

	/** Default constructor */
	constructor(router: Router, repository: MongoDBRepository) {
		super();
		this.logger = new FileLogger(HomeRoute.name);
		this.homeCtrl = new HomeCtrl(repository);
		this.contactCtrl = new ContactCtrl();

		/** Creates routes */
		this.create(router);
	}

	/**
	 * Creates routes.
	 *
	 * @class HomeCtrl
	 * @method create
	 */
	public create(router: Router) {
		this.logger.debug('Creating HomeCtrl routes.');

		router.route('/home').get(this.homeCtrl.home);
		router.route('/pages').get(this.homeCtrl.pages);
		router.route('/contact').get(this.homeCtrl.contact);

		router.route('/sendContactInfo').post(this.contactCtrl.showContactInfo);
	}

}
