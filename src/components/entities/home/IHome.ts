import { ICommonComponents } from '../common/common.interfaces';
import { IPost, IAuthor, IThumb } from '../../repository/entities';

interface IProject {
	title: string;
	date: string;
	numComments: number;
}

interface ISlide {
	thumb: IThumb;
	project: IProject;
}

interface IWelcomeArea {
	slides: ISlide[];
}

interface ICategoriesArea {
	tags: string[];
}

interface IWidgetAbout {
	author: IAuthor;
}

interface IWidgetSubscribeFollow {
	socialLink: string;
}

interface IWidgetPopularPosts {
	posts: IPost[];
}

interface IWidgetBook {
	// TODO: Review this interface
	nothing?: string;
}

interface ISideBar {
	widgetAbout?: IWidgetAbout;
	widgetSubscribeFollow?: IWidgetSubscribeFollow;
	widgetPopularPosts?: IWidgetPopularPosts;
	widgetBook?: IWidgetBook;
}

interface IBlogArea {
	featuredPost: IPost;
	gridPosts: IPost[];
	listPosts: IPost[];
	sidebar?: ISideBar;
}

export interface IHome {
	welcomeArea: IWelcomeArea;
	categoriesArea: ICategoriesArea;
	blogArea: IBlogArea;
}
