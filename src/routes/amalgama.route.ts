/** yggdrasil imports */
import { BaseRoutes, Router } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

/** Application routes imports */
import { HomeRoute } from './home.route';
import { PagesRoute } from './pages.route';

/**
 * @class AmalgamaRoute
 */
export class AmalgamaRoute extends BaseRoutes {

	/** AmalgamaRoute logger */
	public logger: FileLogger;

	/** AmalgamaRoutes */
	public homeRoutes: HomeRoute;
	public pagesRoutes: PagesRoute;

	/** Default constructor */
	constructor(router: Router, repository: MongoDBRepository) {
		super();
		this.logger = new FileLogger(AmalgamaRoute.name);

		this.homeRoutes = new HomeRoute(repository);
		this.pagesRoutes = new PagesRoute(repository);

		/** Creates routes */
		this.create(router);
	}

	/**
	 * Creates routes.
	 *
	 * @class AmalgamaRoute
	 * @method create
	 */
	public create(router: Router) {
		this.logger.debug('Creating AmalgamaRoute routes.');

		this.homeRoutes.createRoutes(router);
		this.pagesRoutes.createRoutes(router);

	}

}
