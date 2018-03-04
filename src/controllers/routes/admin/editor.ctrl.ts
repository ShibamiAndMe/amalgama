/** yggdrasil imports */
import { Request, Response } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

import { MongoEntityManager } from 'typeorm';
import { validate } from 'class-validator';

import { BaseCtrl } from '../../base.ctrl';

import { IPostPage } from '../../../components/components.interfaces';

import { Post } from '../../../repository/entities';

/**
 * @class EditorCtrl
 */
export class EditorCtrl extends BaseCtrl {

	/** PostCtrl logger */
	private logger: FileLogger;

	/** Entity manager to acceed into db */
	private repositoryManager: MongoEntityManager;

	private postData: IPostPage;

	/**
	 * Default constructor
	 * @param repository MongoDBRepository
	 */
	constructor(repository: MongoDBRepository) {
		super();
		this.logger = new FileLogger(EditorCtrl.name);
		this.repositoryManager = repository.getManager();
	}

	/**
	 * Render Editor page
	 *
	 * @method showEditor
	 * @param req Request
	 * @param res Response
	 */
	public showEditor = async (req: Request, res: Response) => {

		const postId = req.params.id;
		let editorData;

		if (postId) {
			this.logger.debug(`Show post ${postId}`);
			const postDBData = await this.repositoryManager.findOneById(Post, postId);
			editorData = {
				content: {
					html: postDBData.content.html,
					text: postDBData.content.text
				},
				tags: postDBData.tags,
				title: postDBData.title
			};
			console.log(editorData);
		}

		res.render('admin/editor', {
			data: this.data,
			title: 'Editor',
			editor: editorData
		});
	}

}
