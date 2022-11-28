let basketFood = [];
let basketPrice = [];
let basketAmount = [];
let deliveryCosts = 1.50;
let noteAdd = [];
loadBasket();

function renderEmptyBasket() {
    let basket = document.getElementById('shoppingCart');
    if (basketAmount <= 0) {
    basket.innerHTML = emptyTemplate();
    }else {
        renderBasket();
    }
    saveBasket();
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

        document.getElementById(`newPrice${i}`).innerHTML = `${totalPrice.toFixed(2).replace('.', ',')}€`;
    }
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
    let sum = 0;
    for (let i = 0; i < basketPrice.length; i++) {
        sum += basketAmount[i] * basketPrice[i];
    }
    totalSum = sum + 1.50;
    return totalSum;
}

function saveBasket() {
    let basketFoodAsText = JSON.stringify(basketFood);
    localStorage.setItem('basketFood', basketFoodAsText);
    let basketAmountAsText = JSON.stringify(basketAmount);
    localStorage.setItem('basketAmount', basketAmountAsText);
    let basketPriceAsText = JSON.stringify(basketPrice);
    localStorage.setItem('basketPrice', basketPriceAsText);
    let noteAddAsText = JSON.stringify(noteAdd);
    localStorage.setItem('noteAdd', noteAddAsText);
}

function loadBasket() {
    let basketFoodAsText = localStorage.getItem('basketFood');
    let basketAmountAsText = localStorage.getItem('basketAmount');
    let basketPriceAsText = localStorage.getItem('basketPrice');
    let noteAddAsText = localStorage.getItem('noteAdd');

    if (basketFoodAsText && basketPriceAsText && basketAmountAsText && noteAddAsText) {
        basketFood = JSON.parse(basketFoodAsText);
        basketPrice = JSON.parse(basketPriceAsText);
        basketAmount = JSON.parse(basketAmountAsText);
        noteAdd = JSON.parse(noteAddAsText);
    }
}

function addOneMore(i) {
    basketAmount[i]++;
    renderBasket();
    saveBasket();
}

function removeFood(i) {
    if (basketAmount[i] > 1) {
        basketAmount[i]--;
    } else {
        basketAmount.splice(i, 1);
        basketPrice.splice(i, 1);
        basketFood.splice(i, 1);
    }
    if (basketAmount == 0) {
        renderEmptyBasket();
    }
    renderBasket();
    saveBasket();
}

function addNote(i) {
    let note = document.getElementById(`note${i}`);
    note.innerHTML = '';
    note.innerHTML = /*html*/`
    <textarea id="text${i}"></textarea>
    <div class="addNote">
        <span onclick="added(${i})">Hinzufügen</span>
        <span onclick="demolition(${i})">Abbrechen</span>
    </div>`
    saveBasket();
}

function demolition(i) {
    let note = document.getElementById(`note${i}`);
    note.innerHTML = '';
}

function added(i) {
    let notes = document.getElementById(`text${i}`).value;
    noteAdd.push(notes);
    
    let myNote = document.getElementById(`notice${i}`);
    myNote.innerHTML = '';
    for (let i = 0; i < noteAdd.length; i++) {
        myNote.innerHTML = /*html*/`
        <div>
            <div class="notice">
                <span>${notes}</span>
            </div>
        </div>`
    }
    document.getElementById(`text${i}`).value = '';
    saveBasket();
}

function pay() {
    let cart = document.getElementById('shoppingCart');
    cart.innerHTML = payTemplate();
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

function basketTemplate(i) {
    return /*html*/`
    <div class="listItemShadow">
        <div class="listItem">
        <span>${basketAmount[i]}x</span> <span>${basketFood[i]}: </span>
            <div id="newPrice${i}">
            <span>${basketPrice[i]}€</span>
            </div>
        </div>
        <div id="none" class="addRemove">
            <div>
                <span onclick="addNote(${i})">Anmerkung hinzufügen</span>
                <div class="note" id="note${i}"></div>
            </div>
            <span onclick="removeFood(${i})" class="circle minus"></span>
            <span onclick="addOneMore(${i})" class="circle plus"></span>
        </div>
        <div id="notice${i}"></div>
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
            <span>${subTotal().replace('.', ',')}€<span><br><br>
            <span>${deliveryCosts.toFixed(2).replace('.', ',')}€<span><br><br>
            <span>${endSum().toFixed(2).replace('.', ',')}€</span>
        </div>
    </div>
    <button class="orderButton" onclick="pay()"><b>Bezahlen (${endSum().toFixed(2).replace('.', ',')}€)</b></button>`;
}

function payTemplate() {
    return /*html*/`
    <div class="succes">
        <span>Sie haben erfolgreich bestellt.<br>
        Die Bestellung wird ca. in 50 Minuten bei ihnen eintreffen.</span>
        <img src="img/delivery-food-64.ico">
    </div>`
}