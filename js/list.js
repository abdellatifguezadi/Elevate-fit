

document.addEventListener('DOMContentLoaded', function() {
    const bodyOfTable = document.querySelector('.bodyOfTable');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotalPriceElem = document.getElementById('subtotalPrice');
    const totalPriceElem = document.getElementById('totalPrice');

    function updateTotalPrice() {
        let totalPrice = 0;
        cartItems.forEach(item => {
            const itemSubtotal = parseFloat(item.price.replace('$', '')) * item.quantity;
            totalPrice += itemSubtotal;
        });

        totalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
        subtotalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
    }

    function updateCartCount() {
        const totalCount = cartItems.reduce((count, item) => count + item.quantity, 0);
        const cartCountElem = document.getElementById('cart-count');
        cartCountElem.textContent = totalCount > 0 ? totalCount : '';
    }

    function removeItem(itemName) {
        cartItems = cartItems.filter(item => item.name !== itemName);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartDisplay();
        updateTotalPrice();
        updateCartCount();
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
                    <input type="number" value="${item.quantity}" min="1" data-name="${item.name}">
                </td>
                <td class="item-subtotal">$${itemSubtotal.toFixed(2)}</td>
            `;
            bodyOfTable.appendChild(newTr);
        });
    }

    bodyOfTable.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            event.preventDefault();
            const itemName = event.target.getAttribute('data-name');
            removeItem(itemName);
        }
    });

    bodyOfTable.addEventListener('input', function(event) {
        if (event.target.tagName === 'INPUT') {
            const itemName = event.target.getAttribute('data-name');
            const newQuantity = parseInt(event.target.value);
            const item = cartItems.find(item => item.name === itemName);

            if (item && newQuantity > 0) {
                item.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cartItems));

                const itemPrice = parseFloat(item.price.replace('$', ''));
                const newSubtotal = itemPrice * newQuantity;

                const subtotalCell = event.target.closest('tr').querySelector('.item-subtotal');
                subtotalCell.textContent = `$${newSubtotal.toFixed(2)}`;

                updateTotalPrice();
                updateCartCount();
            }
        }
    });

    const menuIcon = document.querySelector('.fa-bars');
    const menuBarSide = document.querySelector('.menu-bar-side');
    
    if (menuIcon && menuBarSide) {
        menuIcon.addEventListener('click', function() {
            menuBarSide.classList.toggle('show');
        });
    }

    updateCartDisplay();
    updateTotalPrice();
    updateCartCount();
});


