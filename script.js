// Mock product data
const products = [
    {
        id: 1,
        name: "Glock 19",
        category: "handguns",
        price: 599.99,
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        id: 2,
        name: "AR-15",
        category: "rifles",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        id: 3,
        name: "Mossberg 500",
        category: "shotguns",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        id: 4,
        name: "Tactical Holster",
        category: "accessories",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        id: 5,
        name: "Smith & Wesson M&P",
        category: "handguns",
        price: 549.99,
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        id: 6,
        name: "AK-47",
        category: "rifles",
        price: 799.99,
        image: "data:image/jpeg;base64,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"
    }
];

// Shopping cart state
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const overlay = document.querySelector('.overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize the page
function init() {
    displayProducts('all');
    setupEventListeners();
}

// Display products based on category
function displayProducts(category) {
    productGrid.innerHTML = '';
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Cart toggle
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);

    // Product filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayProducts(button.dataset.category);
        });
    });

    // Add to cart functionality
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });

    // Cart item quantity and removal
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-btn')) {
            const cartItem = e.target.closest('.cart-item');
            const productId = parseInt(cartItem.dataset.id);
            const action = e.target.dataset.action;
            
            if (action === 'increase') {
                updateCartItemQuantity(productId, 1);
            } else if (action === 'decrease') {
                updateCartItemQuantity(productId, -1);
            }
        } else if (e.target.classList.contains('remove-item')) {
            const cartItem = e.target.closest('.cart-item');
            const productId = parseInt(cartItem.dataset.id);
            removeFromCart(productId);
        }
    });
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCart();
}

// Update cart item quantity
function updateCartItemQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update cart display
function updateCart() {
    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-action="increase">+</button>
                </div>
            </div>
            <button class="remove-item">&times;</button>
        </div>
    `).join('');

    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalAmount.textContent = total.toFixed(2);

    // Update cart count
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 
