/** yggdrasil imports */
import { Request, Response } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

import { MongoEntityManager } from 'typeorm';
import { validate } from 'class-validator';

import { BaseCtrl } from '../../base.ctrl';

import { IPostPage } from '../../../components/components.interfaces';

/**
 * @class EditorCtrl
 */
export class EditorCtrl extends BaseCtrl {

	/** PostCtrl logger */
	private logger: FileLogger;

	private postData: IPostPage;

	/**
	 * Default constructor
	 */
	constructor() {
		super();
		this.logger = new FileLogger(EditorCtrl.name);
	}

	/**
	 * Render Editor page
	 *
	 * @method showEditor
	 * @param req Request
	 * @param res Response
	 */
	public showEditor = async (req: Request, res: Response) => {
		res.render('admin/editor', {
			data: this.data,
			title: 'Editor'
		});
	}

}
