/** yggdrasil imports */
import { Request, Response } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

import { MongoEntityManager } from 'typeorm';
import { validate } from 'class-validator';

import { BaseCtrl } from '../base.ctrl';

import { IPostPage } from '../../components/components.interfaces';

import { Post } from '../../repository/entities';

/**
 * @class PostCtrl
 */
export class PostCtrl extends BaseCtrl {

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
		this.logger = new FileLogger(PostCtrl.name);
		this.repositoryManager = repository.getManager();
	}

	/**
	 * Render Post page
	 *
	 * @method showPost
	 * @param req Request
	 * @param res Response
	 */
	public showPost = async (req: Request, res: Response) => {
		this.logger.debug('go to pages.');

		const postId = req.params.id;
		this.logger.debug(`Show post ${postId}`);

		const postDBData = await this.repositoryManager.findOneById(Post, postId);
		// this.logger.debug(`${JSON.stringify(postDBData, null, 2)}`);

		this.postData = {
			post: postDBData
		};

		this.data.pageData = this.postData;
		// this.logger.debug(`pageData => ${JSON.stringify(this.data.pageData, null, 2)}`);

		res.render('pages/blog', {
			data: this.data,
			title: 'Pages'
		});
	}

}
