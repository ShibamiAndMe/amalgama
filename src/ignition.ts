/** yggdrasil imports */
import { IYggdrasilOptions, EApplicationType, EViewEngine } from '@yggdrasilts/core/modules/startup';
import { Server } from '@yggdrasilts/mvc';

/** Application imports */
import { YggdrasilServer } from './server';

const options: IYggdrasilOptions = {
	application: {
		type: EApplicationType.WEB,
		database: {
			options: {
				type: 'mongodb',
				database: 'shibamiandme-blog'
			}
		},
		views: {
			homeURL: '/views/home',
			view_engine: EViewEngine.PUG
		}
	}
};

/**
 * Start yggdrasil application
 */
export const app: Promise < Server > = new YggdrasilServer().bootstrap(3000, options);
