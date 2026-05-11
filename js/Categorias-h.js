const products = [
  { id:3,  qty:0, name:"Jogger premium",           cat:"Hombre", subcat:"Pantalones", price:139,             image:"img/Jogger-premium-h.png",        bg:"#E1F5EE", badge:"new"  },
  { id:4,  qty:0, name:"Camiseta essentials",      cat:"Hombre", subcat:"Tops",       price:79,  oldPrice:110,image:"img/Camiseta-essentials.jpg",     bg:"#FAECE7", badge:"sale" },
  { id:6,  qty:0, name:"Chaqueta denim",           cat:"Hombre", subcat:"Casacas",    price:199, oldPrice:260,image:"img/Chaqueta-denim.png",          bg:"#F1EFE8", badge:"sale" },
  { id:8,  qty:0, name:"Camisa stretch",           cat:"Hombre", subcat:"Tops",       price:"89.95",         image:"img/Camisa-stretch.png",          bg:"#FAECE7", badge:"new"  },
  { id:10, qty:0, name:"Chompa con medio cierre",  cat:"Hombre", subcat:"Tops",       price:"89.95",         image:"img/Chompa-con-medio-cierre.png", bg:"#FAECE7", badge:"new"  },
  { id:12, qty:0, name:"Casaca de beisbol",        cat:"Hombre", subcat:"Casacas",    price:"159",           image:"img/Casaca-de-beisbol.png",       bg:"#FAECE7", badge:"new"  },
  { id:14, qty:0, name:"Pantalon jogger",          cat:"Hombre", subcat:"Pantalones", price:"159",           image:"img/Pantalon-jogger.png",         bg:"#FAECE7", badge:"new"  },
  { id:16, qty:0, name:"Jean Clasicos",            cat:"Hombre", subcat:"Pantalones", price:"86", oldPrice:150,image:"img/Jean-h.png",                bg:"#FAECE7", badge:"sale" },
  { id:18, qty:0, name:"Polo con cuello",          cat:"Hombre", subcat:"Tops",       price:"49",            image:"img/polo.png",                   bg:"#FAECE7", badge:"new"  },
  { id:20, qty:0, name:"Chaqueta de Cuero",        cat:"Hombre", subcat:"Casacas",    price:"79",            image:"img/Chaqueta-cuero-h.png",        bg:"#E1F5EE", badge:"new"  },
  { id:22, qty:0, name:"Camisa Manga Larga",       cat:"Hombre", subcat:"Tops",       price:"37",            image:"img/Camisa-h.png",                bg:"#FAECE7", badge:"new"  },
  { id:24, qty:0, name:"Chaqueta Cortaviento",     cat:"Hombre", subcat:"Casacas",    price:"62",            image:"img/Casaca-h.png",                bg:"#E1F5EE", badge:"new"  },
  { id:26, qty:0, name:"Polo Manga Larga",         cat:"Hombre", subcat:"Tops",       price:"83",            image:"img/Polo-manga-larga-h.png",      bg:"#FAECE7", badge:"new"  },
  { id:28, qty:0, name:"Abrigo de Lana",           cat:"Hombre", subcat:"Abrigos",    price:"98",            image:"img/Abrigo-lana-h.png",           bg:"#E1F5EE", badge:"new"  },
  { id:30, qty:0, name:"Abrigo Largo de Vestir",   cat:"Hombre", subcat:"Abrigos",    price:"73", oldPrice:120,image:"img/Abrigo-h.png",              bg:"#FAECE7", badge:"sale" },
  { id:32, qty:0, name:"Abrigo con Capucha",       cat:"Hombre", subcat:"Abrigos",    price:"85",            image:"img/Abrigo-capucha-h.png",        bg:"#E1F5EE", badge:"new"  },
  { id:34, qty:0, name:"Abrigo para el Invierno",  cat:"Hombre", subcat:"Abrigos",    price:"45",            image:"img/Abrigo-frio-h.png",           bg:"#FAECE7", badge:"new"  },
  { id:36, qty:0, name:"Abrigo de Lana",           cat:"Hombre", subcat:"Abrigos",    price:"82",            image:"img/Abrigo-lana2-h.png",          bg:"#E1F5EE", badge:"new"  },
  { id:38, qty:0, name:"Abrigo Largo de Lana",     cat:"Hombre", subcat:"Abrigos",    price:"73",            image:"img/Abrigo2-h.png",               bg:"#FAECE7", badge:"new"  },
  { id:40, qty:0, name:"Abrigo Largo con Capucha", cat:"Hombre", subcat:"Abrigos",    price:"84", oldPrice:160,image:"img/Abrigo-capucha2-h.png",     bg:"#E1F5EE", badge:"sale" },
];
 
let cartCount       = 0;
let currentFilter   = "Todos";
let currentSaleFilter = false;
 
/* =========================================================
   RESTAURAR CARRITO DESDE LOCALSTORAGE
   ========================================================= */
(function restaurarCarrito() {
  const guardado = localStorage.getItem("carritoNovaStreet");
  if (!guardado) return;
 
  const items = JSON.parse(guardado);
 
  // Restaurar qty de los productos que ya estaban en el carrito
  items.forEach(function (item) {
    const p = products.find(function (p) { return p.id === item.id; });
    if (p) { p.qty = item.qty; }
  });
 
  // Recalcular el contador del navbar
  cartCount = products.reduce(function (sum, p) { return sum + p.qty; }, 0);
  document.getElementById('cart-count').textContent = cartCount;
})();
 
/* =========================================================
   GUARDAR CARRITO EN LOCALSTORAGE
   ========================================================= */
function guardarCarritoLocal() {
  // Leer el carrito actual guardado para no perder items de otras páginas
  const guardado = localStorage.getItem("carritoNovaStreet");
  let carritoActual = guardado ? JSON.parse(guardado) : [];
 
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
 
/* =========================================================
   FILTROS
   ========================================================= */
function setTodosFilter(btn) {
  document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  currentFilter     = "Todos";
  currentSaleFilter = false;
  document.querySelectorAll('.cat-card').forEach(function (c) { c.classList.remove('active-cat'); });
  renderProducts();
}
 
function setSaleFilter(btn) {
  currentSaleFilter = !currentSaleFilter;
  btn.classList.toggle('active', currentSaleFilter);
  document.querySelectorAll('.cat-card').forEach(function (c) { c.classList.remove('active-cat'); });
  renderProducts();
}
 
/* =========================================================
   CARRITO
   ========================================================= */
function addToCart(id) {
  const p = products.find(function (p) { return p.id === id; });
  if (!p) return;
  p.qty++;
  cartCount++;
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 2200);
  guardarCarritoLocal(); // ✅ sincroniza con localStorage
  renderProducts();
  renderCartBar();
}
 
function removeFromCart(id) {
  const p = products.find(function (p) { return p.id === id; });
  if (!p || p.qty === 0) return;
  p.qty--;
  cartCount--;
  guardarCarritoLocal(); // ✅ sincroniza con localStorage
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
    const global   = guardado ? JSON.parse(guardado) : [];
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
 
/* =========================================================
   RENDER PRODUCTOS
   ========================================================= */
function renderProducts() {
  const grid = document.getElementById('products-grid');
 
  let filtered = products;
 
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
        '<button class="favorite-btn ' + (isFavorite(p.id) ? 'active' : '') + '" onclick="toggleFavorite(' + p.id + '); renderProducts();" title="Agregar a favoritos"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>' +
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
 
/* =========================================================
   FILTRO POR CATEGORÍA (click en cat-card)
   ========================================================= */
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
 
/* =========================================================
   INICIO
   ========================================================= */
renderProducts();
renderCartBar();

/* =========================================================
   FUNCIONES PARA BÚSQUEDA
   ========================================================= */
function openSearch() {
  const modal = document.getElementById('searchModal');
  modal.classList.add('active');
  document.getElementById('searchInput').focus();
  document.getElementById('searchInput').addEventListener('input', performSearch);
}

function closeSearch() {
  const modal = document.getElementById('searchModal');
  modal.classList.remove('active');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchInput').removeEventListener('input', performSearch);
  document.getElementById('searchResults').innerHTML = '';
}

function performSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  const resultsContainer = document.getElementById('searchResults');
  
  if (!query) {
    resultsContainer.innerHTML = '<div class="search-empty">Escribe para buscar productos</div>';
    return;
  }

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.cat.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    resultsContainer.innerHTML = '<div class="search-empty">No se encontraron productos</div>';
    return;
  }

  resultsContainer.innerHTML = filtered.map(p => `
  <div class="search-result-item" onclick="window.location.href='Hombres.html'">
    <div class="search-result-img">
      <img src="${p.image}" alt="${p.name}">
    </div>
    <div class="search-result-info">
      <div class="search-result-name">${p.name}</div>
      <div class="search-result-cat">${p.cat}</div>
      <div class="search-result-price">S/ ${p.price}</div>
      <button class="add-btn" onclick="addToCart(${p.id})">+</button>
    </div>
  </div>
`).join('');

}

document.getElementById('searchModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeSearch();
  }
});

/* =========================================================
   FUNCIONES PARA FAVORITOS
   ========================================================= */
function openFavorites() {
  const modal = document.getElementById('favoritesModal');
  modal.classList.add('active');
  renderFavorites();
}

function closeFavorites() {
  const modal = document.getElementById('favoritesModal');
  modal.classList.remove('active');
}

function toggleFavorite(productId) {
  let favorites = JSON.parse(localStorage.getItem('novaFavorites')) || [];
  
  if (favorites.includes(productId)) {
    favorites = favorites.filter(id => id !== productId);
  } else {
    favorites.push(productId);
  }
  
  localStorage.setItem('novaFavorites', JSON.stringify(favorites));
}

function isFavorite(productId) {
  const favorites = JSON.parse(localStorage.getItem('novaFavorites')) || [];
  return favorites.includes(productId);
}

function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem('novaFavorites')) || [];
  const grid = document.getElementById('favoritesGrid');

  if (favorites.length === 0) {
    grid.innerHTML = '<div class="favorites-empty">No tienes productos favoritos aún</div>';
    return;
  }

  const favoriteProducts = products.filter(p => favorites.includes(p.id));
  grid.innerHTML = favoriteProducts.map(p => `
    <div class="product-card">
      <div class="product-img" style="background:${p.bg}">
        ${p.badge ? `<span class="badge badge-${p.badge === 'new' ? 'badge-new' : 'badge-sale'}">${p.badge === 'new' ? 'Nuevo' : 'Sale'}</span>` : ''}
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
            <button class="add-btn" onclick="addToCart(${p.id})">+</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

document.getElementById('favoritesModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeFavorites();
  }
});

/* =========================================================
   FUNCIONES PARA GUÍA DE TALLAS
   ========================================================= */
function openSizeGuide() {
  const modal = document.getElementById('sizeGuideModal');
  modal.classList.add('active');
}

function closeSizeGuide() {
  const modal = document.getElementById('sizeGuideModal');
  modal.classList.remove('active');
}

function switchTab(tabName) {
  // Ocultar todos los tabs
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => tab.classList.remove('active'));
  
  // Desactivar todos los botones
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => btn.classList.remove('active'));
  
  // Mostrar el tab seleccionado
  const selectedTab = document.getElementById(tabName + '-tab');
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Activar el botón correspondiente
  event.target.classList.add('active');
}

document.getElementById('sizeGuideModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeSizeGuide();
  }
});

  // Función para desplazarse a la sección de productos
function scrollToProducts() {
  document.getElementById("productos").scrollIntoView({
    behavior: "smooth"
  });
}