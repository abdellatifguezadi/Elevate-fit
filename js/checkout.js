

document.addEventListener('DOMContentLoaded', function() {

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');


    function displayCheckoutItems() {
        let subtotal = 0;
        

        checkoutItemsContainer.innerHTML = '';


        cartItems.forEach(item => {
            const itemTotal = parseFloat(item.price.replace('$', '')) * item.quantity;
            subtotal += itemTotal;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.name} x ${item.quantity}(Qty)<br>
                <small>Size: ${item.size}</small></td>
                <td>$${itemTotal.toFixed(2)}</td>
            `;
            checkoutItemsContainer.appendChild(tr);
        });

   
        checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }


    function removeNavbar() {
        const navbar = document.getElementById('nav');
        if (navbar) {
            navbar.style.display = 'none';
        }
    }

    
    function handlePlaceOrder() {
       
        removeNavbar();
        
   
        localStorage.removeItem('cart');
        
        
        
  
        setTimeout(() => {
            window.location.href = 'index.html';  page
        }, 20); 
    }

    displayCheckoutItems();

    const placeOrderButton = document.querySelector('button[type="button"]');
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', handlePlaceOrder);
    }
});

