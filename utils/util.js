export function formateDate(value){
	let authDate = new Date(value)
	let year = authDate.getFullYear();
	let month = authDate.getMonth()+1
	month = month > 10 ? month: "0" +month
	let day = authDate.getDate()
	day = day > 10 ? day: "0" +day
	return year +'-'+month +'-'+day
}


