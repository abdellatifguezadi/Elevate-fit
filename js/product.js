

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

  
    if (priceRange) priceRange.addEventListener('input', updateProducts);
    if (categorySelect) categorySelect.addEventListener('change', updateProducts);

    updateProducts();


    if (productsContainer) {
        productsContainer.addEventListener('click', function(event) {
            const productCard = event.target.closest('.product');

            if (event.target.classList.contains('btn') && event.target.textContent === 'Add To Cart') {
                if (productCard) {
                    const product = {
                        name: productCard.querySelector('.title').textContent,
                        price: productCard.querySelector('.price').textContent,
                        image: productCard.querySelector('img').src,
                        quantity: 1,
                        size: 'M'
                    };

                    if (typeof Cart !== 'undefined' && Cart.addItem) {
                        Cart.addItem(product);
                        updateNavbarCart();
                   
                    }
                }
            }

            else if (productCard && !event.target.classList.contains('btn')) {

                const onclickAttr = productCard.getAttribute('onclick');
                if (onclickAttr) {

                    const match = onclickAttr.match(/goToProduct\((.*?)\)/);
                    if (match) {
    const productData = eval('(' + match[1] + ')');
    localStorage.setItem('selectedProduct', JSON.stringify(productData));
    window.location.href = 'product-detail.html';
}
                }
            }
        });
    }
});


function goToProduct(product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = 'product-detail.html';
}