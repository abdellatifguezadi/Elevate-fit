
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
        if (addToCartButton) {
            addToCartButton.addEventListener('click', (e) => {
                e.preventDefault();
                const quantity = parseInt(document.getElementById('quantity').value) || 1;
                const size = document.querySelector('select').value;

                const cartItem = {
                    name: product.name,
                    price: product.price,
                    image: product.img,
                    quantity: quantity,
                    size: size
                };

                if (typeof window.addToCart === 'function') {
                    window.addToCart(cartItem);
                    alert('Product added to cart!');
                }
            });
        }

        const addToWishlistButton = document.getElementById('addToWishlist');
        if (addToWishlistButton) {
            addToWishlistButton.addEventListener('click', (e) => {
                e.preventDefault();
                const size = document.querySelector('select').value;

                const wishlistItem = {
                    name: product.name,
                    price: product.price,
                    image: product.img,
                    size: size
                };

                if (typeof window.addToWishlist === 'function') {
                    window.addToWishlist(wishlistItem);
                }
            });
        }
    }
});