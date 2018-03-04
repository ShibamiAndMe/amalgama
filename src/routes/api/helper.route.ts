/** yggdrasil imports */
import { BaseRoutes, Router } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

/** Application controllers imports */
import { HelperCtrl } from '../../controllers/api/helper.ctrl';

/**
 * @class HelperRoute
 */
export class HelperRoute extends BaseRoutes {

	/** HelperRoute logger */
	public logger: FileLogger;

	/** HelperCtrl Ctrl */
	private helperCtrl: HelperCtrl;

	/** Default constructor */
	constructor(router: Router, repository: MongoDBRepository) {
		super();
		this.logger = new FileLogger(HelperRoute.name);
		this.helperCtrl = new HelperCtrl(repository);

		/** Creates routes */
		this.create(router);
	}

	/**
	 * Creates routes.
	 *
	 * @class HelperRoute
	 * @method create
	 */
	public create(router: Router) {
		this.logger.debug('Creating HelperCtrl routes.');

		router.route('/add').get(this.helperCtrl.addTempPost);

	}

}
