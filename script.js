'use strict';

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
    servicePrice1: 0,
    servicePrice2: 0,

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

    getTitle: function(str) {
        if (str) {
        str = str.trim().toLowerCase();
        appData.title = str[0].toUpperCase() + str.substring(1);}
        appData.title = '';
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
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        for (let key in appData) {
            console.log("Ключ:" + key + " " + "Значение:" + appData[key]);
        }
        console.log(appData.screens);
    }
};
 
appData.start();


