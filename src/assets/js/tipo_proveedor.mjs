class TipoProveedor {
  constructor(internacional, pais) {
    this._internacional = internacional;
    this._pais = pais;
  }
  // Getters
  get internacional() {
    return this._internacional;
  }
  get pais() {
    return this._pais;
  }
  // Setters
  set internacional(internacional) {
    this._internacional = internacional;
  }
  set pais(pais) {
    this._pais = pais;
  }
  // Methods
  getInfoProveedor() {
    return `Internacional: ${this._internacional}, País: ${this._pais}`;
  }

}
export default TipoProveedor;