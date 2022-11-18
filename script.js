let foods = []
let prices = [];
let shoppingBasket = [];


function addToBasket(name, price) {
    shoppingBasket.push(name);
    prices.push(price);
}

function updateShoppingBasket() {
    let sum = 0;


    for (let i = 0; i < prices.length; i++) {
        sum += prices[i]
        
        document.getElementById().innerHTML = sum;
    }
}