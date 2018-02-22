import { IWelcomeArea, ISlide } from '../IHome';

export class WelcomeArea implements IWelcomeArea {

	public slides: ISlide[];

	constructor() {
		this.slides = new Array<ISlide>();
	}
}
