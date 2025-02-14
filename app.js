const cart = [];
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCartBtn = document.getElementById('close-cart-btn');

// Fetch Products
fetch('backend/products.php')
    .then(response => response.json())
    .then(products => {
        const container = document.querySelector('.product-container');
        products.forEach(product => {
            const productElem = document.createElement('div');
            productElem.classList.add('product');
            productElem.innerHTML = `
                <img src="images/${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="add-to-cart-btn" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}">Add to Cart</button>
            `;
            container.appendChild(productElem);
        });
    });

// Add to Cart
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const productId = event.target.getAttribute('data-product-id');
        const productName = event.target.getAttribute('data-product-name');
        const productPrice = parseFloat(event.target.getAttribute('data-product-price'));

        cart.push({ id: productId, name: productName, price: productPrice });
        updateCart();
    }
});

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        const itemElem = document.createElement('div');
        itemElem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(itemElem);
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    document.getElementById('cart-count').textContent = cart.length;
}

cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});
