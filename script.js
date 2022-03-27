const title = "Первый проект";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 1500;
const rollback = 15;
const fullPrice = 15000;
const adaptive = true;
const str = screens.toLowerCase();
const arr = str.split(' ');

alert("Hello");
console.log("OK");

console.log (typeof title);
console.log (typeof fullPrice);
console.log (typeof adaptive);
console.log (screens.length);
console.log ("Стоимость верстки экранов",screenPrice,"рублей");
console.log ("Стоимость разработки сайта",fullPrice,"рублей"); 
console.log (arr);
console.log ("Откат посреднику за работу", fullPrice * (rollback / 100), "рублей");
