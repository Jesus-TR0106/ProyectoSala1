
//  SISTEMA DE FAVORITOS 

let favorites = [];

function restaurarFavoritos() {
  const guardados = localStorage.getItem("favoritosNovaStreet");
  if (guardados) {
    try {
      favorites = JSON.parse(guardados);
    } catch (error) {
      console.error('Error parsing favoritos:', error);
      localStorage.removeItem("favoritosNovaStreet");
      favorites = [];
    }
  }
}

function guardarFavoritosLocal() {
  localStorage.setItem("favoritosNovaStreet", JSON.stringify(favorites));
}

function toggleFavorite(id) {
  const idx = favorites.indexOf(id);
  if (idx >= 0) {
    favorites.splice(idx, 1);
  } else {
    favorites.push(id);
  }
  guardarFavoritosLocal();
  renderProducts(); // Re-renderizar para actualizar el ícono del corazón
}

function isFavorited(id) {
  return favorites.includes(id);
}

function toggleFavoritesView() {
  currentFilter = "Favoritos";
  renderProducts();
}

function setTodosFilter(btn) {
  document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  currentFilter = "Todos";
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

// CATEGORÍAS: mapeo de subcategorías directas desde campo 'subcat'
// MEJORADO: Filtra por campo directo + mapea categorías específicas del HTML
const categoryMap = {
  // Categorías genéricas
  'Vestidos': p => p.subcat === 'Vestidos',
  'Tops': p => p.subcat === 'Tops',
  'Pantalones': p => p.subcat === 'Pantalones',
  'Abrigos': p => p.subcat === 'Abrigos',
  
  // Mapeo de categorías específicas HTML → subcat
  'Blazers': p => p.subcat === 'Abrigos',
  'Blusas': p => p.subcat === 'Tops',
  'Buzos': p => p.subcat === 'Tops',
  'Chompas': p => p.subcat === 'Tops',
  'Chaquetas': p => p.subcat === 'Abrigos',
  'Casacas': p => p.subcat === 'Abrigos',
  'Shorts': p => p.subcat === 'Pantalones',
  'Faldas': p => p.subcat === 'Pantalones'
};

function filterByCategory(categoryName) {
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.cat-card').forEach(c => {
    if (c.getAttribute('data-cat') === categoryName) c.classList.add('active');
  });

  currentFilter = categoryName;
  renderProducts();
  scrollToProducts();
}

//  BÚSQUEDA 

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

//  GUÍA DE TALLAS

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

//  SCROLL 

function scrollToProducts() {
  const section = document.querySelector('.products-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// SESIÓN DE USUARIO 

function initUserSession() {
  const usuarioGuardado = localStorage.getItem("usuarioActivoNovaStreet");
  const navRight = document.querySelector('.nav-right');

  if (usuarioGuardado) {
    try {
      const usuario = JSON.parse(usuarioGuardado);
      // Agregar indicador de usuario en navbar
      const userSpan = document.createElement('span');
      userSpan.className = 'nav-user';
      userSpan.textContent = `Hola, ${usuario.nombre}`;
      navRight.insertBefore(userSpan, navRight.firstChild);

      // Cambiar botón de sesión
      const sessionBtn = document.createElement('button');
      sessionBtn.className = 'icon-btn';
      sessionBtn.title = 'Cerrar sesión';
      sessionBtn.innerHTML = '🚪';
      sessionBtn.onclick = function() {
        localStorage.removeItem("usuarioActivoNovaStreet");
        window.location.reload();
      };
      navRight.appendChild(sessionBtn);
    } catch (error) {
      console.error('Error parsing usuario:', error);
      localStorage.removeItem("usuarioActivoNovaStreet");
    }
  } else {
    // Agregar botón de login
    const loginBtn = document.createElement('button');
    loginBtn.className = 'icon-btn';
    loginBtn.title = 'Iniciar sesión';
    loginBtn.innerHTML = '👤';
    loginBtn.onclick = function() {
      window.location.href = 'login.html';
    };
    navRight.appendChild(loginBtn);
  }
}

//  VALIDACIÓN 

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarPassword(password) {
  return password.length >= 6;
}

function validarClave(password) {
  return validarPassword(password);
}

function validarNombre(nombre) {
  return nombre.trim().length >= 2;
}

function obtenerElemento(elemento) {
  return typeof elemento === 'string' ? document.getElementById(elemento) : elemento;
}

function mostrarMensaje(elemento, mensaje, tipo = 'error') {
  const target = obtenerElemento(elemento);
  if (!target) return;
  target.textContent = mensaje;
  target.className = `mensaje ${tipo}`;
  target.style.display = 'block';
  setTimeout(() => {
    target.style.display = 'none';
  }, 5000);
}

function ocultarMensaje(elemento) {
  const target = obtenerElemento(elemento);
  if (!target) return;
  target.textContent = '';
  target.style.display = 'none';
  target.className = 'mensaje error';
}

function validarCampo(input, errorId, mensaje) {
  const value = input.value.trim();
  const errorElement = obtenerElemento(errorId);
  if (!errorElement) return false;

  let valido = true;
  const idLower = input.id.toLowerCase();

  if (input.type === 'email') {
    valido = validarEmail(value);
  } else if (idLower.includes('clave')) {
    valido = validarClave(value);
  } else if (idLower.includes('nombre')) {
    valido = validarNombre(value);
  } else {
    valido = value.length > 0;
  }

  if (!valido) {
    mostrarMensaje(errorElement, mensaje);
    return false;
  }

  ocultarMensaje(errorElement);
  return true;
}

//  INICIALIZACIÓN 

function initSharedFeatures() {
  restaurarFavoritos();
  initUserSession();

  // Agregar modales si no existen
  if (!document.getElementById('search-modal')) {
    const modalsHTML = `
      <!-- Modal de Búsqueda -->
      <div id="search-modal" class="modal-overlay" onclick="closeSearch(event)">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2>Buscar productos</h2>
            <button class="modal-close" onclick="closeSearch()">✕</button>
          </div>
          <input type="text" id="search-input" class="search-input" placeholder="Busca por nombre..." oninput="searchProducts(this.value)">
          <div id="search-results" class="search-results"></div>
        </div>
      </div>

      <!-- Modal de Guía de Tallas -->
      <div id="size-modal" class="modal-overlay" onclick="closeSizeGuide(event)">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2>Guía de Tallas</h2>
            <button class="modal-close" onclick="closeSizeGuide()">✕</button>
          </div>
          <div class="size-guide">
            <h3>Prendas Mujer</h3>
            <table>
              <tr><th>Talla</th><th>Pecho (cm)</th><th>Cintura (cm)</th><th>Cadera (cm)</th></tr>
              <tr><td>XS</td><td>80-84</td><td>62-66</td><td>88-92</td></tr>
              <tr><td>S</td><td>84-88</td><td>66-70</td><td>92-96</td></tr>
              <tr><td>M</td><td>88-92</td><td>70-74</td><td>96-100</td></tr>
              <tr><td>L</td><td>92-96</td><td>74-78</td><td>100-104</td></tr>
              <tr><td>XL</td><td>96-100</td><td>78-82</td><td>104-108</td></tr>
            </table>
            <h3>Prendas Hombre</h3>
            <table>
              <tr><th>Talla</th><th>Pecho (cm)</th><th>Cintura (cm)</th><th>Largo (cm)</th></tr>
              <tr><td>S</td><td>88-96</td><td>74-78</td><td>66-68</td></tr>
              <tr><td>M</td><td>96-104</td><td>78-82</td><td>68-70</td></tr>
              <tr><td>L</td><td>104-112</td><td>82-86</td><td>70-72</td></tr>
              <tr><td>XL</td><td>112-120</td><td>86-94</td><td>72-74</td></tr>
              <tr><td>XXL</td><td>120-128</td><td>94-102</td><td>74-76</td></tr>
            </table>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalsHTML);
  }
}