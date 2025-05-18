let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartCount = document.getElementById('cartCount');
const cartItemsList = document.getElementById('cartItems');
const buyBtn = document.getElementById('buyBtn');
const paymentForm = document.getElementById('paymentForm');

function updateCartUI() {
  if (cartCount) cartCount.textContent = cart.length;
  if (cartItemsList) {
    cartItemsList.innerHTML = '';
    cart.forEach((item, i) => {
      const li = document.createElement('li');
      li.textContent = `${i + 1}. ${item}`;
      cartItemsList.appendChild(li);
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
}

updateCartUI();

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.closest('.producto').dataset.name;
    cart.push(name);
    updateCartUI();
  });
});

//Formulario
document.getElementById('buyBtn')?.addEventListener('click', () => {
  if (!cart.length) return alert('Tu carrito está vacío.');
  paymentForm.style.display = 'block';
  buyBtn.style.display = 'none';
});

// Procesar pago 
paymentForm?.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('cardName').value;
  const number = document.getElementById('cardNumber').value;
  const expiry = document.getElementById('expiryDate').value;
  const cvv = document.getElementById('cvv').value;
  if (!name || !number || !expiry || !cvv) {
    return alert('Completa todos los campos.');
  }
  setTimeout(() => {
    alert('Gracias por tu compra!');
    cart = [];
    updateCartUI();
    paymentForm.reset();
    paymentForm.style.display = 'none';
    buyBtn.style.display = 'block';
  }, 500);
});