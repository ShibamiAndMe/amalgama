/** yggdrasil imports */
import { Request, Response } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

import { MongoEntityManager } from 'typeorm';
import { validate } from 'class-validator';

import { BaseCtrl } from '../base.ctrl';
import { IHome } from '../../components/components.interfaces';
import { Post } from '../../repository/entities/Post';

/**
 * @class HomeCtrl
 */
export class HomeCtrl extends BaseCtrl {

	/** HomeCtrl logger */
	private logger: FileLogger;

	/** Entity manager to acceed into db */
	private repositoryManager: MongoEntityManager;

	private homeData: IHome;

	/**
	 * Default constructor
	 * @param repository MongoDBRepository
	 */
	constructor(repository: MongoDBRepository) {
		super();
		this.logger = new FileLogger(HomeCtrl.name);
		this.repositoryManager = repository.getManager();
	}

	/**
	 * Render Home page
	 *
	 * @method home
	 * @param req Request
	 * @param res Response
	 */
	public home = async (req: Request, res: Response) => {
		this.logger.debug('go to home.');

		const posts = await this.repositoryManager.find(Post);
		this.logger.debug(`Posts in db => ${JSON.stringify(posts)}`);

		res.render('home/home', {
			data: this.data,
			title: 'Home'
		});
	}

	/**
	 * Render Pages page
	 *
	 * @method pages
	 * @param req Request
	 * @param res Response
	 */
	public pages = (req: Request, res: Response) => {
		this.logger.debug('go to pages.');

		res.render('pages/pages', {
			data: this.data,
			title: 'Pages'
		});
	}

	/**
	 * Render Contact page
	 *
	 * @method contact
	 * @param req Request
	 * @param res Response
	 */
	public contact = (req: Request, res: Response) => {
		this.logger.debug('go to contact.');

		res.render('contact', {
			data: this.data,
			title: 'Contact'
		});
	}

}
