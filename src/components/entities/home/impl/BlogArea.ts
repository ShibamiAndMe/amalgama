import { IBlogArea } from '../IHome';
import { IPost } from '../../../../repository/entities';

export class BlogArea implements IBlogArea {

	public featuredPost: IPost;
	public gridPosts: IPost[];
	public listPosts: IPost[];

}
