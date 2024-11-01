
document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const categorySelect = document.getElementById('category-select');

    
    function updateProducts() {
        const maxPrice = parseFloat(priceRange.value);
        const selectedCategory = categorySelect.value;

        priceValue.textContent = `$${maxPrice}`;

        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            const price = parseFloat(product.getAttribute('data-price'));
            const category = product.getAttribute('data-category');

            if (price <= maxPrice && (selectedCategory === 'all' || category === selectedCategory)) {
                product.style.display = 'block'; 
            } else {
                product.style.display = 'none'; 
            }
        });
    }

    priceRange.addEventListener('input', updateProducts);
    categorySelect.addEventListener('change', updateProducts);


    updateProducts();

    productsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn') && event.target.textContent === 'Add To Cart') {
            const productCard = event.target.closest('.product');
            const product = {
                name: productCard.querySelector('.title').textContent,
                price: productCard.querySelector('.price').textContent,
                image: productCard.querySelector('img').src,
                quantity: 1,
                size: 'M' 
            };

            Cart.addItem(product);
            updateNavbarCart();
            alert('Product added to cart successfully!');
        }
    });


    productsContainer.addEventListener('click', function(event) {
        const productCard = event.target.closest('.product');
        if (productCard && !event.target.classList.contains('btn')) {
            const product = {
                name: productCard.querySelector('.title').textContent,
                price: productCard.querySelector('.price').textContent,
                img: productCard.querySelector('img').src,
                id: productCard.id
            };
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            window.location.href = 'product-detail.html';
        }
    });
});