let basketFood = [];
let basketPrice = [];
let basketAmount = [];
let shoppingBasket = [];
let deliveryCosts = 1.50;
loadBasket();

function renderEmptyBasket() {
    let basket = document.getElementById('shoppingCart');

    basket.innerHTML = emptyTemplate();
    renderBasket();
    saveBasket();
}

function emptyTemplate() {
    return /*html*/`
    <div class="emptyBasket">
        <img src="img/shopping-basket-64.ico">
        <h3>Fülle deinen Warenkorb</h3>
        <span>Füge einige leckeren Speisen hinzu <br> 
        und Bestelle dein Essen</span>
    </div>`
}

function renderBasket() {
    let basket = document.getElementById('shoppingCart');
    basket.innerHTML = '';

    for (let i = 0; i < basketFood.length; i++) {

        basket.innerHTML += basketTemplate(i);
    }
    updateShoppingBasket();
    basket.innerHTML += priceTotal();
}

function basketTemplate(i) {
    return /*html*/`
    <div class="listItemShadow">
        <div class="listItem">
        ${basketAmount[i]}x ${basketFood[i]}: 
            <div id="newPrice${i}">
            ${basketPrice[i]}€
            </div>
        </div>
        <div class="addRemoveButton">
            <span>Anmerkung hinzufügen</span>
            <span onclick="removeFood()" class="circle minus"></span>
            <span onclick="addOneMore()" class="circle plus"></span>
        </div>
    </div>`;
}
function addToBasket(food, price) {
    let index = basketFood.indexOf(food);
    if (index == -1) {
        basketFood.push(food);
        basketPrice.push(price);
        basketAmount.push(1)
    } else {
        basketAmount[index]++;
    }
    renderBasket();
    saveBasket();
}
function updateShoppingBasket() {
    for (let i = 0; i < basketPrice.length; i++) {
        let totalPrice = basketPrice[i] * basketAmount[i];

        document.getElementById(`newPrice${i}`).innerHTML = `${totalPrice.toFixed(2)}€`;
    }
}

function priceTotal() {
    return /*html*/`
    <div class="sumTotalBox">
        <div class="totalSumLeft">
            <span>Zwischensumme:</span><br>
            <span>Lieferkosten:</span><br>
            <span><b>Gesamt:</b></span>
        </div>
        <div class="subTotalRight">
            <span>${subTotal()}€<span><br><br>
            <span>${deliveryCosts.toFixed(2)}€<span><br><br>
            <span>${endSum().toFixed(2)}€</span>
        </div>
    </div>
    <button class="orderButton"><b>Bezahlen (${endSum().toFixed(2)}€)</b></button>`;
}

function subTotal() {
    let sum = 0;
    for (let i = 0; i < basketPrice.length; i++) {
        sum += basketAmount[i] * basketPrice[i];
    }
    if (sum <= 10) {
        extraCost = 1.50;
        } else {
        totalSum = sum + 1.50;
        }

    return sum.toFixed(2);
}

function endSum() {
    return totalSum;
}

function saveBasket() {
    let basketFoodAsText = JSON.stringify(basketFood);
    localStorage.setItem('basketFood', basketFoodAsText);
    let basketAmountAsText = JSON.stringify(basketAmount);
    localStorage.setItem('basketAmount', basketAmountAsText);
    let basketPriceAsText = JSON.stringify(basketPrice);
    localStorage.setItem('basketPrice', basketPriceAsText);
}

function loadBasket() {
    let basketFoodAsText = localStorage.getItem('basketFood');
    let basketAmountAsText = localStorage.getItem('basketAmount');
    let basketPriceAsText = localStorage.getItem('basketPrice');

    if(basketFoodAsText && basketPriceAsText && basketAmountAsText) {
        basketFood = JSON.parse(basketFoodAsText);
        basketPrice = JSON.parse(basketPriceAsText);
        basketAmount = JSON.parse(basketAmountAsText);
    }
}

function addOneMore() {

}

function addOneMore() {

}