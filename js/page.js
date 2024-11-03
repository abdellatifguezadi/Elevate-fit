

function loadProductDetails() {
    const productData = localStorage.getItem('selectedProduct');
    if (productData) {
        const product = JSON.parse(productData);

        document.getElementById('product-name').innerText = product.name;
        document.getElementById('product-price').innerText = product.price;
        document.getElementById('product-img').src = product.img;

        const smallImages = document.querySelectorAll('.small-img');
        if (product.gallery && product.gallery.length > 0) {
            smallImages.forEach((img, index) => {
                if (product.gallery[index]) {
                    img.src = product.gallery[index];
                }
            });
        }

        const ProductImg = document.getElementById("product-img");
        smallImages.forEach((img) => {
            img.onclick = function() {
                ProductImg.src = this.src;
            }
        });

        localStorage.removeItem('selectedProduct'); 
    }
}
function goToProduct(product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = 'product-detail.html';
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