class Proveedor {
  constructor(nombre, articulo, precio) {
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
    return `Proveedor: ${this._nombre}, Artículo: ${this._articulo}, Precio: ${this._precio}`;
  }
}

export default Proveedor;