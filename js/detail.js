

document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (product) {
        document.getElementById('product-name').innerText = product.name;
        document.getElementById('product-img').src = product.img;
        document.getElementById('product-price').innerText = product.price;

        const addToCartButton = document.getElementById('addToCart');
        addToCartButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            const quantity = parseInt(document.getElementById('quantity').value) || 1;
            const size = document.querySelector('select').value;
            
            const cartItem = {
                name: product.name,
                price: product.price,
                size: size,
                quantity: quantity,
                image: product.img
            };

            Cart.addItem(cartItem);
            updateNavbarCart();
        });
    }

    const ProductImg = document.getElementById("product-img");
    const SmallImg = document.getElementsByClassName("small-img");

    if (SmallImg.length > 0) {
        Array.from(SmallImg).forEach((img) => {
            img.onclick = function() {
                ProductImg.src = this.src;
            }
        });
    }
});