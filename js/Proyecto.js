 const products = [
    { id:1,  qty:0, name:"Vestido lino beige",                  cat:"Mujer",  price:189,              image:"img/Vestido-lino-beige-m.png",              bg:"#F1EFE8",   badge:"new"},
    { id:2,  qty:0, name:"Blazer oversized",                    cat:"Mujer",  price:249, oldPrice:320,image:"img/Blazer-oversized-m.png",                bg:"#E6F1FB",  badge:"sale"},
    { id:3,  qty:0, name:"Jogger premium",                      cat:"Hombre", price:139,              image:"img/Jogger-premium-h.png",                  bg:"#E1F5EE",  badge:"new"},
    { id:4,  qty:0, name:"Camiseta essentials",                 cat:"Hombre", price:79,  oldPrice:110,image:"img/Camiseta-essentials.jpg",               bg:"#FAECE7",  badge:"sale"},
    { id:5,  qty:0, name:"Falda midi plisada",                  cat:"Mujer",  price:159,              image:"img/Falda-midi-plisada.png",                bg:"#FBEAF0",  badge:"new"},
    { id:6,  qty:0, name:"Chaqueta denim",                      cat:"Hombre", price:199, oldPrice:260,image:"img/Chaqueta-denim.png",                    bg:"#F1EFE8",  badge:"sale"},
    { id:7,  qty:0, name:"Pantalon acampanado con correa",      cat:"Mujer",  price:"159",            image:"img/Pantalon-acampanado-con-correa-m.png",  bg:"pink",     badge:"new"},
    { id:8,  qty:0, name:"Camisa stretch",                      cat:"Hombre", price:"89.95",          image:"img/Camisa-stretch.png",                    bg:"#FAECE7",  badge:"new"},
    { id:9,  qty:0, name:"Vestido con hombreras",               cat:"Mujer",  price:"189",            image:"img/Vestido-con-hombreras.png",             bg:"pink",     badge:"new"},
    { id:10, qty:0, name:"Chompa con medio cierre",             cat:"Hombre", price:"89.95",          image:"img/Chompa-con-medio-cierre.png",           bg:"#FAECE7",  badge:"new"},
    { id:11, qty:0, name:"Chompa camisera",                     cat:"Mujer",  price:"89.95",          image:"img/Chompa-camisera.png",                   bg:"pink",     badge:"new"},
    { id:12, qty:0, name:"Casaca de beisbol",                   cat:"Hombre", price:"159",            image:"img/Casaca-de-beisbol.png",                 bg:"#FAECE7",  badge:"new"},
    { id:13, qty:0, name:"Top frunces manga larga",             cat:"Mujer",  price:"139",            image:"img/Top-frunces-manga-larga.png",           bg:"#FBEAF0",  badge:"new"},
    { id:14, qty:0, name:"Pantalon jogger",                     cat:"Hombre", price:"159",            image:"img/Pantalon-jogger.png",                   bg:"#FAECE7",  badge:"new"},
    { id:15, qty:0, name:"Body lazadas espalda descubierta",    cat:"Mujer",  price:"109",            image:"img/Body-lazadas-espalda-descubierta.png",  bg:"#FBEAF0",  badge:"new"},
    { id:16, qty:0, name:"Jean Clasicos",                       cat:"Hombre", price:"86",oldPrice:150,image:"img/Jean-h.png",                            bg:"#FAECE7",  badge:"sale"},
    { id:17, qty:0, name:"Blusa con Escote",                    cat:"Mujer",  price:"69",             image:"img/Blusa-con-escote.png",                  bg:"#FBEAF0",  badge:"new"},
    { id:18, qty:0, name:"Polo con cuello",                     cat:"Hombre", price:"49",             image:"img/polo.png",                              bg:"#FAECE7",  badge:"new"},
    { id:19, qty:0, name:"Buzo Colloky",                        cat:"Mujer",  price:"39.90",          image:"img/buzo-m.png",                            bg:"#F1EFE8",  badge:"new"},
    { id:20, qty:0, name:"Chaqueta de Cuero",                   cat:"Hombre", price:"79",             image:"img/Chaqueta-cuero-h.png",                  bg:"#E1F5EE",  badge:"new"},
    { id:21, qty:0, name:"Jean Cortto",                         cat:"Mujer",  price:"56",             image:"img/Jean-corto-m.png",                      bg:"#E6F1FB",  badge:"new"},
    { id:22, qty:0, name:"Camisa Manga Larga",                  cat:"Hombre", price:"37",             image:"img/Camisa-h.png",                          bg:"#FAECE7",  badge:"new"},
    { id:23, qty:0, name:"Vestido Midi",                        cat:"Mujer",  price:"83",             image:"img/Vestido-midi-m.png",                    bg:"#FBEAF0",  badge:"new"},
    { id:24, qty:0, name:"Chaqueta Cortaviento",                cat:"Hombre", price:"62",             image:"img/Casaca-h.png",                          bg:"#E1F5EE",  badge:"new"},
    { id:25, qty:0, name:"Chaqueta de Cuero",                   cat:"Mujer",  price:"70",             image:"img/Chaqueta-cuero-m.png",                  bg:"#E6F1FB",  badge:"new"},
    { id:26, qty:0, name:"Polo Manga Larga",                    cat:"Hombre", price:"83",             image:"img/Polo-manga-larga-h.png",                bg:"#FAECE7",  badge:"new"},
    { id:27, qty:0, name:"Casaca de Invierno",                  cat:"Mujer",  price:"73",             image:"img/Casaca-m.png",                          bg:"#FBEAF0",  badge:"new"},
    { id:28, qty:0, name:"Abrigo de Lana",                      cat:"Hombre", price:"98",             image:"img/Abrigo-lana-h.png",                     bg:"#E1F5EE",  badge:"new"},
    { id:29, qty:0, name:"Pantalon Ancho",                      cat:"Mujer",  price:"58",             image:"img/Palazzo-ancho-m.png",                   bg:"#E6F1FB",  badge:"new"},
    { id:30, qty:0, name:"Abrigo Largo de Vestir",              cat:"Hombre", price:"73",oldPrice:120,image:"img/Abrigo-h.png",                          bg:"#FAECE7",  badge:"sale"},
    { id:31, qty:0, name:"Pantalon de bota Ancha",              cat:"Mujer",  price:"94",             image:"img/Pantalon-m.png",                        bg:"#FBEAF0",  badge:"new"},
    { id:32, qty:0, name:"Abrigo con Capucha",                  cat:"Hombre", price:"85",             image:"img/Abrigo-capucha-h.png",                  bg:"#E1F5EE",  badge:"new"},
    { id:33, qty:0, name:"Chaqueta de Jean",                    cat:"Mujer",  price:"92",             image:"img/Chaqueta-jean-m.png",                   bg:"#E6F1FB",  badge:"new"},
    { id:34, qty:0, name:"Abrigo para el Invierno",             cat:"Hombre", price:"45",             image:"img/Abrigo-frio-h.png",                     bg:"#FAECE7",  badge:"new"},
    { id:35, qty:0, name:"Top",                                 cat:"Mujer",  price:"76",             image:"img/Top-m.png",                             bg:"#FBEAF0",  badge:"new"},
    { id:36, qty:0, name:"Abrigo de Lana",                      cat:"Hombre", price:"82",             image:"img/Abrigo-lana2-h.png",                    bg:"#E1F5EE",  badge:"new"},
    { id:37, qty:0, name:"Top Manga Larga",                     cat:"Mujer",  price:"91",             image:"img/Top2-m.png",                            bg:"#E6F1FB",  badge:"new"},
    { id:38, qty:0, name:"Abrigo Largo de Lana",                cat:"Hombre", price:"73",             image:"img/Abrigo2-h.png",                         bg:"#FAECE7",  badge:"new"},
    { id:39, qty:0, name:"Camisa Manga Larga",                  cat:"Mujer",  price:"91",             image:"img/Camisa-m.png",                          bg:"#FBEAF0",  badge:"new"},
    { id:40, qty:0, name:"Abrigo Largo con Capucha",            cat:"Hombre", price:"84",oldPrice:160,image:"img/Abrigo-capucha2-h.png",                 bg:"#E1F5EE",  badge:"sale"},
  ];
 
  let cartCount = 0;
  let currentFilter = "Todos";
 
  // ✅ NUEVO: restaurar carrito desde localStorage al cargar la página
  (function restaurarCarrito() {
    const guardado = localStorage.getItem("carritoNovaStreet");
    if (!guardado) return;
    const items = JSON.parse(guardado);
    items.forEach(function(item) {
      const p = products.find(function(p) { return p.id === item.id; });
      if (p) { p.qty = item.qty; }
    });
    cartCount = products.reduce(function(sum, p) { return sum + p.qty; }, 0);
    document.getElementById('cart-count').textContent = cartCount;
  })();
 
  // ✅ NUEVO: guardar carrito en localStorage
  function guardarCarritoLocal() {
    const items = products
      .filter(function(p) { return p.qty > 0; })
      .map(function(p) {
        return { id: p.id, name: p.name, cat: p.cat, price: p.price, image: p.image, bg: p.bg, qty: p.qty };
      });
    localStorage.setItem("carritoNovaStreet", JSON.stringify(items));
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
 
  function renderProducts() {
    const grid = document.getElementById('products-grid');
    const filtered = currentFilter === "Todos" ? products
      : currentFilter === "Sale" ? products.filter(p => p.badge === "sale")
      : ["Mujer","Hombre"].includes(currentFilter) ? products.filter(p => p.cat === currentFilter)
      : products.filter(p => p.image);
 
    grid.innerHTML = filtered.map(p => `
      <div class="product-card">
        <div class="product-img" style="background:${p.bg}">
          ${p.badge ? `<span class="badge ${p.badge === 'new' ? 'badge-new' : 'badge-sale'}">${p.badge === 'new' ? 'Nuevo' : 'Sale'}</span>` : ''}
          <button class="favorite-btn ${isFavorite(p.id) ? 'active' : ''}" onclick="toggleFavorite(${p.id}); renderProducts();" title="Agregar a favoritos">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
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
  }
 
  renderProducts();
  renderCartBar(); // ✅ mostrar barra si había carrito guardado

  // ✅ FUNCIONES PARA GUÍA DE TALLAS
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

  // Cerrar modal al hacer clic fuera de ella
  document.getElementById('sizeGuideModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeSizeGuide();
    }
  });

  // ✅ FUNCIONES PARA BÚSQUEDA
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
    <div class="search-result-item" onclick="window.location.href='Proyecto.html'">
      
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


  // Cerrar modal de búsqueda al hacer clic fuera
  document.getElementById('searchModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeSearch();
    }
  });

  // ✅ FUNCIONES PARA FAVORITOS
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
          ${p.badge ? `<span class="badge badge-${p.badge}">${p.badge === 'new' ? 'Nuevo' : 'Oferta'}</span>` : ''}
          <img src="${p.image}" alt="${p.name}" style="width:100px;height:auto"/>
        </div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-cat">${p.cat}</div>
          <div class="product-footer">
            <span class="price">S/ ${p.price}
              ${p.oldPrice ? `<span class="price-old">S/ ${p.oldPrice}</span>` : ''}
            </span>
            <button class="add-btn" onclick="addToCart(${p.id})">+</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Cerrar modal de favoritos al hacer clic fuera
  document.getElementById('favoritesModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeFavorites();
    }
  });
  // Función para desplazarse a la sección de productos
function scrollToProducts() {
  document.getElementById("productos").scrollIntoView({
    behavior: "smooth"
  });
}
