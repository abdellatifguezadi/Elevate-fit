

function updateCartUI() {
    const cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    const totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

    const cartCountElem = document.getElementById('cart-count');
    const totalPriceElem = document.getElementById('totalPrice');

    if (cartCountElem) cartCountElem.innerHTML = cartCount;
    if (totalPriceElem) totalPriceElem.innerHTML = `$${totalPrice.toFixed(2)}`;
}


document.addEventListener('DOMContentLoaded', () => {

    updateCartUI();


    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (product) {
        document.getElementById('product-name').innerText = product.name;
        document.getElementById('product-img').src = product.img;
        document.getElementById('product-price').innerText = product.price;


        const priceElem = document.getElementById('product-price');
        const quantityInput = document.getElementById('quantity');

        let price = parseFloat(priceElem.innerText.slice(1)).toFixed(2);
        let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
        let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;


        quantityInput.addEventListener('input', (e) => {
            priceElem.innerText = `$${(quantityInput.value).toFixed(2)}`;
        });

 
        const addToCartButton = document.getElementById('addToCart');
        addToCartButton.addEventListener('click', (e) => {
            const quantity = parseInt(quantityInput.value);
            cartCount += quantity;
            totalPrice += (quantity * price);


            localStorage.setItem('cartCount', cartCount);
            localStorage.setItem('totalPrice', totalPrice);


            updateCartUI();
        });
    }
});




document.getElementById('addToCart').addEventListener('click', function(event) {
    event.preventDefault(); 

    const productName = document.getElementById('product-name').innerText;
    const productPrice = document.getElementById('product-price').innerText;
    const productSize = document.querySelector('select').value;
    const productQuantity = parseInt(document.getElementById('quantity').value);
    const productImage = document.getElementById('product-img').src;


    const cartItem = {
        name: productName,
        price: productPrice,
        size: productSize,
        quantity: productQuantity,
        image: productImage
    };


    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];


    const existingItemIndex = cartItems.findIndex(item => item.name === cartItem.name && item.size === cartItem.size);

    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += cartItem.quantity;
    } else {
        cartItems.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));

    
});

function calculateTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cartItems.forEach(item => {
        const priceValue = parseFloat(item.price.replace('$', ''));
        total += priceValue * item.quantity;
    });

    return total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() {

    const totalPriceElem = document.querySelector('.total-price td:last-child');
    totalPriceElem.innerHTML = `$${calculateTotal()}`;
});