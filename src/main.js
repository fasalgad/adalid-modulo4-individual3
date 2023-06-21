import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import Paises from './assets/js/paises.mjs';
import Articulo from "./assets/js/articulo.mjs";
import Proveedor from "./assets/js/proveedor.mjs";

document.addEventListener("DOMContentLoaded", function () {
  cargarSelectArticulos();
  listarProveedores();
  listarPaises();
});

//Función para listar los paises
const listarPaises = () => {
  const selectPais = document.getElementById("paisProveedor");
  selectPais.innerHTML = "";
  Paises.forEach((pais, index) => {
    const option = document.createElement("option");
    option.value = pais;
    option.text = pais;
    selectPais.appendChild(option);
  });
}




const cargarSelectArticulos = () => {
  // Obtener los artículos del localStorage o crear un nuevo array vacío
  let articulos = convertirLocalStorageAArticulos();

  // Obtener el elemento select
  const selectArticulo = document.getElementById("articuloProveedor");
  selectArticulo.innerHTML = "";
  // Llenar el select con las opciones de los artículos
  articulos.forEach((articulo, index) => {
    const option = document.createElement("option");
    option.value = articulo.nombre;
    option.text = articulo.nombre;
    articulos.length - 1 === index ? option.selected = true : null;
    selectArticulo.appendChild(option);
  });
}
const calcularImpuestoTotal = (proveedor) => {
  const impuesto = 0.19; // 10% de impuesto
  const precioTotal = proveedor.precio * impuesto;
  return precioTotal;
}

const convertirLocalStorageAArticulos = () => {
  const articulosLocalStorage = JSON.parse(localStorage.getItem("articulos")) || [];
  const articulos = [];

  for (let i = 0; i < articulosLocalStorage.length; i++) {
    const { _nombre, _email, _telefono } = articulosLocalStorage[i];
    const articulo = new Articulo(_nombre, _email, _telefono);
    articulos.push(articulo);
  }

  return articulos;
}
const convertirLocalStorageAProveedores = () => {
  const proveedoresLocalStorage = JSON.parse(localStorage.getItem("proveedores")) || [];
  const proveedores = [];

  for (let i = 0; i < proveedoresLocalStorage.length; i++) {
    const { _nombre, _articulo, _precio, _internacional, _pais } = proveedoresLocalStorage[i];
    const articulos = convertirLocalStorageAArticulos();
    const articulo = articulos.length > 0 ? articulos[0] :"";
    const proveedor = new Proveedor(_nombre, articulo, _precio, _internacional, _pais);
    proveedores.push(proveedor);
  }

  return proveedores;
}

document.getElementById("formProveedor").addEventListener("submit", function (event) {
  event.preventDefault();

  const nombreProveedor = document.getElementById("nombreProveedor").value;
  const articuloSeleccionado = document.getElementById("articuloProveedor").value;
  const precioProveedor = parseFloat(document.getElementById("precioProveedor").value);
  const esInternacional = document.getElementById("internacionalProveedor").checked;
  const paisProveedor = document.getElementById("paisProveedor").value;

  let articulos = convertirLocalStorageAArticulos();
  const articulo = articulos.find(articulo => articulo.nombre === articuloSeleccionado);

  const proveedor = new Proveedor(nombreProveedor, articulo, precioProveedor, esInternacional, paisProveedor);

  // Obtener los proveedores existentes del localStorage o crear un nuevo array vacío
  let proveedores = convertirLocalStorageAProveedores();

  // Agregar el nuevo proveedor al array
  if (proveedores.length > 0) {
    const proveedorRepetido = proveedores.find(proveedor => proveedor.nombre === nombreProveedor);
    if (proveedorRepetido) {
      alert("Ya existe un proveedor con ese nombre.");
      return;
    }
  }
  proveedores.push(proveedor);


  // Guardar el array de proveedores actualizado en el localStorage
  localStorage.setItem("proveedores", JSON.stringify(proveedores));

  // Limpiar los campos del formulario
  document.getElementById("nombreProveedor").value = "";
  document.getElementById("articuloProveedor").value = "";
  document.getElementById("precioProveedor").value = "";
  listarProveedores();
  alert("Proveedor agregado exitosamente.");
});

document.getElementById("formArticulo").addEventListener("submit", function (event) {
  event.preventDefault();

  const nombreArticulo = document.getElementById("nombreArticulo").value;
  const emailArticulo = document.getElementById("emailArticulo").value;
  const telefonoArticulo = document.getElementById("telefonoArticulo").value;

  let articulos = convertirLocalStorageAArticulos();
  if (articulos.length > 0) {
    const articuloRepetido = articulos.find(articulo => articulo.nombre === nombreArticulo);
    if (articuloRepetido) {
      alert("Ya existe un artículo con ese nombre.");
      return;
    }
  }


  guardarArticulo(nombreArticulo, emailArticulo, telefonoArticulo);

  // Limpiar los campos del formulario
  document.getElementById("nombreArticulo").value = "";
  document.getElementById("emailArticulo").value = "";
  document.getElementById("telefonoArticulo").value = "";
  cargarSelectArticulos();
  alert("Artículo guardado exitosamente.");
});

const guardarArticulo = (nombre, email, telefono) => {
  // Obtener los artículos existentes del localStorage o crear un nuevo array vacío
  let articulos = JSON.parse(localStorage.getItem("articulos")) || [];

  const articulo = new Articulo(nombre, email, telefono);
  // Agregar el nuevo artículo al array
  articulos.push(articulo);

  // Guardar el array de artículos actualizado en el localStorage
  localStorage.setItem("articulos", JSON.stringify(articulos));
}

const listarProveedores = () => {
  let proveedores = convertirLocalStorageAProveedores();
  let tbody = document.getElementById("tablaProveedoresBody");

  // Limpiar el contenido previo de la tabla
  tbody.innerHTML = "";

  // Recorrer los proveedores y agregar filas a la tabla
  proveedores.forEach((proveedor) => {

    let fila = document.createElement("tr");

    let nombreCelda = document.createElement("td");
    nombreCelda.textContent = proveedor.nombre;

    let articuloCelda = document.createElement("td");
    articuloCelda.textContent = proveedor.articulo.nombre;
    console.log(proveedor.articulo.nombre, proveedor.articulo)

    let precioCelda = document.createElement("td");
    precioCelda.textContent = proveedor.precio;

    let esInternacionalCelda = document.createElement("td");
    esInternacionalCelda.textContent = proveedor.internacional ? "Sí" : "No";
     
    let paisCelda = document.createElement("td");
    paisCelda.textContent = proveedor.pais;


    //columna para los botones
    let actions = document.createElement("td");

    //boton para calcularImpuestoTotal 
    let btn = document.createElement("button");
    btn.textContent = "Calcular Impuesto";
    btn.classList.add("btn", "btn-info", "mr-2");
    btn.onclick = function () {
      alert("El iva a pagar: " + calcularImpuestoTotal(proveedor));
    }

    //boton para getInfoProveedor
    let btn2 = document.createElement("button");
    btn2.textContent = "Info Proveedor";
    btn2.classList.add("btn", "btn-info", "mr-2");
    btn2.onclick = function () {
      alert("El proveedor es: " + proveedor.getInfoProveedor());
    }

    actions.appendChild(btn);
    actions.appendChild(btn2);

    fila.appendChild(nombreCelda);
    fila.appendChild(articuloCelda);
    fila.appendChild(precioCelda);
    fila.appendChild(esInternacionalCelda);
    fila.appendChild(paisCelda);
    fila.appendChild(actions);

    tbody.appendChild(fila);
  });
}