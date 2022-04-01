'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const rollback = 15;
const adaptive = !!prompt('Нужен ли адаптив на сайте?');
const str = screens.toLowerCase();
const arr = str.split(' ');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = Math.round(fullPrice - fullPrice * (rollback / 100));


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

console.log("Итоговая стоимость за вычетом отката посреднику", servicePercentPrice, "рублей");

switch (true) {
    case fullPrice >= 30000:
		console.log('Даем скидку в 10%');
        break;
    case fullPrice >= 15000 && fullPrice < 30000:
        console.log('Даем скидку в 5%');
        break;
    case fullPrice >= 0 && fullPrice < 15000:
        console.log('Скидка не предусмотрена');
        break;
    case fullPrice < 0:
            console.log('Что-то пошло не так');
            break;
 }
