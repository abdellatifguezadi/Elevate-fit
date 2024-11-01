
document.addEventListener('DOMContentLoaded', function() {

    const ProductImg = document.getElementById("product-img");
    const SmallImg = document.getElementsByClassName("small-img");

    if (SmallImg.length > 0) {
        Array.from(SmallImg).forEach((img) => {
            img.onclick = function() {
                ProductImg.src = this.src;
            }
        });
    }


    window.addToCart = function(product) {
        let cartItems = getCart();
        
 
        const existingItem = cartItems.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                ...product,
                quantity: 1
            });
        }

        updateCart(cartItems);
    }

    window.showProductDetails = function(product) {

        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = 'product-detail.html';
    }
});