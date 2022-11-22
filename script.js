let basketFood = [];
let basketPrice = [];
let basketAmount = [];
let shoppingBasket = [];

function renderEmptyBasket () {
    let basket = document.getElementById('shoppingCart');
    
    basket.innerHTML = `
    <div>
    <h3>Fülle deinen Warenkorb</h3>
    </div>`;
}

function renderBasket() {
    let basket = document.getElementById('shoppingCart');
    basket.innerHTML = '';

    for (let i = 0; i < basketFood.length; i++) {
        
        basket.innerHTML += basketTemplate(i);
    }
    updateShoppingBasket();
}

function basketTemplate(i) {
    return `<div class="listItem">
           ${basketAmount[i]}x ${basketFood[i]}: 
           <div id="newPrice${i}">${basketPrice[i]}€</div>
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
