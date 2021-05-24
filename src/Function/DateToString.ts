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
	return `${date.getMonth()+1} / ${date.getDate()} ${day}`;
}
export function DateToMonthDateString(date : Date){
	return `${date.getMonth()+1} / ${date.getDate()}`;
}
export function DateToYearDateString(date : Date){
	return `${date.getFullYear()} / ${date.getMonth() +1} / ${date.getDate()}`;
}