
document.addEventListener('DOMContentLoaded', function() {
    const bodyOfTable = document.querySelector('.bodyOfTable');
    const subtotalPriceElem = document.getElementById('subtotalPrice');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    function removeItem(itemName, itemSize) {
        cartItems = cartItems.filter(item => !(item.name === itemName && item.size === itemSize));
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartDisplay();
        window.updateNavbarCart();
    }
    
    function calculateTotal() {
        const total = cartItems.reduce((total, item) => {
            return total + (parseFloat(item.price.replace('$', '')) * item.quantity);
        }, 0);
        subtotalPriceElem.textContent = `$${total.toFixed(2)}`;
    }

    function updateCartDisplay() {
        bodyOfTable.innerHTML = '';
        cartItems.forEach(item => {
            const itemSubtotal = parseFloat(item.price.replace('$', '')) * item.quantity;
            const newTr = document.createElement('tr');
            newTr.innerHTML = `
                <td>
                    <div class="cart-info">
                        <img src="${item.image}" alt="">
                        <div>
                            <p>${item.name}</p>
                            <small>Size: ${item.size}</small><br>
                            <small>Price: ${item.price}</small><br>
                            <a href="#" class="remove-item" data-name="${item.name}" data-size="${item.size}">Remove</a>
                        </div>
                    </div>
                </td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" data-name="${item.name}" data-size="${item.size}">
                </td>
                <td class="item-subtotal">$${itemSubtotal.toFixed(2)}</td>
            `;
            bodyOfTable.appendChild(newTr);
        });

        calculateTotal();
        updateCheckoutButton();
    }

    bodyOfTable.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const itemName = event.target.getAttribute('data-name');
            const itemSize = event.target.getAttribute('data-size');
            removeItem(itemName, itemSize);
        }
    });

    bodyOfTable.addEventListener('input', function(event) {
        if (event.target.tagName === 'INPUT') {
            const itemName = event.target.getAttribute('data-name');
            const itemSize = event.target.getAttribute('data-size');
            const newQuantity = parseInt(event.target.value);
            
            const item = cartItems.find(item => item.name === itemName && item.size === itemSize);

            if (item && newQuantity > 0) {
                item.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cartItems));

                const itemPrice = parseFloat(item.price.replace('$', ''));
                const newSubtotal = itemPrice * newQuantity;

                const subtotalCell = event.target.closest('tr').querySelector('.item-subtotal');
                subtotalCell.textContent = `$${newSubtotal.toFixed(2)}`;

                calculateTotal();
                window.updateNavbarCart();
            }
        }
    });

    function updateCheckoutButton() {
        const checkoutBtn = document.querySelector('.checkout-btn');
        
        if (cartItems.length === 0) {
            checkoutBtn.style.opacity = '0.5';
            checkoutBtn.style.pointerEvents = 'none';
        } else {
            checkoutBtn.style.opacity = '1';
            checkoutBtn.style.pointerEvents = 'auto';
        }
    }


    updateCartDisplay();
    window.updateNavbarCart();
});

function addToCart(product) {
    let cartItems = getCart();

    const existingProductIndex = cartItems.findIndex(item => item.name === product.name && item.size === product.size);

    if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantity += product.quantity;
    } else {
        cartItems.push(product);
    }

    updateCart(cartItems);
    console.log("Cart updated:", cartItems);
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateCart(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateNavbarCart();
}

function updateNavbarCart() {
    const cartItems = getCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartCountElem = document.getElementById('cart-count');

    if (cartCountElem) {
        cartCountElem.innerHTML = cartCount > 0 ? cartCount : '';
    }
}

window.addToCart = addToCart;
window.updateNavbarCart = updateNavbarCart;