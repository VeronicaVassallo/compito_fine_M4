function OnLoad(){  // tutte le funzoni che scattano al caricamento della pagina sono qui
            
    try { 
        fetch("https://striveschool-api.herokuapp.com/api/product/", {



        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMTUzZTFmMTc1YzAwMTRjNTU4Y2UiLCJpYXQiOjE2OTI2MDM3MTEsImV4cCI6MTY5MzgxMzMxMX0.QAaODo0-Wr_da5IhMIhivrjcyGGiXpFFF5pGKuVFNu8",
            
        },

        })
        .then((response) => response.json()) 
        .then((products) => { debugger;
            localStorage.setItem("dataProducts", JSON.stringify(products))
            console.log(products)

            let params = new URLSearchParams(window.location.search);  //prende tutti i parametri che ci sono nel url(nel mio caso id), quelli messi dopo il "?""
            let val = params.get('id');
            let idFound = products.filter( x => x._id === val);
            info(idFound);
        }
            
        );
        
        
    }catch (error) {
        console.log(error);
    }
    
}
window.onload = OnLoad()


function info(idFound){
    let containerInfoProducts = document.getElementById('infoProducts');

    let infoCard = idFound.map(item => `

    <div class=" col-12  text-dark w-100 ">

        <div class="container-fluid">


            <div class="row">

                <div class="col-12 col-lg-6 mt-4 ">
                    
                    <div class=" myContairerImg bg-light text-center" style="width:50%">

                    <img src="${item.imageUrl}" class="myCardImgs" alt="img_book" style="width:50%">

                    </div>
                </div>

                <div class="col-12  col-lg-6  mt-5 text-light d-flex flex-column align-items-start">

                    <h2 class="card-title">${item.name}</h2>
                    <p class="card-text">${item.description}</p>
                

                        <p>Brand: ${item.brand}</p>
                        <p>Prezzo: ${item.price}€</p>               

                </div>  
                
                

            </div>

        </div>

    </div>
    
    `).join("");

    containerInfoProducts.innerHTML = infoCard
}