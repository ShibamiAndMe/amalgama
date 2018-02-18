/** yggdrasil imports */
import {
	Request,
	Response
} from '@yggdrasilts/mvc';
import {
	FileLogger
} from '@yggdrasilts/core';

/**
 * @class ContactCtrl
 */
export class ContactCtrl {

	/** ContactCtrl logger */
	private logger: FileLogger;

	/** Default constructor */
	constructor() {
		this.logger = new FileLogger(ContactCtrl.name);
	}

	/**
	 * Show contact info
	 *
	 * @method showContacInfo
	 * @param req Request
	 * @param res Response
	 */
	public showContactInfo = (req: Request, res: Response) => {
		this.logger.debug('go to showContactInfo.');

		this.logger.info(JSON.stringify(req.body));

		res.render('contact', {
			title: 'Contact'
		});
	}

}
