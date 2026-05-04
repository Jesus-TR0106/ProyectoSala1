 const products = [
  { id:1,  qty:0, name:"Vestido lino beige",                  cat:"Mujer", subcat:"Vestidos",   price:189,     image:"img/Vestido-lino-beige-m.png",              bg:"#F1EFE8",  badge:"new"},
  { id:2,  qty:0, name:"Blazer oversized",                    cat:"Mujer", subcat:"Blazers",    price:249, oldPrice:320, image:"img/Blazer-oversized-m.png",                bg:"#E6F1FB",  badge:"sale"},
  { id:5,  qty:0, name:"Falda midi plisada",                  cat:"Mujer", subcat:"Faldas",     price:159,     image:"img/Falda-midi-plisada.png",                bg:"#FBEAF0",  badge:"new"},
  { id:7,  qty:0, name:"Pantalon acampanado con correa",      cat:"Mujer", subcat:"Pantalones", price:159,     image:"img/Pantalon-acampanado-con-correa-m.png",  bg:"pink",     badge:"new"},
  { id:9,  qty:0, name:"Vestido con hombreras",               cat:"Mujer", subcat:"Vestidos",   price:189,     image:"img/Vestido-con-hombreras.png",             bg:"pink",     badge:"new"},
  { id:11, qty:0, name:"Chompa camisera",                     cat:"Mujer", subcat:"Chompas",    price:89.95,   image:"img/Chompa-camisera.png",                   bg:"pink",     badge:"new"},
  { id:13, qty:0, name:"Top frunces manga larga",             cat:"Mujer", subcat:"Tops",       price:139,     image:"img/Top-frunces-manga-larga.png",           bg:"#FBEAF0",  badge:"new"},
  { id:15, qty:0, name:"Body lazadas espalda descubierta",    cat:"Mujer", subcat:"Tops",       price:109,     image:"img/Body-lazadas-espalda-descubierta.png",  bg:"#FBEAF0",  badge:"new"},
  { id:17, qty:0, name:"Blusa con Escote",                    cat:"Mujer", subcat:"Blusas",     price:69,      image:"img/Blusa-con-escote.png",                  bg:"#FBEAF0",  badge:"new"},
  { id:19, qty:0, name:"Buzo Colloky",                        cat:"Mujer", subcat:"Buzos",      price:39.90,   image:"img/buzo-m.png",                            bg:"#F1EFE8",  badge:"new"},
  { id:21, qty:0, name:"Jean Corto",                          cat:"Mujer", subcat:"Shorts",      price:56,      image:"img/Jean-corto-m.png",                      bg:"#E6F1FB",  badge:"new"},
  { id:23, qty:0, name:"Vestido Midi",                        cat:"Mujer", subcat:"Vestidos",   price:83,      image:"img/Vestido-midi-m.png",                    bg:"#FBEAF0",  badge:"new"},
  { id:25, qty:0, name:"Chaqueta de Cuero",                   cat:"Mujer", subcat:"Chaquetas",  price:70,      image:"img/Chaqueta-cuero-m.png",                  bg:"#E6F1FB",  badge:"new"},
  { id:27, qty:0, name:"Casaca de Invierno",                  cat:"Mujer", subcat:"Casacas",    price:73,      image:"img/Casaca-m.png",                          bg:"#FBEAF0",  badge:"new"},
  { id:29, qty:0, name:"Pantalon Ancho",                      cat:"Mujer", subcat:"Pantalones", price:58,      image:"img/Palazzo-ancho-m.png",                   bg:"#E6F1FB",  badge:"new"},
  { id:31, qty:0, name:"Pantalon de bota Ancha",              cat:"Mujer", subcat:"Pantalones", price:94,      image:"img/Pantalon-m.png",                        bg:"#FBEAF0",  badge:"new"},
  { id:33, qty:0, name:"Chaqueta de Jean",                    cat:"Mujer", subcat:"Chaquetas",  price:92,      image:"img/Chaqueta-jean-m.png",                   bg:"#E6F1FB",  badge:"new"},
  { id:35, qty:0, name:"Top",                                 cat:"Mujer", subcat:"Tops",       price:76,      image:"img/Top-m.png",                             bg:"#FBEAF0",  badge:"new"},
  { id:37, qty:0, name:"Top Manga Larga",                     cat:"Mujer", subcat:"Tops",       price:91,      image:"img/Top2-m.png",                            bg:"#E6F1FB",  badge:"new"},
  { id:39, qty:0, name:"Camisa Manga Larga",                  cat:"Mujer", subcat:"Blusas",     price:91,      image:"img/Camisa-m.png",                          bg:"#FBEAF0",  badge:"new"},
];

 
  let cartCount = 0;
  let currentFilter = "Todos";
  let currentSaleFilter = false;

 //Funcion btn todos
function setTodosFilter(btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  currentFilter = "Todos";
  renderProducts();
}


  //Funcion del btn sale
function setSaleFilter(btn) {
  currentSaleFilter = !currentSaleFilter;

  // Activar o desactivar visualmente
  btn.classList.toggle('active', currentSaleFilter);

  // Quitar active de categorías
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active-cat'));

  renderProducts();
}


  // Tu función original, sin cambios
  function setEmojiFilter(emoji) {
    currentFilter = emoji;
    renderProducts();
  }

  // MODIFICADO: ahora recibe id y suma qty del producto
  function addToCart(id) {
    const p = products.find(p => p.id === id);
    if (!p) return;
    p.qty++;
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
    renderProducts();
    renderCartBar();
  }

  // NUEVO: quita una unidad del producto
  function removeFromCart(id) {
    const p = products.find(p => p.id === id);
    if (!p || p.qty === 0) return;
    p.qty--;
    cartCount--;
    document.getElementById('cart-count').textContent = cartCount;
    renderProducts();
    renderCartBar();
  }

  // NUEVO: muestra/oculta la barra flotante del carrito
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

  // Tu función original — solo se cambió el botón + por el grupo − número +
function renderProducts() {
  const grid = document.getElementById('products-grid');

  let filtered = products;

  // FILTRO POR CATEGORÍA
  if (currentFilter !== "Todos") {
    filtered = filtered.filter(p => p.subcat === currentFilter);
  }

  // FILTRO POR SALE
  if (currentSaleFilter) {
    filtered = filtered.filter(p => p.badge === "sale");
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img" style="background:${p.bg}">
        ${p.badge ? `<span class="badge ${p.badge === 'new' ? 'badge-new' : 'badge-sale'}">${p.badge === 'new' ? 'Nuevo' : 'Sale'}</span>` : ''}
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


// ACTIVAR FILTRO POR CATEGORÍA
document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('click', () => {
    const cat = card.getAttribute('data-cat');
    currentFilter = cat;

    // Quitar active de los botones de filtros (Todos / Sale)
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));

    // Activar visualmente la categoría seleccionada
    document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active-cat'));
    card.classList.add('active-cat');

    renderProducts();
  });
});
renderProducts();