const display = document.querySelector(".display");
const darkmode = document.querySelector("#dark");
const lightmode = document.querySelector("#light");
// const countryCard = document.querySelector(".countryCard")
const wrapper = document.querySelector(".wrapper")
const displayDetails = document.querySelector(".displayDetails")

function loadAll() {
    
const apiLink = "https://restcountries.com/v3.1/all";

//fetching the general api and displaying all countries
fetch(apiLink)
  .then((response) => response.json())
  .then((data) => { 
    
    let card = "";
    data.map((country)=>{

        card += `<div class="countryCard"  id="${country.name.common}" >  
    

            <img src="${country.flags.svg}" alt="flag"/> 
                <h3 class="country">${country.name.common}</h3>    
                <h5 class="population">Population : <span>${country.population}</span></h5>
                <h5 class="region">Region : <span>${country.region}</span></h5>
                <h5 class="capital">Capital : <span>${country.capital}</span></h5>

            </div>`

        display.innerHTML = card;

            const countrycard = document.querySelector(".countryCard")

            //displaying the details of each country when clicked

        countrycard.addEventListener("click", ()=>{
            
            // for (let i = 0; i < display.length; i++) {

            //     display[i].addEventListener("click", (event)=>{
            //     let newevent = event.target
            //     // console.log(newevent);
            //     let parentevent=newevent.parentElement.children[0];
            //     console.log(parentevent);
                
                  
            const countdetails =
            `<div class="countryCardD" >  

                <img src="${country.flags.svg}" alt="flag" width=300px/> 
             
                <h3 class="country">${country.name.common}</h3>   
                <h3 class="country">${country.name.nativeName}</h3>   

                <h5 class="population">Population : <span>${country.population}</span></h5>
                <h5 class="region">Region : <span>${country.region}</span></h5>
                <h5 class="subregion">Sub Region : <span>${country.subregion}</span></h5>
                <h5 class="capital">Capital : <span>${country.capital}</span></h5>
                <h5 class="domain">Top Level Domain : <span>${country.tld}</span></h5>
              <h5 class="currency">Currencies : <span>${country.currencies}</span></h5>
              <h5 class="languages">Sub Region : <span>${country.languages}</span></h5>
                
                
            </div>`

            display.innerHTML = countdetails;
            document.querySelector("#backBtn").style.display="block"
            document.querySelector("#searchCountry").style.display="none"
            document.querySelector("#filterRegion").style.display="none"
           

        })
   
    });
                       
    });
    document.querySelector("#backBtn").style.display="none"
    document.querySelector("#searchCountry").style.display="block"
    document.querySelector("#filterRegion").style.display="block"
         
};


 loadAll()

//search by country feature

function search(){

    const searchCountry = document.querySelector("#searchCountry").value
    if (searchCountry.length > 0) {       

    const nameLink = `https://restcountries.com/v3.1/name/${searchCountry}`;

    fetch(nameLink)
  .then((response) => response.json())
  .then((data) => { 
    
    let card = "";
    data.map((country)=>{

        card += `<div class="countryCard">  

            <img src="${country.flags.svg}" alt="flag"/> 
                <h3 class="country">${country.name.common}</h3>    
                <p class="population">Population : <span>${country.population}</span></p>
                <p class="region">Region : <span>${country.region}</span></p>
                <p class="capital">Capital : <span>${country.capital}</span></p>

            </div>`

        display.innerHTML = card;
                       
    })
//    .catch(error=>{
//     console.error(error)
   //})           

})
}
 else{
    if (searchCountry == "" ) {
        loadAll()
    }
}
};

searchCountry.addEventListener("input", search )

//filtering countries by region

function loadRegion(){

    const filterRegion = document.querySelector("#filterRegion").value
    const regionLink = `https://restcountries.com/v3.1/region/${filterRegion}`;
    console.log(filterRegion);
    fetch(regionLink)
   .then((response) => response.json())
   .then((data) => { 
    
    let card = "";
    data.map((country)=>{

        card += `<div class="countryCard">  

            <img src="${country.flags.svg}" alt="flag"/> 
                <h3 class="country">${country.name.common}</h3>    
                <p class="population">Population : <span>${country.population}</span></p>
                <p class="region">Region : <span>${country.region}</span></p>
                <p class="capital">Capital : <span>${country.capital}</span></p>

            </div>`

        display.innerHTML = card;

                       
    })
               
});
}
 filterRegion.addEventListener("change", loadRegion )


//darkmode/lightmode features

lightmode.addEventListener("click", dark)
darkmode.addEventListener("click", light)

function dark() {
    darkmode.style.display="block"
    lightmode.style.display="none"
    wrapper.style.backgroundColor="rgb(43,55,65)"
    wrapper.style.color="white"
    document.querySelector("header").style.backgroundColor="rgb(43,55,65)"
    document.querySelector("#searchCountry").style.backgroundColor="rgb(43,55,65)"
    document.querySelector("#filterRegion").style.backgroundColor="rgb(43,55,65)"
    document.querySelector("#searchCountry").style.color="white"
    document.querySelector("#filterRegion").style.color="white"
    
}
function light() {
    darkmode.style.display="none"
    lightmode.style.display="block"
    wrapper.style.backgroundColor="white"
    wrapper.style.color="black"
    document.querySelector("header").style.backgroundColor="white"
    document.querySelector("#searchCountry").style.color="black"
    document.querySelector("#filterRegion").style.color="black"
    document.querySelector("#searchCountry").style.backgroundColor="white"
    document.querySelector("#filterRegion").style.backgroundColor="white"
    
}

// document.querySelector("#backBtn").style.display="none"


// function details(){
//     const apiLink = "https://restcountries.com/v3.1/all";

//     fetch(apiLink)
//   .then((response) => response.json())
//   .then((data) => { 
    
//     let card = "";
//     data.map((country)=>{
//         card += `<div class="countryCardD" >  

//                 <img src="${country.flags.svg}" alt="flag" width=300px/> 
             
//                 <h3 class="country">${country.name.common}</h3>   
//                 <h3 class="country">${country.name.nativeName}</h3>   

//                 <h5 class="population">Population : <span>${country.population}</span></h5>
//                 <h5 class="region">Region : <span>${country.region}</span></h5>
//                 <h5 class="subregion">Sub Region : <span>${country.subregion}</span></h5>
//                 <h5 class="capital">Capital : <span>${country.capital}</span></h5>
//                 <h5 class="domain">Top Level Domain : <span>${country.tld}</span></h5>
//                 <h5 class="currency">Currencies : <span>${country.currencies}</span></h5>
//                 <h5 class="languages">Sub Region : <span>${country.languages}</span></h5>
                

                

//             </div>`
//             // displayDetails.style.display="block"
//             // display.style.display="none"
//             display.innerHTML = card;
//                document.querySelector("#backBtn").style.display="block"
//         // console.log(data);
//     })
// })
// };

// details()
//   countryCard.addEventListener("click", details)

//   document.querySelector("#backBtn").addEventListener("click", ()=>{
//     loadAll()
//   })
