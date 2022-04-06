'use strict';

const rollback = 15;

let title;
let screens;
let screenPrice;
let adaptive;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;
let servicePrice1;
let servicePrice2;
let str;
let firstLetter;

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function() {
    title = prompt('Как называется ваш проект?');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые и сложные');
    do {
    screenPrice = prompt('Сколько будет стоить данная работа?');
} while (!isNumber(screenPrice));
    screenPrice = +screenPrice;
    adaptive = confirm('Нужен ли адаптив на сайте?');
};


const getAllServicePrices = function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?');
            do {
                servicePrice1 = prompt('Сколько это будет стоить?');
            } while (!isNumber(servicePrice1));
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?');
            do {
                servicePrice2 = prompt('Сколько это будет стоить?');
            } while (!isNumber(servicePrice2));
        }
        servicePrice1 = +servicePrice1;
        servicePrice2 = +servicePrice2;
        sum = servicePrice1 + servicePrice2;  
    }
    return sum;
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

asking();
allServicePrices = getAllServicePrices();

fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
getTitle(title);
console.log(getRollbackMessage(fullPrice));
console.log("Итоговая стоимость за вычетом отката посреднику", servicePercentPrice, "рублей");

