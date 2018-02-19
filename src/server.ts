/** yggdrasil imports */
import { FileLogger, Bootstrap } from '@yggdrasilts/core';
import { IBootstrapRoute } from '@yggdrasilts/core/modules/startup';
import { Router } from '@yggdrasilts/mvc';
import { MongoDBRepository } from '@yggdrasilts/data';

/** Application imports */
import { HomeRoute } from './routes/home.route';

/**
 * @class YggdrasilServer
 */
export class YggdrasilServer extends Bootstrap {

	/** YggdrasilServer logger */
	public logger: FileLogger;

	/** Default constructor */
	constructor() {
		super();
		this.logger = new FileLogger(YggdrasilServer.name);
	}

	/**
	 * Creates routes
	 * @param router Express Router
	 */
	public routes(router: Router, repository: MongoDBRepository) {
		const homeRoute = new HomeRoute(router, repository);
	}

}
