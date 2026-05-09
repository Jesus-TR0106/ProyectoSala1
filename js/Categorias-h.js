// Los datos de producto se cargan desde js/products.js
 
let cartCount       = 0;
let currentFilter   = "Todos";
let currentSaleFilter = false;
 
//RESTAURAR CARRITO DESDE LOCALSTORAGE
(function restaurarCarrito() {
  const guardado = localStorage.getItem("carritoNovaStreet");
  if (!guardado) return;
 
  try {
    const items = JSON.parse(guardado);
    // Restaurar qty de los productos que ya estaban en el carrito
    items.forEach(function (item) {
      const p = products.find(function (p) { return p.id === item.id; });
      if (p) { p.qty = item.qty; }
    });
  } catch (error) {
    console.error('Error parsing carrito:', error);
    localStorage.removeItem("carritoNovaStreet");
  }
 
  // Recalcular el contador del navbar
  cartCount = products.reduce(function (sum, p) { return sum + p.qty; }, 0);
  document.getElementById('cart-count').textContent = cartCount;
})();
 
//GUARDAR CARRITO EN LOCALSTORAGE
function guardarCarritoLocal() {
  // Leer el carrito actual guardado para no perder items de otras páginas
  const guardado = localStorage.getItem("carritoNovaStreet");
  let carritoActual = [];
  
  if (guardado) {
    try {
      carritoActual = JSON.parse(guardado);
    } catch (error) {
      console.error('Error parsing carrito:', error);
      localStorage.removeItem("carritoNovaStreet");
      carritoActual = [];
    }
  }
 
  // Actualizar o agregar los productos de esta página
  products.forEach(function (p) {
    const idx = carritoActual.findIndex(function (i) { return i.id === p.id; });
    if (p.qty > 0) {
      const item = { id: p.id, name: p.name, cat: p.cat, price: p.price, image: p.image, bg: p.bg, qty: p.qty };
      if (idx >= 0) {
        carritoActual[idx] = item; // actualizar
      } else {
        carritoActual.push(item);  // agregar nuevo
      }
    } else if (idx >= 0) {
      carritoActual.splice(idx, 1); // eliminar si qty llegó a 0
    }
  });
 
  localStorage.setItem("carritoNovaStreet", JSON.stringify(carritoActual));
 
  // Actualizar el contador con el total global
  const totalGlobal = carritoActual.reduce(function (sum, i) { return sum + i.qty; }, 0);
  document.getElementById('cart-count').textContent = totalGlobal;
}
 
//CARRITO
function addToCart(id) {
  const p = products.find(function (p) { return p.id === id; });
  if (!p) return;
  p.qty++;
  cartCount++;
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 2200);
  guardarCarritoLocal(); //  sincroniza con localStorage
  renderProducts();
  renderCartBar();
}
 
function removeFromCart(id) {
  const p = products.find(function (p) { return p.id === id; });
  if (!p || p.qty === 0) return;
  p.qty--;
  cartCount--;
  guardarCarritoLocal(); //  sincroniza con localStorage
  renderProducts();
  renderCartBar();
}
 
function renderCartBar() {
  const bar     = document.getElementById('cart-bar');
  const namesEl = document.getElementById('cart-bar-names');
  const totalEl = document.getElementById('cart-bar-total');
 
  // Mostrar solo los items de ESTA página en la barra
  const items = products.filter(function (p) { return p.qty > 0; });
 
  if (!items.length) {
    // Si no hay items en esta página, revisar si hay en otras páginas
    const guardado = localStorage.getItem("carritoNovaStreet");
    let global = [];
    if (guardado) {
      try {
        global = JSON.parse(guardado);
      } catch (error) {
        console.error('Error parsing carrito:', error);
        localStorage.removeItem("carritoNovaStreet");
        global = [];
      }
    }
    if (!global.length) {
      bar.classList.remove('visible');
      return;
    }
    const totalAmt = global.reduce(function (sum, p) { return sum + parseFloat(p.price) * p.qty; }, 0);
    const totalQty = global.reduce(function (sum, p) { return sum + p.qty; }, 0);
    namesEl.textContent = global.map(function (p) { return p.name + ' x' + p.qty; }).join('  ·  ');
    totalEl.textContent = 'S/ ' + totalAmt.toFixed(2) + '  ·  ' + totalQty + ' ' + (totalQty === 1 ? 'producto' : 'productos');
    bar.classList.add('visible');
    return;
  }
 
  const totalAmt = items.reduce(function (sum, p) { return sum + parseFloat(p.price) * p.qty; }, 0);
  const totalQty = items.reduce(function (sum, p) { return sum + p.qty; }, 0);
  namesEl.textContent = items.map(function (p) { return p.name + ' x' + p.qty; }).join('  ·  ');
  totalEl.textContent = 'S/ ' + totalAmt.toFixed(2) + '  ·  ' + totalQty + ' ' + (totalQty === 1 ? 'producto' : 'productos');
  bar.classList.add('visible');
}
 
//RENDER PRODUCTOS
function renderProducts() {
  const grid = document.getElementById('products-grid');
 
  // FILTRAR PRIMERO POR HOMBRES
  let filtered = products.filter(function (p) { return p.cat === "Hombre"; });
 
  if (currentFilter !== "Todos") {
    filtered = filtered.filter(function (p) { return p.subcat === currentFilter; });
  }
  if (currentSaleFilter) {
    filtered = filtered.filter(function (p) { return p.badge === "sale"; });
  }
 
  grid.innerHTML = filtered.map(function (p) {
    return '<div class="product-card">' +
      '<div class="product-img" style="background:' + p.bg + '">' +
        (p.badge ? '<span class="badge ' + (p.badge === 'new' ? 'badge-new' : 'badge-sale') + '">' + (p.badge === 'new' ? 'Nuevo' : 'Sale') + '</span>' : '') +
        '<img src="' + p.image + '" alt="' + p.name + '" style="width:100px;height:auto"/>' +
      '</div>' +
      '<div class="product-info">' +
        '<div class="product-name">' + p.name + '</div>' +
        '<div class="product-cat">' + p.cat + '</div>' +
        '<div class="product-footer">' +
          '<div>' +
            '<span class="price">S/ ' + p.price + '</span>' +
            (p.oldPrice ? '<span class="price-old">S/ ' + p.oldPrice + '</span>' : '') +
          '</div>' +
          '<div class="qty-ctrl">' +
            (p.qty > 0 ? '<button class="minus-btn" onclick="removeFromCart(' + p.id + ')">−</button><span class="qty-num">' + p.qty + '</span>' : '') +
            '<button class="add-btn" onclick="addToCart(' + p.id + ')">+</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}
 
//FILTRO POR CATEGORÍA (click en cat-card)
document.querySelectorAll('.cat-card').forEach(function (card) {
  card.addEventListener('click', function () {
    const cat = card.getAttribute('data-cat');
    currentFilter     = cat;
    currentSaleFilter = false;
    document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
    document.querySelectorAll('.cat-card').forEach(function (c) { c.classList.remove('active-cat'); });
    card.classList.add('active-cat');
    renderProducts();
  });
});
 
//INICIO
renderProducts();
renderCartBar();

// GUÍA DE TALLAS
function openSizeGuide() {
  const modal = document.getElementById('size-modal');
  modal.classList.add('active');
  
  document.addEventListener('keydown', function escapeHandler(e) {
    if (e.key === 'Escape') {
      closeSizeGuide();
      document.removeEventListener('keydown', escapeHandler);
    }
  });
}

function closeSizeGuide(e) {
  if (e && e.target.id !== 'size-modal') return;
  const modal = document.getElementById('size-modal');
  modal.classList.remove('active');
}

// OVERRIDE: RENDERIZAR PRODUCTOS CON FAVORITOS
const originalRenderProducts = renderProducts;

(function() {
  const oldRenderProducts = window.renderProducts;
  
  window.renderProducts = function() {
    const grid = document.getElementById('products-grid');
    let filtered;
    
    if (currentFilter === "Favoritos") {
      filtered = products.filter(p => isFavorited(p.id));
      if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999890;">No tienes productos favoritos</div>';
        return;
      }
    } else if (currentFilter === "Todos") {
      filtered = products.filter(p => p.cat === "Hombre");
    } else if (currentFilter === "Sale") {
      filtered = products.filter(p => p.cat === "Hombre" && p.badge === "sale");
    } else if (["Mujer","Hombre"].includes(currentFilter)) {
      filtered = products.filter(p => p.cat === currentFilter);
    } else if (categoryMap[currentFilter]) {
      filtered = products.filter(p => p.cat === "Hombre" && categoryMap[currentFilter](p));
    } else {
      filtered = products.filter(p => p.cat === "Hombre");
    }

    grid.innerHTML = filtered.map(p => `
      <div class="product-card">
        <div class="product-img" style="background:${p.bg};position:relative;">
          ${p.badge ? `<span class="badge ${p.badge === 'new' ? 'badge-new' : 'badge-sale'}">${p.badge === 'new' ? 'Nuevo' : 'Sale'}</span>` : ''}
          <button class="heart-icon ${isFavorited(p.id) ? 'favorited' : ''}" onclick="toggleFavorite(${p.id}); event.stopPropagation();" title="Agregar a favoritos" style="position:absolute;top:10px;right:10px;background:rgba(255,255,255,0.9);border-radius:50%;padding:4px;display:flex;align-items:center;justify-content:center;">${isFavorited(p.id) ? '❤️' : '🤍'}</button>
          <img src="${p.image}" alt="${p.name}" style="width:100px;height:auto"/>
        </div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-cat">${p.cat}</div>
          <div class="product-footer">
            <div>
              <span class="price">S/ ${p.price}</span>
              ${p.oldPrice ? `<span class="price-old">S/ ${p.oldPrice}</span>` : ''}
            </div>
            <div class="qty-ctrl">
              ${p.qty > 0 ? `
                <button class="minus-btn" onclick="removeFromCart(${p.id})">−</button>
                <span class="qty-num">${p.qty}</span>
              ` : ''}
              <button class="add-btn" onclick="addToCart(${p.id})">+</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  };
})();

// INICIALIZACIÓN
restaurarFavoritos();
renderProducts();
renderCartBar();