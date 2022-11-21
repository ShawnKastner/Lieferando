let basketFood = [];
let basketPrice = [];
let basketAmount = [];
let shoppingBasket = [];

function renderBasket() {
    let basket = document.getElementById('shoppingCart');
    basket.innerHTML = '';

    for (let i = 0; i < basketFood.length; i++) {
        
        basket.innerHTML += basketTemplate(basketFood, basketPrice, basketAmount);
    }
    updateShoppingBasket()
}

function basketTemplate(basketFood, basketPrice, basketAmount) {
    return `<div class="listItem">
           <b>${basketAmount}x ${basketFood}:</b> 
           <div id="newPrice">${basketPrice}€</div>
        </div>`;
}

function addToBasket(food, price) {
    let index = basketFood.indexOf(food);
    if (index == -1) {
        basketFood.push(food);
        basketPrice.push(price);
        basketAmount.push(1)
    } else {
        ;
        basketAmount[index]++;
    }
    renderBasket();
}

function updateShoppingBasket() {
    let sum = 0;

    for (let i = 0; i < basketPrice.length; i++) {
        sum += basketPrice[i] * basketAmount[i];

        document.getElementById('newPrice').innerHTML = `${sum.toFixed(2)}€;`
    }
}
