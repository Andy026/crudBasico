import {
  validarCampoRequerido,
  validarCodigo,
  validarUrl,
  validarGeneral,
  validarNumeros,
} from "./validaciones.js";

import { Producto } from "./productoClass.js";

//declarar variables
let productos = [];
// este archivo tendrá toda la lógica del ABM o CRUD
let producto = document.querySelector("#producto");
let cantidad = document.querySelector("#cantidad");
let codigo = document.querySelector("#codigo");
let url = document.querySelector("#url");
let descripcion = document.querySelector("#descripcion");
let formulario = document.querySelector("#formProducto");

producto.addEventListener("blur", () => {
  validarCampoRequerido(producto);
});
cantidad.addEventListener("blur", () => {
  validarNumeros(cantidad);
});
descripcion.addEventListener("blur", () => {
  validarCampoRequerido(descripcion);
});
codigo.addEventListener("blur", () => {
  validarCodigo(codigo);
});
url.addEventListener("blur", () => {
  validarUrl(url);
});
formulario.addEventListener("submit", guardarProducto);

//verificar si hay datos en LocalStorage
cargaInicial();

function guardarProducto(event) {
  event.preventDefault();
  //primero validar datos del form
  if (validarGeneral()) {
    //si esta todo ok crear un nuevo producto
    //console.log("aqui deberia crear un producto");
    agregarProducto();
  } else {
    console.log("aqui solo mostrar el cartel de error");
  }
}

function agregarProducto() {
  let productoNuevo = new Producto(
    codigo.value,
    producto.value,
    descripcion.value,
    cantidad.value,
    url.value
  );
  //console.log(productoNuevo);
  //guardar el producto en un array
  productos.push(productoNuevo);
  console.log(productos);
  //guardar en localstorage
  localStorage.setItem("productosKey", JSON.stringify(productos));
  //limpiar el formulario
  limpiarFormulario();
  //dibujar fila en la tabla
  crearFila(productoNuevo);
}

function cargaInicial() {
  //si hay algo en localstorage lo llamo con getitem y si no hay nada llamamos a un array vacio
  productos = JSON.parse(localStorage.getItem("productosKey")) || [];
  //console.log(productos);

  //llamar a la función que crea filas
  productos.forEach(itemProducto => {
    crearFila(itemProducto);
  })
}

function crearFila(itemProducto) {
  console.log(itemProducto);
  //traigo el nodo padre que sería el tbody
  let tabla = document.querySelector("#tablaProductos");
  //console.log(tabla);
  tabla.innerHTML += `<tr>
  <th scope="row">${itemProducto.codigo}</th>
  <td>${itemProducto.nombreProducto}</td>
  <td>${itemProducto.descripcion}</td>
  <td>${itemProducto.cantidad}</td>
  <td>${itemProducto.url}</td>
  <td>
    <button class="btn btn-warning">Editar</button>
    <button class="btn btn-danger">Borrar</button>
  </td>
</tr>`;
}

function limpiarFormulario () {
  //limpia los value de los elementos del form
  formulario.reset();
  //limpiar las clases de cada elemento del form
  codigo.className = 'form-control'
  //terminar de limpiar los inputs
}