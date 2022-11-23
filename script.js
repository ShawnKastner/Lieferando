let basketFood = [];
let basketPrice = [];
let basketAmount = [];
let shoppingBasket = [];
let deliveryCosts = 1.50;

function renderEmptyBasket() {
    let basket = document.getElementById('shoppingCart');

    basket.innerHTML = emptyTemplate();
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
        <div class="addRemove">
            <span>Anmerkung hinzufügen</span>
            <span onclick="remove()" class="circle minus"></span>
            <span onclick="addOneMore()" class="circle plus"></span>
        </div>
    </div>`;
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
}

function updateShoppingBasket() {
    for (let i = 0; i < basketPrice.length; i++) {
        let totalPrice = basketPrice[i] * basketAmount[i];

        document.getElementById(`newPrice${i}`).innerHTML = `${totalPrice.toFixed(2)}€`;
    }
}

function subTotal() {
    let sum = 0;
    for (let i = 0; i < basketPrice.length; i++) {
        sum += basketAmount[i] * basketPrice[i];
    }

    return sum.toFixed(2);
}

function endSum() {
    let sum = 0;
    for (let i = 0; i < basketPrice.length; i++) {
        sum += basketAmount[i] * basketPrice[i];
    }
    if (sum <= 10) {
    extraCost = 1.50;
    } else {
    totalSum = sum + 1.50;
    }

    return totalSum;
}
