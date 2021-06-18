import { Subscribe } from '.';

export default class IsClicked{
	public isClicked : boolean;
	private subscribers : Subscribe;

	constructor(subscribers : Subscribe){
		this.subscribers = subscribers;
		this.isClicked = false;
		this.init();
	}
	init(){
		this.subscribers.subscribe('mouseDown', this.start.bind(this));
		this.subscribers.subscribe('mouseUp', this.end.bind(this));
	}

	async start(){
		this.isClicked = await true;
	}

	async end(){
		this.isClicked = await false;
	}
}