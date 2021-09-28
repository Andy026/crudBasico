function validarCampoRequerido(input) {
  //console.log(input)
  console.log(input.value);
  if (input.value.trim().length > 0 && input.value.trim().length >= 3) {
    console.log("el dato es correcto");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("el dato es erroneo");
    input.className = "form-control is-invalid";
    return false;
  }
}

function validarNumeros(input) {
  //validar con expresiones regulares
  let patron = /^[0-9]{1,5}$/;
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

function validarCodigo(input) {
  if (input.value.trim() != "" && input.value.trim().length >= 3) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

function validarUrl(input) {
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (
    input.value.trim() != "" &&
    patron.test(input.value.trim(input.value.trim()))
  ) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

function validarGeneral(e) {
  e.preventDefault();

  let alerta = document.querySelector('#msjAlerta');
  
  if (
    validarCodigo(document.querySelector("#codigo")) &&
    validarCampoRequerido(document.querySelector("#producto")) &&
    validarCampoRequerido(document.querySelector("#descripcion")) &&
    validarNumeros(document.querySelector("#cantidad")) &&
    validarUrl(document.querySelector("#url"))
  ) {
    console.log("validación correcta");
    alerta.className = 'alert alert-danger d-none'
  } else {
    console.log("validación erronea");
    alerta.className = 'alert alert-danger'
  }
}

let producto = document.querySelector("#producto");
let cantidad = document.querySelector("#cantidad");
let codigo = document.querySelector("#codigo");
let url = document.querySelector("#url");
let descripcion = document.querySelector("#descripcion");
let formulario = document.querySelector("#formProducto");
//console.log(cantidad);

//agregar eventos desde js
producto.addEventListener("blur", () => {
  validarCampoRequerido(producto);
});
cantidad.addEventListener("blur", () => {
  validarNumeros(cantidad);
});
codigo.addEventListener("blur", () => {
  validarCampoRequerido(codigo);
});
url.addEventListener("blur", () => {
  validarUrl(url);
});
descripcion.addEventListener("blur", () => {
  validarCampoRequerido(descripcion);
});
formulario.addEventListener("submit", validarGeneral);
