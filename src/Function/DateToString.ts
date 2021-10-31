
function makeOverTwo(str: string){
	if(str.length > 2) return str.substr(0, 2);
	else if(str.length < 2) return `0${str}`;
	else return str;
}
export function DateToMonthDayString(date : Date){
	let day = "";
	switch(date.getDay()){
	case 0 : day = "일요일"; break;
	case 1 : day = "월요일"; break;
	case 2 : day = "화요일"; break;
	case 3 : day = "수요일"; break;
	case 4 : day = "목요일"; break;
	case 5 : day = "금요일"; break;
	case 6 : day = "토요일"; break;
	}
	const monthStr = makeOverTwo((date.getUTCMonth()+1).toString());
	const dateStr = makeOverTwo((date.getUTCDate()+1).toString());

	return `${monthStr}-${dateStr}(${day})`;
}
export function DateToMonthDateString(date : Date){
	const monthStr = makeOverTwo((date.getUTCMonth()+1).toString());
	const dateStr = makeOverTwo((date.getUTCDate()+1).toString());
	return `${monthStr}-${dateStr}`;
}
export function DateToYearDateString(date : Date){
	const yearStr = date.getUTCFullYear().toString();
	const monthStr = makeOverTwo((date.getUTCMonth()+1).toString());
	const dateStr = makeOverTwo((date.getUTCDate()+1).toString());
	return `${yearStr}-${monthStr}-${dateStr}`;

}
export function DateToSmallYearDateString(date : Date){
	const yearStr = date.getUTCFullYear().toString().substr(2,2);
	const monthStr = makeOverTwo((date.getUTCMonth()+1).toString());
	const dateStr = makeOverTwo((date.getUTCDate()+1).toString());
	return `${yearStr}-${monthStr}-${dateStr}`;
}