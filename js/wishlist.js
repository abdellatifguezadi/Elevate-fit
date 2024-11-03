
document.addEventListener('DOMContentLoaded', () => {
    displayWishlistItems();
    updateCartCount();
    updateTotalPrice();
});
function displayWishlistItems() {
    const wishlistContainer = document.getElementById('wishlist-items');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <tr>
                <td colspan="3" class="empty-wishlist">Your wishlist is empty.</td>
            </tr>`;
        return;
    }

    wishlistContainer.innerHTML = wishlist.map(item => `
        <tr>
            <td>
                <img src="${item.image}" alt="${item.name}" width="80">
            </td>
            <td>
                <div class="product-details">
                    <span class="product-name">${item.name}</span>
                    <span class="product-price">${item.price}</span>
                    <span class="product-size">Size: ${item.size}</span>
                </div>
            </td>
            <td>
                <button class="add-to-cart" data-name="${item.name}" data-size="${item.size}">Add to Cart</button>
                <button class="remove-from-wishlist" data-name="${item.name}" data-size="${item.size}">Remove</button>
            </td>
        </tr>
    `).join('');

    attachEventListeners();
}

function attachEventListeners() {
    const removeButtons = document.querySelectorAll('.remove-from-wishlist');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');
            const itemSize = this.getAttribute('data-size');
            removeFromWishlist(itemName, itemSize);
        });
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');
            const itemSize = this.getAttribute('data-size');
            addToCartFromWishlist(itemName, itemSize);
        });
    });
}

function removeFromWishlist(itemName, itemSize) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => !(item.name === itemName && item.size === itemSize));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    displayWishlistItems();
}

function addToCartFromWishlist(itemName, itemSize) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const item = wishlist.find(item => item.name === itemName && item.size === itemSize);
    if (item) {
        const cartItem = {
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
            size: item.size
        };

        const existingCartItem = cart.find(cartItem => 
            cartItem.name === itemName && cartItem.size === itemSize
        );

        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        removeFromWishlist(itemName, itemSize);
        updateCartCount();
        updateTotalPrice();
        
        alert('Product added to cart!');
    }
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cartCountElement) {
        cartCountElement.textContent = totalItems > 0 ? totalItems : '';
    }
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const total = cart.reduce((sum, item) => {
        const price = typeof item.price === 'string' ? 
            parseFloat(item.price.replace('$', '')) : 
            parseFloat(item.price);
        return sum + (price * item.quantity);
    }, 0);
    
    if (totalPriceElement) {
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }
}

function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (!wishlist.some(item => item.name === product.name && item.size === product.size)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert('Product added to wishlist!');
        displayWishlistItems();
    } else {
        alert('This product is already in your wishlist!');
    }
}


window.addToWishlist = addToWishlist;
window.updateCartCount = updateCartCount;
window.updateTotalPrice = updateTotalPrice;