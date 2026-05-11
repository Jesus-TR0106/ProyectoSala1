const products = [
  { id:1,  qty:0, name:"Vestido lino beige",               cat:"Mujer", subcat:"Vestidos",   price:189,           image:"img/Vestido-lino-beige-m.png",             bg:"#F1EFE8", badge:"new"  },
  { id:2,  qty:0, name:"Blazer oversized",                 cat:"Mujer", subcat:"Chompas",    price:249, oldPrice:320, image:"img/Blazer-oversized-m.png",           bg:"#E6F1FB", badge:"sale" },
  { id:5,  qty:0, name:"Falda midi plisada",               cat:"Mujer", subcat:"Pantalones",     price:159,           image:"img/Falda-midi-plisada.png",               bg:"#FBEAF0", badge:"new"  },
  { id:7,  qty:0, name:"Pantalon acampanado con correa",   cat:"Mujer", subcat:"Pantalones", price:159,           image:"img/Pantalon-acampanado-con-correa-m.png", bg:"pink",    badge:"new"  },
  { id:9,  qty:0, name:"Vestido con hombreras",            cat:"Mujer", subcat:"Vestidos",   price:189,           image:"img/Vestido-con-hombreras.png",            bg:"pink",    badge:"new"  },
  { id:11, qty:0, name:"Chompa camisera",                  cat:"Mujer", subcat:"Chompas",    price:89.95,         image:"img/Chompa-camisera.png",                  bg:"pink",    badge:"new"  },
  { id:13, qty:0, name:"Top frunces manga larga",          cat:"Mujer", subcat:"Tops",       price:139,           image:"img/Top-frunces-manga-larga.png",          bg:"#FBEAF0", badge:"new"  },
  { id:15, qty:0, name:"Body lazadas espalda descubierta", cat:"Mujer", subcat:"Tops",       price:109,           image:"img/Body-lazadas-espalda-descubierta.png", bg:"#FBEAF0", badge:"new"  },
  { id:17, qty:0, name:"Blusa con Escote",                 cat:"Mujer", subcat:"Tops",     price:69,            image:"img/Blusa-con-escote.png",                 bg:"#FBEAF0", badge:"new"  },
  { id:19, qty:0, name:"Buzo Colloky",                     cat:"Mujer", subcat:"Pantalones",      price:39.90,         image:"img/buzo-m.png",                           bg:"#F1EFE8", badge:"new"  },
  { id:21, qty:0, name:"Jean Corto",                       cat:"Mujer", subcat:"Pantalones",     price:56,            image:"img/Jean-corto-m.png",                     bg:"#E6F1FB", badge:"new"  },
  { id:23, qty:0, name:"Vestido Midi",                     cat:"Mujer", subcat:"Vestidos",   price:83,            image:"img/Vestido-midi-m.png",                   bg:"#FBEAF0", badge:"new"  },
  { id:25, qty:0, name:"Chaqueta de Cuero",                cat:"Mujer", subcat:"Chompas",  price:70,            image:"img/Chaqueta-cuero-m.png",                 bg:"#E6F1FB", badge:"new"  },
  { id:27, qty:0, name:"Casaca de Invierno",               cat:"Mujer", subcat:"Chompas",    price:73,            image:"img/Casaca-m.png",                         bg:"#FBEAF0", badge:"new"  },
  { id:29, qty:0, name:"Pantalon Ancho",                   cat:"Mujer", subcat:"Pantalones", price:58,            image:"img/Palazzo-ancho-m.png",                  bg:"#E6F1FB", badge:"new"  },
  { id:31, qty:0, name:"Pantalon de bota Ancha",           cat:"Mujer", subcat:"Pantalones", price:94,            image:"img/Pantalon-m.png",                       bg:"#FBEAF0", badge:"new"  },
  { id:33, qty:0, name:"Chaqueta de Jean",                 cat:"Mujer", subcat:"Chompas",  price:92,            image:"img/Chaqueta-jean-m.png",                  bg:"#E6F1FB", badge:"new"  },
  { id:35, qty:0, name:"Top",                              cat:"Mujer", subcat:"Tops",       price:76,            image:"img/Top-m.png",                            bg:"#FBEAF0", badge:"new"  },
  { id:37, qty:0, name:"Top Manga Larga",                  cat:"Mujer", subcat:"Tops",       price:91,            image:"img/Top2-m.png",                           bg:"#E6F1FB", badge:"new"  },
  { id:39, qty:0, name:"Camisa Manga Larga",               cat:"Mujer", subcat:"Tops",     price:91,            image:"img/Camisa-m.png",                         bg:"#FBEAF0", badge:"new"  },
];
 
let cartCount         = 0;
let currentFilter     = "Todos";
let currentSaleFilter = false;
 
/* =========================================================
   RESTAURAR CARRITO DESDE LOCALSTORAGE
   ========================================================= */
(function restaurarCarrito() {
  const guardado = localStorage.getItem("carritoNovaStreet");
  if (!guardado) return;
 
  const items = JSON.parse(guardado);
  items.forEach(function (item) {
    const p = products.find(function (p) { return p.id === item.id; });
    if (p) { p.qty = item.qty; }
  });
 
  cartCount = products.reduce(function (sum, p) { return sum + p.qty; }, 0);
  document.getElementById('cart-count').textContent = cartCount;
})();
 
/* =========================================================
   GUARDAR CARRITO EN LOCALSTORAGE
   ========================================================= */
function guardarCarritoLocal() {
  const guardado = localStorage.getItem("carritoNovaStreet");
  let carritoActual = guardado ? JSON.parse(guardado) : [];
 
  products.forEach(function (p) {
    const idx = carritoActual.findIndex(function (i) { return i.id === p.id; });
    if (p.qty > 0) {
      const item = { id: p.id, name: p.name, cat: p.cat, price: p.price, image: p.image, bg: p.bg, qty: p.qty };
      if (idx >= 0) {
        carritoActual[idx] = item;
      } else {
        carritoActual.push(item);
      }
    } else if (idx >= 0) {
      carritoActual.splice(idx, 1);
    }
  });
 
  localStorage.setItem("carritoNovaStreet", JSON.stringify(carritoActual));
 
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
  guardarCarritoLocal();
  renderProducts();
  renderCartBar();
}
 
function removeFromCart(id) {
  const p = products.find(function (p) { return p.id === id; });
  if (!p || p.qty === 0) return;
  p.qty--;
  cartCount--;
  guardarCarritoLocal();
  renderProducts();
  renderCartBar();
}
 
function renderCartBar() {
  const bar     = document.getElementById('cart-bar');
  const namesEl = document.getElementById('cart-bar-names');
  const totalEl = document.getElementById('cart-bar-total');
 
  const items = products.filter(function (p) { return p.qty > 0; });
 
  if (!items.length) {
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
 