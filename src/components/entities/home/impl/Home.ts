import { IHome, IWelcomeArea, ICategoriesArea, IBlogArea } from '../IHome';

export class Home implements IHome {

	public welcomeArea: IWelcomeArea;
	public categoriesArea: ICategoriesArea;
	public blogArea: IBlogArea;

}
