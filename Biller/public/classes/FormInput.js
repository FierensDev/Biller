export class FormInput {
    constructor() {
        this.form = document.getElementById("form");
        this.type = document.getElementById("type");
        this.firstname = document.getElementById("firstName");
        this.lastname = document.getElementById("lastName");
        this.address = document.getElementById("address");
        this.country = document.getElementById("country");
        this.town = document.getElementById("town");
        this.zip = document.getElementById("zip");
        this.product = document.getElementById("product");
        this.price = document.getElementById("price");
        this.quantity = document.getElementById("quantity");
        this.tva = document.getElementById("tva");
        this.submitFormListerner();
    }
    submitFormListerner() {
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    handleFormSubmit(e) {
        e.preventDefault();
        const inputs = this.inputDatas();
        if (Array.isArray(inputs)) {
            const [type, firstname, lastname, address, country, town, zip, product, price, quantity, tva] = inputs;
            console.log(type, firstname, lastname, address, country, town, zip, product, price, quantity, tva);
        }
    }
    inputDatas() {
        const type = this.type.value;
        const firstname = this.firstname.value;
        const lastname = this.lastname.value;
        const address = this.address.value;
        const country = this.country.value;
        const town = this.town.value;
        const zip = this.zip.valueAsNumber;
        const product = this.product.value;
        const price = this.price.valueAsNumber;
        const quantity = this.quantity.valueAsNumber;
        const tva = this.tva.valueAsNumber;
        if (zip > 0 && price > 0 && quantity > 0 && tva > 0) {
            return [type, firstname, lastname, address, country, town, zip, product, price, quantity, tva];
        }
        alert('Veuillez entrez des valeurs numérique supérieur a 0');
    }
}
