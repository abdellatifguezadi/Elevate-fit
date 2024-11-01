
function goToProduct(product) {

    localStorage.setItem('selectedProduct', JSON.stringify(product));

    window.location.href = 'product-detail.html';
}

function loadProductDetails() {
    const productData = localStorage.getItem('selectedProduct');
    if (productData) {
        const product = JSON.parse(productData);

        document.getElementById('product-name').innerText = product.name;
        document.getElementById('product-price').innerText = product.price;
        document.getElementById('product-img').src = product.img;

        const smallImages = document.querySelectorAll('.small-img');
        smallImages.forEach((img) => {
            img.src = product.img; 
        });

        localStorage.removeItem('selectedProduct');
    }
}


function updateCartUI() {
    const cartItems = getCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);

    const cartCountElem = document.getElementById('cart-count');
    const totalPriceElem = document.getElementById('totalPrice');

    if (cartCountElem) cartCountElem.innerHTML = cartCount > 0 ? cartCount : '';
    if (totalPriceElem) totalPriceElem.innerHTML = `$${totalPrice.toFixed(2)}`;
}

if (window.location.pathname.endsWith('product-detail.html')) {
    loadProductDetails();
} else {

    document.addEventListener('DOMContentLoaded', updateCartUI);
}


function addToCart(product) {
    let cartItems = getCart();
    const existingProductIndex = cartItems.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantity += 1;
    } else {
        cartItems.push({
            ...product,
            quantity: 1
        });
    }

    updateCart(cartItems);
}

window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartUI();
    }
});