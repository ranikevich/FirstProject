'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const rollback = 15;
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');


let allServicePrices;
let fullPrice;
let servicePercentPrice;
let str;
let firstLetter;

const getAllServicePrices = function(servicePrice) {
     return servicePrice1 + servicePrice2;
};

function getFullPrice () {
    return screenPrice + allServicePrices;
}

const getTitle = function(str) {
    if (str) {
        str = str.trim();
        str = str.toLowerCase();
        firstLetter = str.slice(0, 1);
        firstLetter = firstLetter.toUpperCase();
        str = firstLetter + str.substring(1);
        console.log(str);
    }
};

const getServicePercentPrices = function() {
    return Math.round(fullPrice - fullPrice * (rollback / 100));
};

const getRollbackMessage = function(price) {
    if (price >= 30000) {
            return 'Даем скидку в 10%';
     }else if (price >= 15000 && price < 30000) {
        return 'Даем скидку в 5%';
     } else if (price >= 0 && price < 15000) {
        return 'Скидка не предусмотрена';
     } else {
        return 'Что-то пошло не так';
     }
};

const showTypeOf = function(variable) {
    console.log(typeof variable);
};


allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
getTitle(title);
console.log(getRollbackMessage(fullPrice));
console.log("Итоговая стоимость за вычетом отката посреднику", servicePercentPrice, "рублей");


console.log ("Стоимость верстки экранов",screenPrice,"рублей");
console.log ("Стоимость разработки сайта",fullPrice,"рублей"); 
console.log ("Откат посреднику за работу", fullPrice * (rollback / 100), "рублей");

