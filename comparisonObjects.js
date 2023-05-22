import {isEqual} from "lodash";

//Порівняння обєктів

// Ми маємо два простих і однакових обєкта

const commonObj1 = {
	name: "Jack",
	age: 2,
	gender: "male",
}
const commonObj2 = {
	name: "Jack",
	age: 2,
	gender: "male",
}

	//Два ідентичних обєкта ніколи не будуть рівні, тому що вони знаходяться в різних частинах памяті
console.log("=> commonObj1 === commonObj2", commonObj1 === commonObj2); //false

// 1)

// Самий простий метод порівняня це перевести два обєкта в строку;
// Даний метод не пійде для обєктів де не збігається порядок ключів
console.log("1", JSON.stringify(commonObj1) === JSON.stringify(commonObj2)); //true

//2)
//Але можна перед тим як переводити наші обєкти в строку, пройтися по ним сортом
//Так як сорт доступгий тільки для масивів, тому робимо з нашого обєкта масив через Object.entries
const sortCommonObj1 = Object.entries(commonObj1).sort((a, b) => a[0].length - b[0].length)
const sortCommonObj2 = Object.entries(commonObj2).sort((a, b) => a[0].length - b[0].length)
console.log("2",JSON.stringify(sortCommonObj1) === JSON.stringify(sortCommonObj2)) //true

//3) Є ще така функці яка перевіряє рівність, але вона нам не підійде якщо в порівняних обєктах є не примітивні типи даних, типу ще один обєкт як значення ключа
function objectsEqual(o1, o2) {
	const entries1 = Object.entries(o1);
	const entries2 = Object.entries(o2);
	if (entries1.length !== entries2.length) {
		return false;
	}
	for (let i = 0; i < entries1.length; ++i) {
		// Ключі
		if (entries1[i][0] !== entries2[i][0]) {
			return false;
		}
		// Значення
		if (entries1[i][1] !== entries2[i][1]) {
			return false;
		}
	}
	return true;
}
console.log("3", objectsEqual(commonObj1, commonObj2)) //true

//4)
// Напевно самий крутий і простий спосіб це використати готовий інструмент для порівняння обєктів
// lodash робить глибоке порівння обєктів будь-якої складності
 const lodash = isEqual(commonObj1, commonObj2)
console.log(" lodash", lodash); //true

const complexObj1 = {
	key3: "dvdvdvdvda",
	key1 : ["s", 3],
	key2: {1: "ss", 2: 344, 3: "sss", 4:["ss", {q: "ss"}]},
	
}
const complexObj2 = {
	key1 : ["s", 3],
	key2: {4:["ss", {q: "ss"}], 1: "ss", 2: 344, 3: "sss", },
	key3: "dvdvdvdvda"
}
const lodash2 = isEqual(complexObj1, complexObj2);
console.log("=> lodash2", lodash2); //true
