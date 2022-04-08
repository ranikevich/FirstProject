'use strict';

const appData = {
    rollback: 15,
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',
    servicePrice1: 0,
    servicePrice2: 0,
    asking: function() {
        appData.title = prompt('Как называется ваш проект?');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые и сложные');
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
    } while (!appData.isNumber(appData.screenPrice));
    appData.screenPrice = +appData.screenPrice;
    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getAllServicePrices: function() {
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
                do {
                    appData.servicePrice1 = prompt('Сколько это будет стоить?');
                } while (!appData.isNumber(appData.servicePrice1));
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
                do {
                    appData.servicePrice2 = prompt('Сколько это будет стоить?');
                } while (!appData.isNumber(appData.servicePrice2));
            }
            appData.servicePrice1 = +appData.servicePrice1;
            appData.servicePrice2 = +appData.servicePrice2;
            sum = appData.servicePrice1 + appData.servicePrice2;  
        }
        return sum;
    },
    getFullPrice: function (priceScreen, allService) {
        return priceScreen + allService;
    },
    getTitle: function(str) {
        if (str) {
        str = str.trim().toLowerCase();
        return str[0].toUpperCase() + str.substring(1);}
        return '';
    },
    getServicePercentPrices: function() {
        return Math.round(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
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
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.logger();
   },
   logger: function(){
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    for (let key in appData) {
        console.log("Ключ:" + key + " " + "Значение:" + appData[key]);
    }
   }
};
 
appData.start();


