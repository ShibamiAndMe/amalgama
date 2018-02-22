/** yggdrasil imports */
import { Request, Response } from '@yggdrasilts/mvc';
import { FileLogger } from '@yggdrasilts/core';
import { MongoDBRepository } from '@yggdrasilts/data';

import { MongoEntityManager } from 'typeorm';
import { validate } from 'class-validator';

import { BaseCtrl } from '../base.ctrl';

import {
	IHome, ISlide, ICategoriesArea, IWelcomeArea, IBlogArea,
	Home, CategoriesArea, WelcomeArea, BlogArea
} from '../../components/components.interfaces';

import {
	IPost,
	Post, Author, Meta, FeaturedImage, Thumb
} from '../../repository/entities';

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
		await this.tempInsertData();
		// DELETE

		this.homeData = await this.getHomeData();

		this.data.pageData = this.homeData;
		this.logger.debug(`DATA => ${JSON.stringify(this.data.pageData.welcomeArea)}`);

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

	private getContent(): string {
		return `<p>Tiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Liusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, qui s nostrud exercitation ullamLorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>

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
	}

	private tempInsertData() {
		const newPost = new Post();
		newPost.title = 'Boil The Kettle And Make A Cup Of Tea Folks, This Is Going To Be A Big One!';
		newPost.tags = ['Multipurpose', 'Design', 'Ideas'];
		newPost.author = new Author();
		newPost.meta = new Meta(10, 12, 'May 19, 2017', new FeaturedImage(new Thumb('/img/bg-img/slide-1.jpg')));
		this.logger.debug(`NEW POST => ${JSON.stringify(newPost, null, 2)}`);
		// newPost.content = this.getContent();
		// const data = await this.repositoryManager.save(newPost);
	}

	private async getHomeData(): Promise<Home> {
		const homeData = new Home();

		const posts = await this.repositoryManager.find(Post);
		this.logger.debug(`Posts in db => ${posts.length}`);
		this.logger.debug(`POST => ${JSON.stringify(posts[0], null, 2)}`);

		homeData.welcomeArea = await this.getWelcomeData(posts);
		homeData.categoriesArea = await this.getCategoriesArea();
		homeData.blogArea = await this.getBlogArea();

		return homeData;
	}

	private async getWelcomeData(posts: IPost[]): Promise<WelcomeArea> {
		const welcomeArea = new WelcomeArea();
		await posts.forEach(post => {
			welcomeArea.slides.push({
				thumb: {
					image: post.meta.featuredImage.thumb.image,
				},
				project: {
					title: post.title,
					date: post.meta.createdDate,
					numComments: post.meta.numberOfComments
				}
			});
		});
		return welcomeArea;
	}

	private async getCategoriesArea(): Promise<ICategoriesArea> {
		const categories = new CategoriesArea();
		await ['One', 'Two', 'Three'].forEach(tag => categories.tags.push((tag)));
		return categories;
	}

	private async getBlogArea(): Promise<IBlogArea> {
		const blogArea = new BlogArea();

		return blogArea;
	}
}
