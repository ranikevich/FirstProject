'use strict';

const title = document.getElementsByTagName('h1')[0];

const buttonStart = document.getElementsByClassName('handler_btn')[0];
const buttonReset = document.getElementsByClassName('handler_btn')[1];

const buttonPlus = document.querySelector('.screen-btn');

const hasClassPercent = document.querySelectorAll('.other-items.percent');
const hasClassNumber = document.querySelectorAll('.other-items.number');

const inputTypeRange = document.querySelector('.rollback input');

const spanRangeValue = document.querySelector('.rollback .range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const totalFullCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');


const appData = {
    rollback: 0,
    title: '',
    screens: [],
    screenCount: 0,
    screenPrice: 0,
    adaptive: true,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},


    addTitle: function() {
        document.title = title.textContent;
    },

    addScreens: function () {
        screens = document.querySelectorAll('.screen');
        screens.forEach(function(screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            
            appData.screens.push({ 
                id: index, 
                name: selectName,
                count: +input.value,
                price : +select.value * +input.value
            });
        });
    },

    
    addServices: function() {
        hasClassPercent.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        hasClassNumber.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },

    addScreenBlock: function() {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length-1].after(cloneScreen);
    },

    addPrices: function () {
        for (let screen of appData.screens) { 
            appData.screenPrice += +screen.price;
        }

        for (let screen of appData.screens) { 
            appData.screenCount += +screen.count;
        }
        
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }
        
        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;

        appData.servicePercentPrice = Math.round(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
    },

    changeRollback: function(event) {
        spanRangeValue.textContent = event.target.value+'%';
        appData.rollback = parseInt(event.target.value);

    },


    showResult: function() {
        total.value = appData.screenPrice;
        totalCount.value = appData.screenCount;
        totalCountOther.value = appData.servicePricesNumber + appData.servicePricesPercent;
        totalFullCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;

    },

    init: function() {
        appData.addTitle();
        buttonPlus.addEventListener('click', appData.addScreenBlock);
        inputTypeRange.addEventListener('input', appData.changeRollback);
        buttonStart.addEventListener('click', appData.verificationScreen);
    },

    start: function() {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        // appData.logger();
        appData.showResult();
        console.log(appData);
    },
    
    logger: function() {
        console.log(appData.title);
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        for (let key in appData) {
            console.log("Ключ:" + key + " " + "Значение:" + appData[key]);
        }
    },

    verificationScreen: function () {
        let flag = true;
        screens = document.querySelectorAll('.screen');
        screens.forEach(function(screen) {
            const select = screen.querySelector('select').value;
            const input = screen.querySelector('input').value;
            console.log(select);
            console.log(input);
            for (let i=0; i<=screens.length-1; i++) {
            if (select == "" || input == "") {
                    flag = false;
                    console.log(flag);
                } else {
                    console.log(flag);
                }
            }
        });
            if (flag === true) {
                appData.start();
            } else {
                alert('Проверьте заполнены ли типы экранов и их количество')
            }
            
        
    }

};



appData.init();



