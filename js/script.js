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
        this.title = title.textContent;
    },

    addScreens: function () {
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            
            this.screens.push({ 
                id: index, 
                name: selectName,
                count: +input.value,
                price : +select.value * +input.value
            });
        });
    },

    
    addServices: function() {
        hasClassPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });

        hasClassNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },

    addScreenBlock: function() {
        const cloneScreen = screens[0].cloneNode(true);
        const cloneScreenInput = cloneScreen.querySelector('input');
        cloneScreenInput.value = '';
        screens[screens.length-1].after(cloneScreen);
        screens = document.querySelectorAll('.screen');
    },

    addPrices: function () {
        for (let screen of this.screens) { 
            this.screenPrice += +screen.price;
        }

        for (let screen of this.screens) { 
            this.screenCount += +screen.count;
        }
        
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }
        
        this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

        this.servicePercentPrice = Math.round(this.fullPrice - this.fullPrice * (this.rollback / 100));
    },

    changeRollback: function(event) {
        spanRangeValue.textContent = event.target.value+'%';
        this.rollback = parseInt(event.target.value);

    },


    showResult: function() {
        total.value = this.screenPrice;
        totalCount.value = this.screenCount;
        totalCountOther.value = this.servicePricesNumber + this.servicePricesPercent;
        totalFullCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;

    },

    
    
    logger: function() {
        console.log(this.title);
        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
        console.log(this.screens);
        for (let key in this) {
            console.log("Ключ:" + key + " " + "Значение:" + this[key]);
        }
    },

    verificationScreen: function () {
        let flag = true;
        screens.forEach((screen) => {
            let select = screen.querySelector('select').value;
            let input = screen.querySelector('input').value;
            for (let i=0; i<=screens.length-1; i++) {
                if (select == "" || input == "") {
                    flag = false;
                }
            }
        });

            if (flag === true) {
                this.start();
                this.blockedEnteredValue();
            } else {
                alert('Проверьте заполнены ли типы экранов и их количество');
            }
        
    },

    blockedEnteredValue: function () {
        screens.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.disabled = 'disabled';
            input.disabled = 'disabled';
        });

        hasClassPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const input = item.querySelector('input[type=text]');
            check.disabled = 'disabled';
            input.disabled = 'disabled';
        });

        hasClassNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const input = item.querySelector('input[type=text]');
            check.disabled = 'disabled';
            input.disabled = 'disabled';
        });

        buttonStart.style = 'display: none;';
        buttonReset.style = 'display: flex;';
    },

    unBlockedEnteredValue: function () {
        screens.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.removeAttribute('disabled');
            input.removeAttribute('disabled');
        });

        hasClassPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const input = item.querySelector('input[type=text]');
            check.removeAttribute('disabled');
            input.removeAttribute('disabled');
        });

        hasClassNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const input = item.querySelector('input[type=text]');
            check.removeAttribute('disabled');
            input.removeAttribute('disabled');
        });
    },

    clearScreens: function () {
        screens.forEach((screen, index, array) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.value = '';
            input.value = '';
            if (index !== 0) {
                screen.remove();
            }
        });
        
        
    },


    clearChecked: function () {
        hasClassPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            if (check.checked) {
                check.checked = !check.checked;
            }
        });

        hasClassNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            if (check.checked) {
                check.checked = !check.checked;
            }
        });
    },

    clearRollback: function () {
        inputTypeRange.value = 0;
        spanRangeValue.textContent = 0 + '%';
    },

    clearShowResult: function () {
        total.value = '';
        totalCount.value = '';
        totalCountOther.value = '';
        totalFullCount.value = '';
        totalCountRollback.value = '';
    },

    changeButton: function () {
        buttonStart.style = 'display: flex;';
        buttonReset.style = 'display: none;';
    },

    clearAppData: function () {
        this.rollback = 0;
        this.title = '';
        this.screens = [];
        this.screenCount = 0;
        this.screenPrice = 0;
        this.adaptive = true;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
        
    },


    init: function() {
        let verificationScreen = this.verificationScreen.bind(this);
        let changeRollback = this.changeRollback.bind(this);
        let reset = this.reset.bind(this);
        let addScreenBlock = this.addScreenBlock.bind(this);
        buttonPlus.addEventListener('click', addScreenBlock);
        inputTypeRange.addEventListener('input', changeRollback);
        buttonStart.addEventListener('click', verificationScreen);
        buttonReset.addEventListener('click', reset);
    },

    start: function() {
        this.addTitle();
        this.addScreens();
        this.addServices();
        this.addPrices();
        // appData.logger();
        this.showResult();
        console.log(this);
    },

    reset: function () {
        this.changeButton();
        this.unBlockedEnteredValue();
        this.clearScreens();
        this.clearChecked();
        this.clearRollback();
        this.clearShowResult();
        this.clearAppData();
        console.log(this);
    }
};

appData.init();

