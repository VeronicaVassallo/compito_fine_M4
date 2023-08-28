//Tutti i prodotti API
let allProducts; 
// contatore cestino
let quantity;
let quantityCart = document.getElementById('quantity'); 
let currentValue = parseInt(quantityCart.innerText); 

//modale carrello
let carrello = document.getElementById('carrello');

let loader = document.getElementById('loader');

function OnLoad(){
    
    try {

        fetch("https://striveschool-api.herokuapp.com/api/product/", {



        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTUzZTFmMTc1YzAwMTRjNTU4Y2UiLCJpYXQiOjE2OTI2MDM3MTEsImV4cCI6MTY5MzgxMzMxMX0.QAaODo0-Wr_da5IhMIhivrjcyGGiXpFFF5pGKuVFNu8",
            "Access-Control-Allow-Origin":  "*"
        },

        })
        .then((response) => response.json()) 
        .then((products) => {
            localStorage.setItem("dataProducts", JSON.stringify(products))
            console.log(products)
            cardCreation(products);
            allProducts = products;
            localStorageCheck(); 
            loader.classList.add('d-none');
            
        }
    
        );
            
            
        }catch (error) {
            console.log(error);
        }
    
}
            
          
window.onload = OnLoad()


function cardCreation(products){
    let cards = products.map( singolCard => 
`<div class=" card col-12 col-md-4 col-lg-3 text-dark my-3 containerPr ${singolCard._id}">

    <div class="text-center " style=" border: solid 3px white; height:80%">

        <img src="${singolCard.imageUrl}" class="object-fit-cover" style="width:50%" alt="...">

    </div>

    <h5 class="card-title pt-2 ">${singolCard.name}</h5>
   
    <p>Brand: ${singolCard.brand}</p>
    <p>Prezzo: ${singolCard.price} €</p>

    <div class='d-flex flex-column'>
        <a href="./infopage.html?id=${singolCard._id}" class="btn btn-primary m-2">Info prodotto</a>
        <a id="${singolCard._id}" href="#" onclick="addProductCart(this.id)" class="btn btn-primary m-2">Aggiungi al carrello </a>
    </div>

</div>`).join("");

    ContainerCards = document.getElementById('ContainerCards');
    ContainerCards.innerHTML = cards;
}

//aggiunge prodotto al carrello
function addProductCart(id){

    let addCart =  allProducts.filter( p => p._id === id )[0];
    let liProduct = document.createElement('li');
   
    liProduct.innerHTML = `
    <div class="d-flex">
      - ${addCart.name} Prezzo: ${addCart.price} € 
        <div class='binButton' onclick="deleteItem(this)">
            <i  class="fa-regular fa-trash-can mx-5"></i>
        </div>
    </div>
    <br>`;

    carrello.appendChild(liProduct);

    currentValue ++;
    quantityCart.innerText = currentValue.toString();

    localStorage.setItem('currentValue', currentValue);
    localStorage.setItem('carrello', carrello.innerHTML);

 }

 //rimuove prodotto dal carrello
 function deleteItem(tasto){    

  tasto.parentNode.parentNode.remove();       
  currentValue --;
  quantityCart.innerText = currentValue.toString(); 
  localStorage.setItem('currentValue', currentValue);
  localStorage.setItem('carrello', carrello.innerHTML);          
 }  
 
 //azzera carello del localStorage
 function localStorageCheck(){ 
    let valueLocalStorage = localStorage.getItem('currentValue');
    let valueCart = localStorage.getItem('carrello');

    if(valueLocalStorage){
        currentValue = valueLocalStorage
        quantityCart.innerText = currentValue.toString();
    }else{
        currentValue = 0
        valueLocalStorage = 0
    }

    if(valueCart){
        carrello.innerHTML = valueCart
    }

 }

 //cerca prodotto
 function SearchProduct(){
    let input = document.getElementById('inpuntValue');

    let results = allProducts.filter(pr => pr.name.toLowerCase().includes(input.value.toLowerCase()));

    let divList = document.getElementsByClassName('containerPr');
 
   
    let listId = results.map(x => x._id);
 
 
   for(let singlediv of divList) {
 
     let showdiv = false;
 
     for(let idItem of listId){
       if(singlediv.classList.contains(idItem)){
         showdiv = true;
       }
     }
 
 
     if(showdiv){
       singlediv.classList.remove("d-none");
     }else{
       singlediv.classList.add("d-none");
     }   
   }
 
 
  }