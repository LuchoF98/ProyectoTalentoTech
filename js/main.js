// Variables
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const closeModal = document.getElementById('closeModal');
const addToCartButtons = document.querySelectorAll('.addToCart');
const cartItemsList = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const finishButton = document.getElementById('botonComprar')
const cartCount = document.getElementById('cartCount');

let cart = [];


// Mostrar/Ocultar modal
cartButton.addEventListener('click', () => {
  cartModal.classList.toggle('hidden');
});

closeModal.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

// Agregar producto al carrito
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const image = button.dataset.image;

    // Agregar al carrito
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem('productos', JSON.stringify(cart));
    localStorage.setItem('total', price);
    
    function handleCart() {
      const carrito = JSON.parse(localStorage.getItem('productos')) || [];
      const totalCarrito = localStorage('total') || 0;

      const carritoContainer = document.getElementById('cartItems');

      if (cart.length === 0) {
        carritoContainer.innerHTML = '<p> No hay productos en el carrito. </p>';
        return;
      }
    }
    
    updateCart();
  });
});

// Actualizar el carrito
function updateCart() {
  // Actualizar lista de productos
  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="50">
      ${item.name} - $${item.price} x ${item.quantity}
    `;
    cartItemsList.appendChild(listItem);
  });

  // Actualizar total y contador
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}



// Funcion para vaciar carrito 

function clearCart() {
    cart = [];
    
// Actualiza interfaz de Carrito
updateCart();
} 

const clearCartButton = document.getElementById('removeFromCart');
clearCartButton.addEventListener('click', clearCart);


// Finalizar compra
finishButton.addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío. Agrega productos para finalizar la compra.");
    } else {
      const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const confirmation = confirm(`El total de tu compra es: $${totalAmount.toFixed(2)}\n¿Deseas finalizar la compra?`);
  
      if (confirmation) {
        // Limpiar carrito después de la compra
        clearCart();
        alert("¡Compra realizada con éxito! Gracias por tu compra.");
        cartModal.classList.add('hidden'); // Cerrar modal
      }
    }
  });
  
 