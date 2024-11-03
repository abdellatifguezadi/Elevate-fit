
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
                            <a href="#" class="remove-item" data-name="${item.name}">Remove</a>
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
    }

    bodyOfTable.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            event.preventDefault();
            const itemName = event.target.getAttribute('data-name');
            const itemSize = event.target.closest('tr').querySelector('small').textContent.split(': ')[1];
            removeItem(itemName, itemSize);
        }
    });

    bodyOfTable.addEventListener('input', function(event) {
        if (event.target.tagName === 'INPUT') {
            const itemName = event.target.getAttribute('data-name');
            const itemSize = event.target.getAttribute('data-size');
            const newQuantity = parseInt(event.target.value);
            
            // Trouver l'item spécifique avec le nom et la taille
            const item = cartItems.find(item => item.name === itemName && item.size === itemSize);

            if (item && newQuantity > 0) {
                item.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cartItems));

                const itemPrice = parseFloat(item.price.replace('$', ''));
                const newSubtotal = itemPrice * newQuantity;

                const subtotalCell = event.target.closest('tr').querySelector('.item-subtotal');
                subtotalCell.textContent = `$${newSubtotal.toFixed(2)}`;

                calculateTotal(); // Recalculer le total
                window.updateNavbarCart();
            }
        }
    });

    // Initialisation
    updateCartDisplay();
    window.updateNavbarCart();
});

function updateCheckoutButton() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (cartItems.length === 0) {
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.pointerEvents = 'none';
    } else {
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.pointerEvents = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', updateCheckoutButton);

function addToCart(product) {
    let cartItems = getCart(); // Récupérer les articles du panier

    const existingProductIndex = cartItems.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
        // Si le produit existe déjà, augmentez la quantité
        cartItems[existingProductIndex].quantity += product.quantity;
    } else {
        // Sinon, ajoutez un nouvel article
        cartItems.push(product);
    }

    updateCart(cartItems); // Mettez à jour le stockage du panier
    console.log("Cart updated:", cartItems); // Log pour débogage
}

// Fonction pour récupérer le panier
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Fonction pour mettre à jour le panier dans le localStorage
function updateCart(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Fonction pour mettre à jour l'affichage du panier
function updateNavbarCart() {
    const cartItems = getCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartCountElem = document.getElementById('cart-count');

    if (cartCountElem) {
        cartCountElem.innerHTML = cartCount > 0 ? cartCount : '';
    }
}