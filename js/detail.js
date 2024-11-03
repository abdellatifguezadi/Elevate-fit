

document.addEventListener('DOMContentLoaded', () => {
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

            console.log("Adding to cart:", cartItem);

     
            if (typeof addToCart === 'function') {
                addToCart(cartItem);
                updateNavbarCart(); 
            } else {
                console.error("addToCart function is not defined");
            }
        });
    } else {
        console.error("No product data found in localStorage");
    }
});