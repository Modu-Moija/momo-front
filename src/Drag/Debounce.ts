import { EventType } from '../Main/Type';

export default (func : Function , wait : number) => {
	let timeout : NodeJS.Timeout;
	return (args : EventType) => {
		const later = () => {
			func(args);
		};
		clearTimeout(timeout);

		timeout = setTimeout(later, wait);
	}
}