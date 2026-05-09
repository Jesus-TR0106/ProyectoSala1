// Proyecto.js - Lógica específica de la página principal

let cartCount = 0;
let currentFilter = "Todos";

// CATEGORÍAS: mapeo de subcategorías directas desde campo 'subcat'
const categoryMap = {
  'Vestidos': p => p.subcat === 'Vestidos',
  'Tops': p => p.subcat === 'Tops',
  'Pantalones': p => p.subcat === 'Pantalones',
  'Abrigos': p => p.subcat === 'Abrigos'
};

// EXPONER GLOBALMENTE
window.categoryMap = categoryMap;

// ✅ NUEVO: guardar carrito en localStorage
function guardarCarritoLocal() {
  const items = products
    .filter(function(p) { return p.qty > 0; })
    .map(function(p) {
      return { id: p.id, name: p.name, cat: p.cat, price: p.price, image: p.image, bg: p.bg, qty: p.qty };
    });
  localStorage.setItem("carritoNovaStreet", JSON.stringify(items));
}

function renderCartBar() {
  const bar     = document.getElementById('cart-bar');
  const namesEl = document.getElementById('cart-bar-names');
  const totalEl = document.getElementById('cart-bar-total');

  const items = products.filter(p => p.qty > 0);

  if (!items.length) {
    bar.classList.remove('visible');
    return;
  }

  const totalAmt = items.reduce((sum, p) => sum + parseFloat(p.price) * p.qty, 0);
  const totalQty = items.reduce((sum, p) => sum + p.qty, 0);

  namesEl.textContent = items.map(p => `${p.name} ×${p.qty}`).join('  ·  ');
  totalEl.textContent = `S/ ${totalAmt.toFixed(2)}  ·  ${totalQty} ${totalQty === 1 ? 'producto' : 'productos'}`;
  bar.classList.add('visible');
}

// OVERRIDE: RENDERIZAR PRODUCTOS CON FAVORITOS
window.renderProducts = function() {
  const grid = document.getElementById('products-grid');
  if (!grid) {
    console.error('products-grid element not found');
    return;
  }

  let filtered;

  if (currentFilter === "Favoritos") {
    filtered = products.filter(p => isFavorited(p.id));
    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999890;">No tienes productos favoritos</div>';
      return;
    }
  } else if (currentFilter === "Todos") {
    filtered = products;
  } else if (currentFilter === "Sale") {
    filtered = products.filter(p => p.badge === "sale");
  } else if (["Mujer","Hombre"].includes(currentFilter)) {
    filtered = products.filter(p => p.cat === currentFilter);
  } else if (categoryMap[currentFilter]) {
    filtered = products.filter(categoryMap[currentFilter]);
  } else {
    filtered = products;
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

// ✅ MODIFICADO: ahora guarda en localStorage
function addToCart(id) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  p.qty++;
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
  guardarCarritoLocal(); // ✅
  renderProducts();
  renderCartBar();
}

// ✅ MODIFICADO: ahora guarda en localStorage
function removeFromCart(id) {
  const p = products.find(p => p.id === id);
  if (!p || p.qty === 0) return;
  p.qty--;
  cartCount--;
  document.getElementById('cart-count').textContent = cartCount;
  guardarCarritoLocal(); // ✅
  renderProducts();
  renderCartBar();
}

function setFilter(btn, filter) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = filter;
  renderProducts();
}

function setEmojiFilter(emoji) {
  currentFilter = emoji;
  renderProducts();
}

function filterByCategory(categoryName) {
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.cat-card').forEach(c => {
    if (c.getAttribute('data-cat') === categoryName) c.classList.add('active');
  });

  currentFilter = categoryName;
  renderProducts();
  scrollToProducts();
}

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

// BÚSQUEDA
function openSearch() {
  const modal = document.getElementById('search-modal');
  modal.classList.add('active');
  document.getElementById('search-input').focus();

  // Cerrar con ESC
  document.addEventListener('keydown', function escapeHandler(e) {
    if (e.key === 'Escape') {
      closeSearch();
      document.removeEventListener('keydown', escapeHandler);
    }
  });
}

function closeSearch(e) {
  if (e && e.target.id !== 'search-modal') return;
  const modal = document.getElementById('search-modal');
  modal.classList.remove('active');
  document.getElementById('search-input').value = '';
  document.getElementById('search-results').innerHTML = '';
}

function searchProducts(query) {
  const resultsEl = document.getElementById('search-results');

  if (!query.trim()) {
    resultsEl.innerHTML = '';
    return;
  }

  const q = query.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.cat.toLowerCase().includes(q) ||
    (p.subcat && p.subcat.toLowerCase().includes(q))
  );

  if (filtered.length === 0) {
    resultsEl.innerHTML = '<div class="search-no-results">No se encontraron productos</div>';
    return;
  }

  resultsEl.innerHTML = filtered.map(p => `
    <div class="search-result-item" onclick="closeSearch(); scrollToProducts();">
      <div class="search-result-img" style="background: ${p.bg}">
        <img src="${p.image}" alt="${p.name}" style="width:50px;height:auto;object-fit:contain;"/>
      </div>
      <div class="search-result-info">
        <div class="search-result-name">${p.name}</div>
        <div class="search-result-price">S/ ${p.price}</div>
      </div>
    </div>
  `).join('');
}

// EXPONER FUNCIONES GLOBALMENTE
window.setFilter = setFilter;
window.setEmojiFilter = setEmojiFilter;
window.filterByCategory = filterByCategory;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.openSizeGuide = openSizeGuide;
window.closeSizeGuide = closeSizeGuide;
window.openSearch = openSearch;
window.closeSearch = closeSearch;
window.searchProducts = searchProducts;

// ✅ NUEVO: restaurar carrito desde localStorage al cargar la página
function restaurarCarrito() {
  const guardado = localStorage.getItem("carritoNovaStreet");
  if (!guardado) return;
  try {
    const items = JSON.parse(guardado);
    items.forEach(function(item) {
      const p = products.find(function(p) { return p.id === item.id; });
      if (p) { p.qty = item.qty; }
    });
  } catch (error) {
    console.error('Error parsing carrito:', error);
    localStorage.removeItem("carritoNovaStreet");
  }
  cartCount = products.reduce(function(sum, p) { return sum + p.qty; }, 0);
  document.getElementById('cart-count').textContent = cartCount;
}

// INICIALIZACIÓN
restaurarFavoritos();
restaurarCarrito();
renderProducts();
renderCartBar();