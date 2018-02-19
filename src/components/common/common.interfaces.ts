import { ILogoAreaComponent } from './LogoArea/logo.area.interfaces';

export interface ILayoutComponent {
	blogTitle: string;
}

export interface ICommonComponents {
	logoAreaComponent?: ILogoAreaComponent;
}
