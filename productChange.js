let listProducts;

let nameInput = document.getElementById('name');
let brandInput = document.getElementById('brand');
let descriptionInpunt = document.getElementById('description');
let imageUrlInpunt = document.getElementById('imageUrl');
let priceInpunt = document.getElementById('price');
let hiddenInpunt = document.getElementById('idInpunt');

//span inpunt

let nameSpan = document.getElementById('name-error');
let brandSpan = document.getElementById('brand-error');
let descriptionSpan = document.getElementById('description-error');
let imageUrlSpan = document.getElementById('imageUrl-error');
let priceSpan = document.getElementById('price-error');

//buttons

let hiddenButtonSave = document.getElementById('hiddenButtonSave');
let hiddenButtonEdit = document.getElementById('hiddenButtonEdit');

function OnLoad_backOffice(){
   showContainerDeleteProducts()
}
window.onload = OnLoad_backOffice()

// resetta i valori dell'inpunt
function resetValue(){
   nameInput.value = "";
   brandInput.value = "";
   descriptionInpunt.value = "";
   imageUrlInpunt.value = "";
   priceInpunt.value = "";

   hiddenButtonSave.classList.remove('d-none');
   hiddenButtonEdit.classList.add('d-none');
}


/*0) una funzione che mi controlli che se quello che ho scritto nei forms è conforme o meno al click del tasto salva
1) se i campi sono tutti conformi mi fai partire la fecth, e mi posti quello che ho scritto nell'array dei products che nell'url*/ 

function checkValueinpunt(){
   resetErrorFields();
   let valueOfALLCheck = true;

   if(nameInput.value === ''){
      nameSpan.innerText = 'Il campo nome è obbligatorio.';
      valueOfALLCheck = false;
   }else if (nameInput.value){
      nameSpan.innerHTML = '';
   }

   if(brandInput.value === ''){
      brandSpan.innerText = 'Il campo Brand è obbligatorio.';
      valueOfALLCheck = false;
   }else if (brandInput.value){
      brandSpan.innerHTML = '';
   }

   if(descriptionInpunt.value === ''){
      descriptionSpan.innerText = 'Il campo Descrizione è obbligatorio.';
      valueOfALLCheck = false;
   }else if (descriptionInpunt.value){
      descriptionSpan.innerHTML = '';
   }

   if(imageUrlInpunt.value === ''){
      imageUrlSpan.innerText = 'Il campo Immagine è obbligatorio.';
      valueOfALLCheck = false;
   }else if (imageUrlInpunt.value){
         imageUrlSpan.innerHTML = '';
   }

   if(priceInpunt.value === ''){
      priceSpan.innerText = 'Il campo Prezzo è obbligatorio.';
      valueOfALLCheck = false;
   }else if (priceInpunt.value){
      priceSpan.innerHTML = '';
   }

   if(valueOfALLCheck){
      resetErrorFields();
      postProducts();
   }

}

function resetErrorFields(){

nameSpan.innerText = "";
brandSpan.innerText = "";
descriptionSpan.innerText = "";
imageUrlSpan.innerText = "";
priceSpan.innerText = "";

}


function postProducts(){
   try{ 
      fetch("https://striveschool-api.herokuapp.com/api/product/", {

         method: "POST",

         headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTUzZTFmMTc1YzAwMTRjNTU4Y2UiLCJpYXQiOjE2OTI2MDM3MTEsImV4cCI6MTY5MzgxMzMxMX0.QAaODo0-Wr_da5IhMIhivrjcyGGiXpFFF5pGKuVFNu8",
            "Content-type": "application/json"
         },
         body: JSON.stringify({ 
            "name": nameInput.value,
            "description": descriptionInpunt.value,
            "brand": brandInput.value,
            "imageUrl": imageUrlInpunt.value,
            "price": priceInpunt.value})
      })
      .then((response) => response.json())
      .then((json) => {
         alert("Prodotto Salvato!!!")
         window.location.reload();
      })

   }catch (error) {
      console.log(error);
   }
      
}

function showContainerDeleteProducts(){
   try { 
      fetch("https://striveschool-api.herokuapp.com/api/product/", {

      headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTUzZTFmMTc1YzAwMTRjNTU4Y2UiLCJpYXQiOjE2OTI2MDM3MTEsImV4cCI6MTY5MzgxMzMxMX0.QAaODo0-Wr_da5IhMIhivrjcyGGiXpFFF5pGKuVFNu8",
            
      },

      })
      .then((response) => response.json()) 
      .then((products) => { 
            localStorage.setItem("dataProducts", JSON.stringify(products))
            console.log(products)
            stampInsideContainer(products);
            listProducts = products;
            
      }
         
      );
      
   
   }catch (error) {
      console.log(error);
   }
}

function stampInsideContainer(products){
   let containerDeleteProducts = document.getElementById('containerListProducts_2');
   let rowProducts = products.map(element => `
   <tr class="p-3 bg-light text-dark col-12 border liList ${element._id}">
      <th class="m-3 col-3 border" scope="row" >
         <div>
            <img src="${element.imageUrl}" class="" alt="img-product" style="width:50%;">
         </div>
      </th>    
      <td class="col-2 text-break border">${element.name}</td>
      <td class="col-1 text-break border">${element.brand}</td>
      <td class="col-4 border">${element.description}</td>
      <td class="col-1 border">${element.price}€</td>
      <td class="col-1 border text-center"><button class="btn btn-danger my-2" id="${element._id}" onclick="deleteSingleProducts(this)">Cancella</button>
      <button id="${element._id}" onclick="showInputInside(this.id)" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Modifica
      </button>
   </tr>  
   `).join("");

   containerDeleteProducts.innerHTML = rowProducts;
   loader.classList.add('d-none');
}

//Questa funzione mi concella il prodotto dalla lista
//confronta se l'id che ha il bottone è uguale all 'id dell'api, se è uguale fai partire i delite
function deleteSingleProducts(product){
   if(confirm('Sei sicuro di voler procedere?')=== true){
      fetch("https://striveschool-api.herokuapp.com/api/product/" + product.id, {
         method: 'DELETE',
         headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTUzZTFmMTc1YzAwMTRjNTU4Y2UiLCJpYXQiOjE2OTI2MDM3MTEsImV4cCI6MTY5MzgxMzMxMX0.QAaODo0-Wr_da5IhMIhivrjcyGGiXpFFF5pGKuVFNu8"     
         }
      })
      .then(res => res.json()) // or res.json()
      .then(res => {
         product.parentNode.parentNode.remove()                   
      })
      
   }   
}

/* al click dell tasto modifica mi appare un modale con gli inpunt, pero gia gli inpunt devono essere precompilati, cosi da poter
fare il put senza cancellare nessun dato e migliorare l'esperienza l'utente
*/

function showInputInside(id){

   let hiddenButtonSave = document.getElementById('hiddenButtonSave');
   let hiddenButtonEdit = document.getElementById('hiddenButtonEdit');

   fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
      headers: {
         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTUzZTFmMTc1YzAwMTRjNTU4Y2UiLCJpYXQiOjE2OTI2MDM3MTEsImV4cCI6MTY5MzgxMzMxMX0.QAaODo0-Wr_da5IhMIhivrjcyGGiXpFFF5pGKuVFNu8"     
      }
   })
   .then(res => res.json())
   .then(res => { 
      nameInput.value = res.name;
      brandInput.value = res.brand;
      descriptionInpunt.value = res.description;
      imageUrlInpunt.value = res.imageUrl;
      priceInpunt.value = res.price;
      hiddenInpunt.value = id;
      hiddenButtonSave.classList.add('d-none');
      hiddenButtonEdit.classList.remove('d-none');
     
   })

}

function SearchProduct(){
 
   let input = document.getElementById('inputValueb');

   let results = listProducts.filter(pr => pr.name.toLowerCase().includes(input.value.toLowerCase()));

  let liList = document.getElementsByClassName('liList');

  
   let listId = results.map(x => x._id);


  for(let singleLi of liList) {

    let showLi = false;

    for(let idItem of listId){
      if(singleLi.classList.contains(idItem)){
        showLi = true;
      }
    }


    if(showLi){
      singleLi.classList.remove("d-none");
    }else{
      singleLi.classList.add("d-none");
    }   
  }


 }











/*Una volta che l'utente ha modificato il campo che gli interessa, al click del tasto salva  modifiche viene fatta una put */

function PutInpunt(){

   try{ 
      fetch("https://striveschool-api.herokuapp.com/api/product/"+ hiddenInpunt.value, {

         method: "PUT",

         headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTUzZTFmMTc1YzAwMTRjNTU4Y2UiLCJpYXQiOjE2OTI2MDM3MTEsImV4cCI6MTY5MzgxMzMxMX0.QAaODo0-Wr_da5IhMIhivrjcyGGiXpFFF5pGKuVFNu8",
            "Content-type": "application/json"
         },
         body: JSON.stringify({ 
            "name": nameInput.value,
            "description": descriptionInpunt.value,
            "brand": brandInput.value,
            "imageUrl": imageUrlInpunt.value,
            "price": priceInpunt.value})
      })
      .then((response) => response.json())
      .then((json) => {
         alert("Prodotto modificato!!!")
         window.location.reload();
      } )

   }catch (error) {
      console.log(error);
   }
         

}
