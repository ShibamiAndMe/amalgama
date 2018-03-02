/** yggdrasil imports */
import { Router } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

/** Application controllers imports */
import { PostCtrl } from '../controllers/routes';
import { EditorCtrl } from '../controllers/routes/admin/editor.ctrl';

/**
 * @class PagesRoute
 */
export class PagesRoute {

	/** PagesRoute logger */
	public logger: FileLogger;

	/** PostCtrl Ctrl */
	private postCtrl: PostCtrl;

	/** EditorCtrl Ctrl */
	private editorCtrl: EditorCtrl;

	/** Default constructor */
	constructor(repository: MongoDBRepository) {
		this.logger = new FileLogger(PagesRoute.name);
		this.postCtrl = new PostCtrl(repository);
		this.editorCtrl = new EditorCtrl();
	}

	/**
	 * Creates routes.
	 *
	 * @class PagesRoute
	 * @method createRoutes
	 */
	public createRoutes(router: Router) {
		this.logger.debug('Creating PagesRoute routes.');

		router.route('/post/:id').get(this.postCtrl.showPost);

		router.route('/editor').get(this.editorCtrl.showEditor);

	}

}
