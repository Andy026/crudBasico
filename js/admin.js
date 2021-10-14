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
let productoExistente = false; //false -> tengo que agregar un producto nuevo. true -> tengo que modificar un producto existente
// este archivo tendrá toda la lógica del ABM o CRUD
let producto = document.querySelector("#producto");
let cantidad = document.querySelector("#cantidad");
let codigo = document.querySelector("#codigo");
let url = document.querySelector("#url");
let descripcion = document.querySelector("#descripcion");
let formulario = document.querySelector("#formProducto");
let btnAgregar = document.querySelector("#btnAgregar");

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
btnAgregar.addEventListener("click", limpiarFormulario);

//verificar si hay datos en LocalStorage
cargaInicial();

function guardarProducto(event) {
  event.preventDefault();
  //primero validar datos del form
  if (validarGeneral()) {
    //tengo que modificar o tengo que agregar uno nuevo?
    if (productoExistente) {
      //modificar
      actualizarProducto();
    } else {
      //agregar
      //si esta todo ok crear un nuevo producto
      agregarProducto();
    }
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
  //mostrar un mensaje al usuario
  Swal.fire(
    "Producto agregado",
    "El producto fue agregado correctamente",
    "success"
  );
}

function cargaInicial() {
  //si hay algo en localstorage lo llamo con getitem y si no hay nada llamamos a un array vacio
  productos = JSON.parse(localStorage.getItem("productosKey")) || [];
  //console.log(productos);

  //llamar a la función que crea filas
  productos.forEach((itemProducto) => {
    crearFila(itemProducto);
  });
}

function crearFila(itemProducto) {
  //console.log(itemProducto);
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
    <button class="btn btn-warning" onclick="prepararEdicionProducto(${itemProducto.codigo})">Editar</button>
    <button class="btn btn-danger" onclick="borrarProducto(${itemProducto.codigo})">Borrar</button>
  </td>
</tr>`;
}

function limpiarFormulario() {
  //limpia los value de los elementos del form
  formulario.reset();
  //limpiar las clases de cada elemento del form
  codigo.className = "form-control";
  //terminar de limpiar los inputs
  productoExistente = false;
}
//funcion invocada desde el html. (porque admin.js es tipo module)
window.prepararEdicionProducto = (codigo) => {
  //console.log(codigo);
  //buscar el objeto en el array
  let productoEncontrado = productos.find((itemProducto) => {
    return itemProducto.codigo == codigo;
  });
  //console.log(productoEncontrado);
  //mostrar los datos del objeto en el fomulario
  document.querySelector("#codigo").value = productoEncontrado.codigo;
  document.querySelector("#producto").value = productoEncontrado.nombreProducto;
  document.querySelector("#descripcion").value = productoEncontrado.descripcion;
  document.querySelector("#cantidad").value = productoEncontrado.cantidad;
  document.querySelector("#url").value = productoEncontrado.url;
  //cambiar el valor de la variable bandera para editar
  productoExistente = true;
};

function actualizarProducto() {
  //console.log(codigo.value);
  //console.log("Acá tengo que mofificar los productos");
  Swal.fire({
    title: "¿Está seguro que desea editar el producto?",
    text: "No puede revertir este proceso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, deseo editarlo.",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //acá es donde procederemos a editar
      //buscar el indice del objeto con el codigo indicado
      let indiceProducto = productos.findIndex((itemProducto) => {
        return itemProducto.codigo == codigo.value;
      });
      //console.log(indiceProducto);
      //console.log(productos[indiceProducto].nombreProducto);
      //actualizar los valores del objeto encontrado dentro del array
      productos[indiceProducto].nombreProducto =
        document.querySelector("#producto").value;
      productos[indiceProducto].descripcion =
        document.querySelector("#descripcion").value;
      productos[indiceProducto].cantidad =
        document.querySelector("#cantidad").value;
      productos[indiceProducto].url = document.querySelector("#url").value;

      console.log(productos[indiceProducto]);
      //actualizar localStorage
      localStorage.setItem("productosKey", JSON.stringify(productos));
      //actualizar la tabla
      borrarFilas();
      productos.forEach((itemProducto) => {
        crearFila(itemProducto);
      });
      //limpiar el formulario
      limpiarFormulario();
      //mostrar un mensaje que el producto fue editado
      Swal.fire(
        "Producto editado!",
        "Su producto fue editado con éxito",
        "success"
      );
    }
  });
}

function borrarFilas() {
  //traigo el nodo padre que sería el tbody
  let tabla = document.querySelector("#tablaProductos");
  tabla.innerHTML = "";
}

window.borrarProducto = (codigo) => {
  //console.log(codigo);
  Swal.fire({
    title: '¿Está seguro que desea eliminar el producto?',
    text: "Este proceso no puede revertirse",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, deseo eliminarlo',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      //acá agrego el código si quiero borrar
      //op1 usar splice(indice, 1), para obtener el indice puedo usar findindex
      //op2
      let _productos = productos.filter((itemProducto) => {return itemProducto.codigo != codigo})
      console.log(_productos);
      //actualizar el arreglo y el localStorage
      productos = _productos;
      localStorage.setItem('productosKey', JSON.stringify(productos));
      //borramos la tabla
      borrarFilas();
      //vuelvo a dibujar la tabla
      productos.forEach((itemProducto) => {
        crearFila(itemProducto);
      });
      //muestro el mensaje
      Swal.fire(
        'Producto eliminado',
        'El producto fue eliminado con éxito.',
        'success'
      )
    }
  })
}