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

cargaInicial();

function guardarProducto(event) {
  event.preventDefault();
  //primero validar datos del form
  if (validarGeneral()) {
    //si esta todo ok crear un nuevo producto
    console.log("aqui deberia crear un producto");
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
  localStorage.setItem('productosKey', JSON.stringify(productos));
  //limpiar el formulario
  //dibujar fila en la tabla
}

function cargaInicial() {
    productos = JSON.parse(localStorage.getItem('productosKey')) || [];
    console.log(productos);
}
