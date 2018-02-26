/** yggdrasil imports */
import { FileLogger, Bootstrap } from '@yggdrasilts/core';
import { IBootstrapRoute } from '@yggdrasilts/core/modules/startup';
import { Router } from '@yggdrasilts/mvc';
import { MongoDBRepository } from '@yggdrasilts/data';

/** Application imports */
import { AmalgamaRoute } from './routes/amalgama.route';
import { HelperRoute } from './routes/api/helper.route';

import * as express from 'express';
import * as moment from 'moment';

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
		const amalgamaRoute = new AmalgamaRoute(router, repository);
	}

	public api(router: Router, repository: MongoDBRepository): IBootstrapRoute {
		const helperRoute = new HelperRoute(router, repository);
		return { prefix: '/api' };
	}

	public config(app: express.Application) {
		app.locals.moment = moment;
	}

}
