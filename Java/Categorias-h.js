  // Tu array original — solo se agregó id y qty:0 a cada producto
 const products = [
  { id:3,  qty:0, name:"Jogger premium",              cat:"Hombre", subcat:"Pantalones", price:139,              image:"img/Jogger-premium-h.png",        bg:"#E1F5EE",  badge:"new"},
  { id:4,  qty:0, name:"Camiseta essentials",         cat:"Hombre", subcat:"Tops",        price:79,  oldPrice:110,image:"img/Camiseta-essentials.jpg",     bg:"#FAECE7",  badge:"sale"},
  { id:6,  qty:0, name:"Chaqueta denim",              cat:"Hombre", subcat:"Casacas",     price:199, oldPrice:260,image:"img/Chaqueta-denim.png",          bg:"#F1EFE8",  badge:"sale"},
  { id:8,  qty:0, name:"Camisa stretch",              cat:"Hombre", subcat:"Tops",        price:"89.95",          image:"img/Camisa-stretch.png",          bg:"#FAECE7",  badge:"new"},
  { id:10, qty:0, name:"Chompa con medio cierre",     cat:"Hombre", subcat:"Tops",        price:"89.95",          image:"img/Chompa-con-medio-cierre.png", bg:"#FAECE7",  badge:"new"},
  { id:12, qty:0, name:"Casaca de beisbol",           cat:"Hombre", subcat:"Casacas",     price:"159",            image:"img/Casaca-de-beisbol.png",       bg:"#FAECE7",  badge:"new"},
  { id:14, qty:0, name:"Pantalon jogger",             cat:"Hombre", subcat:"Pantalones",  price:"159",            image:"img/Pantalon-jogger.png",         bg:"#FAECE7",  badge:"new"},
  { id:16, qty:0, name:"Jean Clasicos",               cat:"Hombre", subcat:"Pantalones",  price:"86", oldPrice:150,image:"img/Jean-h.png",                  bg:"#FAECE7",  badge:"sale"},
  { id:18, qty:0, name:"Polo con cuello",             cat:"Hombre", subcat:"Tops",        price:"49",             image:"img/polo.png",                    bg:"#FAECE7",  badge:"new"},
  { id:20, qty:0, name:"Chaqueta de Cuero",           cat:"Hombre", subcat:"Casacas",     price:"79",             image:"img/Chaqueta-cuero-h.png",        bg:"#E1F5EE",  badge:"new"},
  { id:22, qty:0, name:"Camisa Manga Larga",          cat:"Hombre", subcat:"Tops",        price:"37",             image:"img/Camisa-h.png",                bg:"#FAECE7",  badge:"new"},
  { id:24, qty:0, name:"Chaqueta Cortaviento",        cat:"Hombre", subcat:"Casacas",     price:"62",             image:"img/Casaca-h.png",                bg:"#E1F5EE",  badge:"new"},
  { id:26, qty:0, name:"Polo Manga Larga",            cat:"Hombre", subcat:"Tops",        price:"83",             image:"img/Polo-manga-larga-h.png",      bg:"#FAECE7",  badge:"new"},
  { id:28, qty:0, name:"Abrigo de Lana",              cat:"Hombre", subcat:"Abrigos",     price:"98",             image:"img/Abrigo-lana-h.png",           bg:"#E1F5EE",  badge:"new"},
  { id:30, qty:0, name:"Abrigo Largo de Vestir",      cat:"Hombre", subcat:"Abrigos",     price:"73", oldPrice:120,image:"img/Abrigo-h.png",                bg:"#FAECE7",  badge:"sale"},
  { id:32, qty:0, name:"Abrigo con Capucha",          cat:"Hombre", subcat:"Abrigos",     price:"85",             image:"img/Abrigo-capucha-h.png",        bg:"#E1F5EE",  badge:"new"},
  { id:34, qty:0, name:"Abrigo para el Invierno",     cat:"Hombre", subcat:"Abrigos",     price:"45",             image:"img/Abrigo-frio-h.png",           bg:"#FAECE7",  badge:"new"},
  { id:36, qty:0, name:"Abrigo de Lana",              cat:"Hombre", subcat:"Abrigos",     price:"82",             image:"img/Abrigo-lana2-h.png",          bg:"#E1F5EE",  badge:"new"},
  { id:38, qty:0, name:"Abrigo Largo de Lana",        cat:"Hombre", subcat:"Abrigos",     price:"73",             image:"img/Abrigo2-h.png",               bg:"#FAECE7",  badge:"new"},
  { id:40, qty:0, name:"Abrigo Largo con Capucha",    cat:"Hombre", subcat:"Abrigos",     price:"84", oldPrice:160,image:"img/Abrigo-capucha2-h.png",       bg:"#E1F5EE",  badge:"sale"},
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
