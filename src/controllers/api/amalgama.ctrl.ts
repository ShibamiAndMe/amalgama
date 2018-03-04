/** yggdrasil imports */
import { Request, Response } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

import { MongoEntityManager } from 'typeorm';
import { validate } from 'class-validator';

import { Post, Author, Meta, FeaturedImage, Thumb } from '../../repository/entities';

import * as moment from 'moment';

/**
 * @class AmalgamaCtrl
 */
export class AmalgamaCtrl {

	/** AmalgamaCtrl logger */
	private logger: FileLogger;

	/** Entity manager to acceed into db */
	private repositoryManager: MongoEntityManager;

	/**
	 * Default constructor
	 * @param repository MongoDBRepository
	 */
	constructor(repository: MongoDBRepository) {
		this.logger = new FileLogger(AmalgamaCtrl.name);
		this.repositoryManager = repository.getManager();
	}

	public addPost = async (req: Request, res: Response) => {
		console.log(req.body);

		const post = new Post();
		post.title = req.body.title.text;
		post.tags = req.body.tags;
		post.content = {
			html: req.body.content.html,
			text: req.body.content.text
		};
		post.author = new Author();

		let savedPost;

		try {
			savedPost = await this.repositoryManager.save(post);
		} catch (err) {
			savedPost = { error: err };
		}

		res.send(savedPost);
	}

}
