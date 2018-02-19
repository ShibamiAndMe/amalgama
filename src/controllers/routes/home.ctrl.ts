/** yggdrasil imports */
import { Request, Response } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

import { MongoEntityManager } from 'typeorm';
import { validate } from 'class-validator';

import { BaseCtrl } from '../base.ctrl';
import { IHome } from '../../components/components.interfaces';
import { Post } from '../../repository/entities/Post';
import { Author } from '../../repository/entities/Author';
import { Meta } from '../../repository/entities/Meta';

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

		// DELETE
		/*const post = new Post();
		post.title = 'Boil The Kettle And Make A Cup Of Tea Folks, This Is Going To Be A Big One!';
		post.content = `<p>Tiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Liusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, qui s nostrud exercitation ullamLorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>

		<blockquote class="yummy-blockquote mt-30 mb-30">
			<h5 class="mb-30">“Technology is nothing. What's important is that you have a faith in people, that they're basically good and smart, and if you give them tools, they'll do wonderful things with them.”</h5>
			<h6 class="text-muted">Steven Jobs</h6>
		</blockquote>

		<h4>You Can Buy For Less Than A College Degree</h4>
		<p>Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>

		<img class="br-30 mb-30" src="img/blog-img/11.jpg" alt="">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

		<img class="br-30 mb-30" src="img/blog-img/12.jpg" alt="">
		<p>Liusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, qui s nostrud exercitation ullamLorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

		<img class="br-30 mb-30" src="img/blog-img/13.jpg" alt="">
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

		<img class="br-30 mb-15" src="img/blog-img/14.jpg" alt="">`;
		post.tags = ['Multipurpose', 'Design', 'Ideas'];
		post.author = new Author();
		post.meta = new Meta();
		const data = await this.repositoryManager.save(post);*/
		// DELETE

		const posts = await this.repositoryManager.find(Post);
		this.logger.debug(`Posts in db => ${posts.length}`);

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
