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

import * as _ from 'lodash';

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

		this.homeData = await this.getHomeData();

		this.data.pageData = this.homeData;
		// this.logger.debug(`pageData => ${JSON.stringify(this.data.pageData, null, 2)}`);

		res.render('home/home', {
			data: this.data,
			title: 'Home'
		});
	}

	private async getHomeData(): Promise<Home> {
		const homeData = new Home();

		let posts = await this.repositoryManager.find(Post);
		// Order by date desc
		posts = await _.orderBy(posts, ['meta.createdDate'], ['desc']);
		this.logger.debug(`Posts in db => ${posts.length}`);

		homeData.welcomeArea = await this.getWelcomeData(posts);
		homeData.categoriesArea = await this.getCategoriesArea();
		homeData.blogArea = await this.getBlogArea(posts);

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
					postTitle: post.title,
					postId: post.id.toString(),
					date: post.meta.createdDate.toString(),
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

	private async getBlogArea(posts: IPost[]): Promise<IBlogArea> {
		const blogArea = new BlogArea();

		blogArea.featuredPost = await this.getFeaturedPost();
		blogArea.gridPosts = await this.getGridPosts(posts);
		blogArea.listPosts = await this.getListPosts(_.takeRight(posts, (posts.length - 4)));

		return blogArea;
	}

	private async getFeaturedPost(): Promise<IPost> {
		const post = await this.repositoryManager.findOne(Post, { featured: true });
		// this.logger.debug(`FeaturedPost => ${JSON.stringify(post, null, 2)}`);
		return post;
	}

	private async getGridPosts(posts: IPost[]): Promise<IPost[]> {
		return _.take(posts, 4);
	}

	private async getListPosts(posts: IPost[]): Promise<IPost[]> {
		return _.take(posts, 4);
	}
}
