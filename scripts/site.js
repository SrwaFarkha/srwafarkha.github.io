'use strict';

const galleryContainer = document.querySelector('.gallery-container');
const modalDialog = document.querySelector('.modal-car-details');
const modalDialogShoppingCart = document.querySelector('.modal-shoppingCart-details');
const modalDialogcheckout = document.querySelector('.modal-checkout');
const closeModal = document.querySelector('.close-modal');
const closeCheckoutModal = document.querySelector('.close-checkout-modal');
const closeShoppingCartModal = document.querySelector('.close-shoppingCart-modal');
const overlay = document.querySelector('.overlay');


//Visar alla bilar
vehicles.forEach(car => {
  galleryContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="car card m-3 " style="width: 330px;">
        <img class="car-img card-img-top" width="368" height="220" id="${car.id}" src="./content/img/${car.img}" alt="car-img"/>
        <div class="card-body">
            <p>${car.brand} ${car.model}</p>
        </div>
        <button class="buy-button" onclick="StartbuyCar(${car.id})">Köp</button>
    </div>`
  );
});


//Kundvagn
let shoppingCart = [];
let totalProduct = 0;
let totalPrice = 0;

function StartbuyCar(carId) {
  var carToBuy = vehicles.find(x => x.id == carId);
  shoppingCart.push(carToBuy);
}

function openShoppingCartModal() {
  let dataOutput = document.querySelector('#data-output')
  let totalProductData = document.querySelector('#total-product-data')
  let totalPriceData = document.querySelector('#total-price-data')
  let out = "";

  if(shoppingCart.length > 0){
    totalProduct = shoppingCart.length;
    totalProductData.innerHTML = `
      <p>Antal produkter: ${totalProduct}</p>
    `

    totalPrice = shoppingCart.map(car => car.price).reduce((a, b) => a + b);
    totalPriceData.innerHTML = `
    <p>Total pris: ${totalPrice}</p>
  `
  }

  if(shoppingCart.length > 0){
    for (let car of shoppingCart){
    out += `
    <tr>
    <td> <img src="./content/img/${car.img}" width="100" height="70"></img></td>
      <td>${car.brand}</td>
      <td>${car.model}</td>
      <td>${car.price}</td>
      <td onclick="DeleteCarFromShoppingCart(${car.id})" style="color:red;cursor:pointer">x</td>
    </tr>
    `;
  }
    dataOutput.innerHTML = out
  } else {

    totalProduct = 0;
    totalPrice = 0;
  
    totalProductData.innerHTML = `
      <p>Antal produkter: ${totalProduct}</p>
    `
  
    totalPriceData.innerHTML = `
    <p>Total pris: ${totalPrice}</p>
    `

    dataOutput.innerHTML = `
      <p>Inga bilar är tillagda i kundvagnen.</p>
    `
  }

  modalDialogShoppingCart.classList.remove('hidden');
}


//Checkar ut
function startCheckOut(){

  let totalProductData = document.querySelector('#total-product-data')
  let totalPriceData = document.querySelector('#total-price-data')

  shoppingCart = [];
  totalProduct = 0;
  totalPrice = 0;

  totalProductData.innerHTML = `
    <p>Antal produkter: ${totalProduct}</p>
  `

  totalPriceData.innerHTML = `
  <p>Total pris: ${totalPrice}</p>
  `

  overlay.classList.remove('hidden');
  modalDialogcheckout.classList.remove('hidden');
}

//Tar bort bilar från kundvagn
function DeleteCarFromShoppingCart(carId){
  shoppingCart.pop(x => x.id == carId);
  openShoppingCartModal();
}

const images = document.querySelectorAll('.car img');

//visar en specifik bil
const openModal = function(id) {
  const image = modalDialog.querySelector('.modal-container');

  var selectedCar = vehicles.find(x => x.id == id);
  image.innerHTML = `
    <div class="card" style="width: 50%; height:auto; margin:auto;"">
    <img class="card-img-top" width="300" height="300" src="./content/img/${selectedCar.img}" alt="car-img">
    <div class="card-body">
        <h5 class="card-title">${selectedCar.brand} ${selectedCar.model}</h5>
        <p class="card-text">Färg: ${selectedCar.colour} <br> År: ${selectedCar.year} <br> Pris: ${selectedCar.price}kr <br> Miltal: ${selectedCar.milage} <br> Växellåda: ${selectedCar.gear}</p>
    
    </div>
    `;

  overlay.classList.remove('hidden');
  modalDialog.classList.remove('hidden');
}

for(let image of images){
  let id = image.getAttribute('id');

  image.addEventListener('click', function() {
    openModal(id);
  });
}

const quitModal = () => {
  modalDialog.classList.add('hidden');
  modalDialogShoppingCart.classList.add('hidden');
  modalDialogcheckout.classList.add('hidden');
  overlay.classList.add('hidden');
}

closeModal.addEventListener('click', quitModal);
closeShoppingCartModal.addEventListener('click', quitModal);
closeCheckoutModal.addEventListener('click', quitModal);
overlay.addEventListener('click', quitModal);

document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') {
    if(!modalDialog.classList.contains('hidden')){
      quitModal();
    }
  }
})