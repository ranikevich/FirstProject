'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonStart = document.getElementsByClassName('handler_btn')[0];
const buttonReset = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');
const hasClassPercent = document.querySelectorAll('.other-items.percent');
const hasClassNumber = document.querySelectorAll('.other-items.number');
const inputTypeRange = document.querySelector('.rollback input');
const spanRangeValue = document.querySelector('.rollback span');
const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const totalFullCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];
let screens = document.querySelectorAll('.screen');


const appData = {
    rollback: 15,
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},

    asking: function() {
        do {
            appData.title = prompt('Как называется ваш проект?');
        } while (!appData.isString(appData.title));
        for (let i = 0; i < 2; i++) {
            let name = '';
            do {
                name = prompt('Какие типы экранов нужно разработать?');
            } while (!appData.isString(name));
            let price = 0;
            do {
                price = prompt('Сколько будет стоить данная работа?');
            } while (!appData.isNumber(price));
            appData.screens.push({ id: i, name: name, price : price });
        }
        
        for (let i = 0; i < 2; i++) {
            // для тогo чтобы решить проблему с повторением названия name воспользоваться итератором цикла 
            let name = '';
            do {
                name = prompt('Какой дополнительный тип услуги нужен?');
            } while (!appData.isString(name));

            let price = 0;
            do {
                price = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(price));

            appData.services[name] = +price;
        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    addPrices: function () {
        for (let screen of appData.screens) {
            // дома методом reduse 
            appData.screenPrice += +screen.price;
        }
        
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }  
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    isString: function (str) {
        return isNaN(+str);
    },

    getFullPrice: function () {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },

    getTitle: function() {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
    },

    getServicePercentPrices: function() {
        appData.servicePercentPrice = Math.round(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
    },

    getRollbackMessage: function(price) {
        if (price >= 30000) {
            return 'Даем скидку в 10%';
        }else if (price >= 15000) {
            return 'Даем скидку в 5%';
        } else if (price >= 0) {
            return 'Скидка не предусмотрена';
        } else {
            return 'Что-то пошло не так';
        }
    },

    start: function() {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.logger();
    },
    
    logger: function() {
        console.log(appData.title);
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        for (let key in appData) {
            console.log("Ключ:" + key + " " + "Значение:" + appData[key]);
        }
    }
};
 
//appData.start();
console.log(title);
console.log(buttonStart);
console.log(buttonReset);
console.log(buttonPlus);
console.log(hasClassPercent);
console.log(hasClassNumber);
console.log(inputTypeRange);
console.log(spanRangeValue);
console.log(total);
console.log(totalCount);
console.log(totalCountOther);
console.log(totalFullCount);
console.log(totalCountRollback);
console.log(screens);


