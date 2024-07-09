import { HasHtmlFormat } from "./interfaces/HasHtmlFormat.js"
import { Datas } from "./Datas.js"
import { HasRender } from "./interfaces/HasRender.js"
import { Display } from "./Display.js"
import { Print } from "./Print.js"
import { HasPrint } from "./interfaces/HasPrint.js"

export class FormInputs {
  form: HTMLFormElement
  type: HTMLSelectElement
  firstName: HTMLInputElement
  lastName: HTMLInputElement
  address : HTMLInputElement
  country: HTMLInputElement
  town : HTMLInputElement
  zip : HTMLInputElement
  product : HTMLInputElement
  price : HTMLInputElement
  quantity : HTMLInputElement
  tva : HTMLInputElement
  docContainer: HTMLDivElement
  hiddenDiv: HTMLDivElement
  btnPrint: HTMLButtonElement

  constructor(){
    this.form = document.getElementById("form") as HTMLFormElement;
    this.type = document.getElementById("type") as HTMLSelectElement;
    this.firstName = document.getElementById("firstName") as HTMLInputElement;
    this.lastName = document.getElementById("lastName") as HTMLInputElement;
    this.address = document.getElementById("address") as HTMLInputElement;
    this.country = document.getElementById("country") as HTMLInputElement;
    this.town = document.getElementById("town") as HTMLInputElement;
    this.zip = document.getElementById("zip") as HTMLInputElement;
    this.product = document.getElementById("product") as HTMLInputElement;
    this.price = document.getElementById("price") as HTMLInputElement;
    this.quantity = document.getElementById("quantity") as HTMLInputElement;
    this.tva = document.getElementById("tva") as HTMLInputElement;
    this.docContainer = document.getElementById("document-container") as HTMLDivElement;
    this.hiddenDiv = document.getElementById("hiddenDiv") as HTMLDivElement;
    this.btnPrint = document.getElementById('print') as HTMLButtonElement


    this.submitFormListerner();
    this.printListener(this.btnPrint, this.docContainer);
  }

  private submitFormListerner(): void {
    this.form.addEventListener('submit',  this.handleFormSubmit.bind(this))
  }

  private printListener(btn: HTMLButtonElement, docContainer:HTMLDivElement):void {
    btn.addEventListener('click', ()=>{
      const docToPrint: HasPrint = new Print(docContainer);
      docToPrint.print()
    })
  }

  private handleFormSubmit(e: Event){
   e.preventDefault() 

   const inputs = this.inputDatas()

   if(Array.isArray(inputs)){
    const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs
    console.log(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva);
    
    let docData: HasHtmlFormat;
    let date: Date = new Date();

    docData = new Datas(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date)
    console.log(docData.htmlFormat());

    //create new facture
    let template: HasRender;
    template = new Display(this.docContainer, this.hiddenDiv, this.btnPrint)
    template.render(docData, type)


   }
  }

  private inputDatas(): [string, string, string, string, string, string, number, string, number, number, number] | void{
    const type= this.type.value
    const firstName= this.firstName.value
    const lastName=this.lastName.value
    const address=this.address.value
    const country=this.country.value
    const town=this.town.value
    const zip=this.zip.valueAsNumber
    const product=this.product.value
    const price=this.price.valueAsNumber
    const quantity=this.quantity.valueAsNumber
    const tva=this.tva.valueAsNumber

    if(zip > 0 && price > 0 && quantity > 0 && tva > 0){
      return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva];
    } 
    alert('Veuillez entrez des valeurs numérique supérieur a 0')
  } 
}