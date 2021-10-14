//declarar variables
let productos = [];

cargaInicial();

function cargaInicial() {
  productos = JSON.parse(localStorage.getItem("productosKey")) || [];
  //si hay datos dentro del array, dibujo las columnas con cards
  if (productos.length > 0) {
    //acá dibujo las cards
    productos.forEach((producto) => {
      crearColumna(producto);
    });
  }
}

function crearColumna(producto) {
  let grilla = document.querySelector("#grilla");
  console.log(producto);
  grilla.innerHTML += `<div class="col-sm-12 col-md-4 col-lg-3 mb-3">
    <div class="card">
      <img src="${producto.url}" class="card-img-top" alt="${producto.nombreProducto}">
      <div class="card-body">
        <h5 class="card-title">${producto.nombreProducto}</h5>
        <p class="card-text">${producto.descripcion}</p>
        <p class="card-text">Cantidad: ${producto.cantidad}</p>
      </div>
    </div>
  </div>`;
}
