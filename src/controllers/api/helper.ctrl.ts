/** yggdrasil imports */
import { Request, Response } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

import { MongoEntityManager } from 'typeorm';
import { validate } from 'class-validator';

import { BaseCtrl } from '../base.ctrl';

import { Post, Author, Meta, FeaturedImage, Thumb } from '../../repository/entities';

import * as moment from 'moment';

/**
 * @class HelperCtrl
 */
export class HelperCtrl {

	/** HelperCtrl logger */
	private logger: FileLogger;

	/** Entity manager to acceed into db */
	private repositoryManager: MongoEntityManager;

	/**
	 * Default constructor
	 * @param repository MongoDBRepository
	 */
	constructor(repository: MongoDBRepository) {
		this.logger = new FileLogger(HelperCtrl.name);
		this.repositoryManager = repository.getManager();
	}

	// DELETE {{{
	public addTempPost = async (req: Request, res: Response) => {
		await this.tempInsertData();
		res.send({ message: 'Posts inserted' });
	}

	private getContent(): string {
		return `<p>Tiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Liusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, qui s nostrud exercitation ullamLorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>

		<blockquote class="yummy-blockquote mt-30 mb-30">
			<h5 class="mb-30">“Technology is nothing. What's important is that you have a faith in people, that they're basically good and smart, and if you give them tools, they'll do wonderful things with them.”</h5>
			<h6 class="text-muted">Steven Jobs</h6>
		</blockquote>

		<h4>You Can Buy For Less Than A College Degree</h4>
		<p>Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>

		<img class="br-30 mb-30" src="/img/blog-img/11.jpg" alt="">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

		<img class="br-30 mb-30" src="/img/blog-img/12.jpg" alt="">
		<p>Liusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, qui s nostrud exercitation ullamLorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

		<img class="br-30 mb-30" src="/img/blog-img/13.jpg" alt="">
		<h4>You Can Buy For Less Than A College Degree</h4>
		<p>Liusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, qui s nostrud exercitation ullamLorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

		<ul class="mb-30">
			<li>1/3 cup Lonsectetur adipisicing elit.Lorem ipsum</li>
			<li>1/2 cup Veniam, quis nostrud exercitation</li>
			<li>Ut labore et dolore magna</li>
			<li>Lonsectetur adipisicing elit.Lorem ipsum</li>
			<li>Lonsectetur adipisicing elit.Lorem ipsum</li>
			<li>Ut labore et dolore magna</li>
			<li>Lonsectetur adipisicing elit.Lorem ipsum</li>
		</ul>

		<img class="br-30 mb-15" src="/img/blog-img/14.jpg" alt="">`;
	}

	private getStringContent(): string {
		return `equat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.Liusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, qui s nostrud exercitation ullamLorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.You Can Buy For Less Than A College DegreeLiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, qui s nostrud exercitation ullamLorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipisicing elit.`;
	}

	private async tempInsertData() {
		const iter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const titles = [
			'Boil The Kettle And Make A Cup Of Tea Folks, This Is Going To Be A Big One!',
			'Lonsectetur adipisicing elit. Lorem ipsum.',
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
			'Ut labore et dolore magna',
			'Boil The Kettle And Make A Cup Of Tea Folks, This Is Going To Be A Big One!',
			'Lonsectetur adipisicing elit. Lorem ipsum.',
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
			'Ut labore et dolore magna',
			'Boil The Kettle And Make A Cup Of Tea Folks, This Is Going To Be A Big One!',
			'Lonsectetur adipisicing elit. Lorem ipsum.'
		];
		const dates = [ 'May 10, 2017', 'May 11, 2017', 'May 12, 2017', 'May 13, 2017', 'May 14, 2017',
						'May 15, 2017', 'May 16, 2017', 'May 17, 2017', 'May 18, 2017', 'May 19, 2017'
		];
		let imgNum = 1;
		for (const num of iter) {
			const newPost = new Post();
			newPost.title = titles[num - 1];
			newPost.tags = ['Multipurpose', 'Design', 'Ideas'];
			(num === 1) ? newPost.featured = true : newPost.featured = false;
			newPost.author = new Author();

			newPost.meta = new Meta(10, 12, moment(dates[num - 1]).toDate(), new FeaturedImage(new Thumb(`/img/bg-img/slide-${imgNum}.jpg`)));
			(imgNum === 4) ? imgNum = 1 : imgNum++;
			// this.logger.debug(`NEW POST => ${JSON.stringify(newPost, null, 2)}`);
			newPost.content = {
				html: this.getContent(),
				text: this.getStringContent()
			};
			const data = await this.repositoryManager.save(newPost);
		}
	}
	// }}} DELETE

}
