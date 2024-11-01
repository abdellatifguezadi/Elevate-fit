
document.addEventListener('DOMContentLoaded', function() {

    window.updateCart = function(cartItems) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'cart',
            newValue: JSON.stringify(cartItems)
        }));
        updateNavbarCart();
    };

    window.getCart = function() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    };

    function updateNavbarCart() {
        const cartItems = getCart();
r
        const cartCountElem = document.getElementById('cart-count');
        if (cartCountElem) {
            const totalCount = cartItems.reduce((count, item) => count + item.quantity, 0);
            cartCountElem.textContent = totalCount > 0 ? totalCount : '';
        }

        const totalPriceElem = document.getElementById('totalPrice');
        if (totalPriceElem) {
            const totalPrice = cartItems.reduce((total, item) => {
                return total + (parseFloat(item.price.replace('$', '')) * item.quantity);
            }, 0);
            totalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
        }
    }

    window.addEventListener('storage', function(e) {
        if (e.key === 'cart') {
            updateNavbarCart();
        }
    });

    const menuIcon = document.querySelector('.fa-bars');
    const menuBarSide = document.querySelector('.menu-bar-side');
    
    if (menuIcon && menuBarSide) {
        menuIcon.addEventListener('click', function() {
            menuBarSide.classList.toggle('show');
        });
    }

    updateNavbarCart();
});