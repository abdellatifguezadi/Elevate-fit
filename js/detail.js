

// document.addEventListener('DOMContentLoaded', () => {
//     const productData = localStorage.getItem('selectedProduct');

//     if (productData) {
//         const product = JSON.parse(productData);

//         document.getElementById('product-name').innerText = product.name;
//         document.getElementById('product-price').innerText = product.price;
//         document.getElementById('product-img').src = product.img;


//         const smallImages = document.querySelectorAll('.small-img');
//         if (product.gallery && product.gallery.length > 0) {
//             smallImages.forEach((img, index) => {
//                 if (product.gallery[index]) {
//                     img.src = product.gallery[index];
//                 }
//             });
//         }

//         const ProductImg = document.getElementById("product-img");
//         smallImages.forEach((img) => {
//             img.onclick = function() {
//                 ProductImg.src = this.src;
//             }
//         });

//         const addToCartButton = document.getElementById('addToCart');
//         addToCartButton.addEventListener('click', (e) => {
//             e.preventDefault();

//             const quantity = parseInt(document.getElementById('quantity').value) || 1;
//             const size = document.querySelector('select').value;

//             const cartItem = {
//                 name: product.name,
//                 price: product.price,
//                 size: size,
//                 quantity: quantity,
//                 image: product.img
//             };

//             console.log("Adding to cart:", cartItem);

     
//             if (typeof addToCart === 'function') {
//                 addToCart(cartItem);
//                 updateNavbarCart(); 
//             } else {
//                 console.error("addToCart function is not defined");
//             }
//         });
//     } else {
//         console.error("No product data found in localStorage");
//     }

// // Dans detail.js, ajoutez ceci :
// document.addEventListener('DOMContentLoaded', () => {
//     // ... code existant ...

//     const addToWishlistButton = document.getElementById('addToWishlist');
//     addToWishlistButton.addEventListener('click', (e) => {
//         e.preventDefault();

//         const productData = JSON.parse(localStorage.getItem('selectedProduct'));
//         const wishlistItem = {
//             name: productData.name,
//             price: productData.price,
//             image: productData.img,
//             size: document.querySelector('select').value
//         };

//         addToWishlist(wishlistItem);
//         alert('Product added to wishlist!');
//     });
// });

// function addToWishlist(item) {
//     let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
//     // Vérifier si l'article existe déjà dans la wishlist
//     const exists = wishlist.some(wishlistItem => 
//         wishlistItem.name === item.name && wishlistItem.size === item.size
//     );

//     if (!exists) {
//         wishlist.push(item);
//         localStorage.setItem('wishlist', JSON.stringify(wishlist));
//     }
// }

// });



document.addEventListener('DOMContentLoaded', () => {
    const productData = localStorage.getItem('selectedProduct');

    if (productData) {
        const product = JSON.parse(productData);

        // Mettre à jour l'affichage du produit
        document.getElementById('product-name').innerText = product.name;
        document.getElementById('product-price').innerText = product.price;
        document.getElementById('product-img').src = product.img;

        // Gérer les petites images
        const smallImages = document.querySelectorAll('.small-img');
        if (product.gallery && product.gallery.length > 0) {
            smallImages.forEach((img, index) => {
                if (product.gallery[index]) {
                    img.src = product.gallery[index];
                }
            });
        }

        // Gérer le clic sur les petites images
        const ProductImg = document.getElementById("product-img");
        smallImages.forEach((img) => {
            img.onclick = function() {
                ProductImg.src = this.src;
            }
        });

        // Gérer le bouton Add To Cart
        const addToCartButton = document.getElementById('addToCart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', (e) => {
                e.preventDefault();
                const quantity = parseInt(document.getElementById('quantity').value) || 1;
                const size = document.querySelector('select').value;

                const cartItem = {
                    name: product.name,
                    price: product.price,
                    image: product.img,
                    quantity: quantity,
                    size: size
                };

                if (typeof window.addToCart === 'function') {
                    window.addToCart(cartItem);
                    alert('Product added to cart!');
                }
            });
        }

        // Gérer le bouton Add To Wishlist
        const addToWishlistButton = document.getElementById('addToWishlist');
        if (addToWishlistButton) {
            addToWishlistButton.addEventListener('click', (e) => {
                e.preventDefault();
                const size = document.querySelector('select').value;

                const wishlistItem = {
                    name: product.name,
                    price: product.price,
                    image: product.img,
                    size: size
                };

                if (typeof window.addToWishlist === 'function') {
                    window.addToWishlist(wishlistItem);
                }
            });
        }
    }
});