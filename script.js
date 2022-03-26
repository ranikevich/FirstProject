let title = "Первый проект";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1500;
let rollback = 15;
let fullPrice = 15000;
let adaptive = true;

alert("Hello");
console.log("OK");

console.log (typeof title);
console.log (typeof fullPrice);
console.log (typeof adaptive);
console.log (screens.length);

let screenPriceUSD = Math.round(screenPrice / 102);
let screenPriceUAH = Math.round(screenPrice / 3.5);
let screenPriceCNY = Math.round(screenPrice / 15);
console.log ("Стоимость верстки экранов",screenPrice,"рублей/",screenPriceUSD,"долларов/", screenPriceUAH,"гривен/", screenPriceCNY,"юаней");

let fullPriceUSD = Math.round(fullPrice / 102);
let fullPriceUAH = Math.round(fullPrice / 3.5);
let fullPriceCNY = Math.round(fullPrice / 15);
console.log ("Стоимость разработки сайта",fullPrice,"рублей/",fullPriceUSD,"долларов/", fullPriceUAH,"гривен/", fullPriceCNY,"юаней");

let str = screens.toLowerCase();
let arr = str.split(' '); 
console.log (arr);

console.log ("Откат посреднику за работу", fullPrice * (rollback / 100));