import { ICommonComponents } from '../../common/common.interfaces';
import { IPost, IAuthor, IThumb } from '../../../repository/entities';

export interface IProject {
	postTitle: string;
	postId: string;
	date: string;
	numComments: number;
}

export interface ISlide {
	thumb: IThumb;
	project: IProject;
}

export interface IWelcomeArea {
	slides: ISlide[];
}

export interface ICategoriesArea {
	tags: string[];
}

export interface IWidgetAbout {
	author: IAuthor;
}

export interface IWidgetSubscribeFollow {
	socialLink: string;
}

export interface IWidgetPopularPosts {
	posts: IPost[];
}

export interface IWidgetBook {
	// TODO: Review this interface
	nothing?: string;
}

export interface ISideBar {
	widgetAbout?: IWidgetAbout;
	widgetSubscribeFollow?: IWidgetSubscribeFollow;
	widgetPopularPosts?: IWidgetPopularPosts;
	widgetBook?: IWidgetBook;
}

export interface IBlogArea {
	featuredPost: IPost;
	gridPosts: IPost[];
	listPosts: IPost[];
	sidebar?: ISideBar;
}

export interface IPostPage {
	post: IPost;
	sidebar?: ISideBar;
}

export interface IHome {
	welcomeArea: IWelcomeArea;
	categoriesArea: ICategoriesArea;
	blogArea: IBlogArea;
}
