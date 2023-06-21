import TipoProveedor from "./tipo_proveedor.mjs";
class Proveedor extends TipoProveedor {
  constructor(nombre, articulo, precio, internacional, pais) {
    super(internacional, pais)
    this._nombre = nombre;
    this._articulo = articulo;
    this._precio = precio;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get articulo() {
    return this._articulo;
  }

  set articulo(articulo) {
    this._articulo = articulo;
  }

  get precio() {
    return this._precio;
  }

  set precio(precio) {
    this._precio = precio;
  }

  getInfoProveedor() {
    let tipoProveedor= super.getInfoProveedor();
    return `Proveedor: ${this._nombre}, Artículo: ${this._articulo}, Precio: ${this._precio}, ${tipoProveedor}`;
  }
}

export default Proveedor;