function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }
  const existingItem = cart.find((item) => item.id === product.id);
  let totalQuantity = quantity;

  if (existingItem) {
    totalQuantity = existingItem.quantity + quantity;
  }

  if (totalQuantity > product.stock) {
    throw new RangeError('Количество превышает остаток на складе');
  }
  if (existingItem) {
    return cart.map((item) => {
      if (item.id === product.id) {
        return {
          ...item,
          quantity: item.quantity + quantity,
        };
      }

      return item;
    });
  }

  const cartItem = {
    ...product,
    quantity: quantity,
  };

  return [...cart, cartItem];
}
function changeQuantity(cart, productId, quantity) {
  return cart.map((item) => {
    if (item.id === productId) {
      if (quantity <= 0) {
        throw new RangeError('Количество должно быть больше нуля');
      }
      if (quantity > item.stock) {
        throw new RangeError('Количество превышает остаток на складе');
      }
      return {
        ...item,
        quantity: quantity,
      };
    }

    return item;
  });
}
function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}
function calculateCartSubtotal(cart) {
  let subtotal = 0;

  for (const item of cart) {
    subtotal = subtotal + item.price * item.quantity;
  }

  return subtotal;
}
function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  let discount = 0;

  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = subtotal * 0.1;
  }

  let delivery = 0;

  if (subtotal < 50000) {
    delivery = 30000;
  }

  const total = subtotal - discount + delivery;

  return {
    subtotal: subtotal,
    discount: discount,
    delivery: delivery,
    total: total,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
