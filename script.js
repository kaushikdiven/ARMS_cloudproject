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
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
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