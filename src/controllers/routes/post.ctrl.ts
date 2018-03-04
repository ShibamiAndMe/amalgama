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

		let postDBData = await this.repositoryManager.findOneById(Post, postId);
		this.logger.debug(`BEFORE => ${JSON.stringify(postDBData, null, 2)}`);

		postDBData = await this.encodePostData(postDBData);

		this.logger.debug(`AFTER => ${JSON.stringify(postDBData, null, 2)}`);

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

	private async encodePostData(post: Post): Promise<Post> {
		// Encode emoticons
		post.content.html = await this.replaceAll(post.content.html, 'src="../js/third-party/tinymce/plugins/emoticons/img/', 'src="/js/third-party/tinymce/plugins/emoticons/img/');
		return post;
	}

	private replaceAll(data: string, search: string, replacement: string) {
		return data.split(search).join(replacement);
	}

}
