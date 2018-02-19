import { ICommonComponents } from '../common/common.interfaces';
import { IPost } from '../../repository/entities/IPost';

interface IWelcomeArea {
	slides: {
		thumb: {
			image: string;
			alt: string;
		};
		project: {
			title: string;
			date: string;
			numComments: string;
		};
	}[];
}

interface ICategoriesArea {
	tags: string[];
}

interface IWidgetAbout {
	author: IAuthor;
}

interface IWidgetSubscribeFollow {

}

interface IWidgetPopularPosts {

}

interface IWidgetBook {

}

interface IWidgetNewsLetter {

}

interface ISideBar {
	widgetAbout: IWidgetAbout;
	widgetSubscribeFollow: IWidgetSubscribeFollow;
	widgetPopularPosts: IWidgetPopularPosts;
	widgetBook: IWidgetBook;
	widgetNewsLetter: IWidgetNewsLetter;
}

interface IBlogArea {
	featuredPost: IPost;
	gridPosts: IPost[];
	listPosts: IPost[];
	sidebar: ISideBar;
}

export interface IHome {
	welcomeArea: IWelcomeArea;
	categoriesArea: ICategoriesArea;
	blogArea: IBlogArea;
}
