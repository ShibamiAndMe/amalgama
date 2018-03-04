/** yggdrasil imports */
import { BaseRoutes, Router } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

/** Application controllers imports */
import { AmalgamaCtrl } from '../../controllers/api/amalgama.ctrl';

/**
 * @class AmalgamaAPIRoute
 */
export class AmalgamaAPIRoute extends BaseRoutes {

	/** AmalgamaAPIRoute logger */
	public logger: FileLogger;

	/** AmalgamaCtrl Ctrl */
	private amalgamaCtrl: AmalgamaCtrl;

	/** Default constructor */
	constructor(router: Router, repository: MongoDBRepository) {
		super();
		this.logger = new FileLogger(AmalgamaAPIRoute.name);
		this.amalgamaCtrl = new AmalgamaCtrl(repository);

		/** Creates routes */
		this.create(router);
	}

	/**
	 * Creates routes.
	 *
	 * @class AmalgamaAPIRoute
	 * @method create
	 */
	public create(router: Router) {
		this.logger.debug('Creating AmalgamaAPIRoute routes.');

		router.route('/post/add').post(this.amalgamaCtrl.addPost);

	}

}
