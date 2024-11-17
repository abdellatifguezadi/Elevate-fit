

const Cart = {
    getItems: function() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    },

    setItems: function(items) {
        localStorage.setItem('cart', JSON.stringify(items));
    },

    addItem: function(item) {
        const cart = this.getItems();
        const existingItemIndex = cart.findIndex(i => i.name === item.name && i.size === item.size);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += item.quantity;
        } else {
            cart.push(item);
        }
        
        this.setItems(cart);
        this.updateTotals();
    },

    removeItem: function(itemName, itemSize) {
        let cart = this.getItems();
        cart = cart.filter(item => !(item.name === itemName && item.size === itemSize));
        this.setItems(cart);
        this.updateTotals();
    },

    updateItemQuantity: function(itemName, itemSize, newQuantity) {
        const cart = this.getItems();
        const item = cart.find(i => i.name === itemName && i.size === itemSize);
        if (item) {
            item.quantity = newQuantity;
            this.setItems(cart);
            this.updateTotals();
        }
    },

    getTotalCount: function() {
        return this.getItems().reduce((total, item) => total + item.quantity, 0);
    },
    

    getTotalPrice: function() {
        return this.getItems().reduce((total, item) => {
            return total + (parseFloat(item.price.replace('$', '')) * item.quantity);
        }, 0);
    },

    updateTotals: function() {
        localStorage.setItem('cartCount', this.getTotalCount());
        localStorage.setItem('totalPrice', this.getTotalPrice());
    },

    updateNavbar: function() {
        const cartCountElem = document.getElementById('cart-count');
        const totalPriceElem = document.getElementById('totalPrice');
        
        if (cartCountElem) cartCountElem.textContent = this.getTotalCount();
        if (totalPriceElem) totalPriceElem.textContent = `$${this.getTotalPrice().toFixed(2)}`;
    }
};

window.updateNavbarCart = function() {
    Cart.updateNavbar();
};

document.addEventListener('DOMContentLoaded', function() {
    updateNavbarCart();

});