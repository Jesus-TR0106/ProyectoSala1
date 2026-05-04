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