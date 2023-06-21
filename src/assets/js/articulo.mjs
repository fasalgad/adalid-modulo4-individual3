class Articulo {
  constructor(nombre, email, telefono) {
    this._nombre = nombre;
    this._email = email;
    this._telefono = telefono;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get telefono() {
    return this._telefono;
  }

  set telefono(telefono) {
    this._telefono = telefono;
  }
}

export default Articulo;