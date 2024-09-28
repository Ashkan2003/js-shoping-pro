// dummy data base
let allProducts = [
  { id: 1, title: 'Sketch: for app designer make your work easier', price: 14.99, img: 'shop-img/item-1.jpg', count: 1, subTitle: 'Very power full System to design your own app.', },
  { id: 2, title: 'Html: Full learn of basic form of site', price: 16.99, img: 'shop-img/item-2.png', count: 1, subTitle: 'Learn html with code-study method by our talented masters', },
  { id: 3, title: 'Phyton: powerfull and easy syntax', price: 11.99, img: 'shop-img/item-9.jpg', count: 1, subTitle: 'This is the most comprehensive course for the Python programming', },
  { id: 4, title: 'JavaScript: Full Understanding', price: 19.99, img: 'shop-img/item-4.jpg', count: 1, subTitle: 'Very power full System to design your own app.', },
  { id: 5, title: 'Photo shop: Mastring Graphic design', price: 15.99, img: 'shop-img/item-5.jpg', count: 1, subTitle: 'Total master designing photos and pictures', },
  { id: 6, title: 'Create a design system in Figma', price: 10.99, img: 'shop-img/item-6.jpg', count: 1, subTitle: 'Very power full System to design your your web', },
  { id: 7, title: 'Deep Learning with React-Native', price: 12.99, img: 'shop-img/item-7.jpg', count: 1, subTitle: 'Learn React with code-study method by our talented masters', },
  { id: 8, title: 'Bootstrap: Css pupular framework', price: 18.99, img: 'shop-img/item-8.png', count: 1, subTitle: 'Made your web frontend in easy and fast way', }
]

let coursesContainer = document.querySelector('#courses-container')
let tableContainer = document.querySelector('#table-container')
let totalPriceElem = document.querySelector('#total-price')
let purchaseBtnHandler = document.querySelector('#purchase-btn-handler')
let userBasket = []


allProducts.forEach((product) => {
  coursesContainer.insertAdjacentHTML('beforeend', `
    <div class="col-sm-6 col-lg-4 col-xl-3">
        <div class="card shadow h-100">
          <!-- card img -->
          <img src="${product.img}" class="card-img-top" alt="course image">
          <!-- card body start -->
          <div class="card-body">
            <!-- badge and heart -->
            <div class="d-flex justify-content-between mb-2">
              <span class="badge bg-info bg-opacity-25 text-primary fw-normal">All level</span>
              <i class="far fa-heart "></i>
            </div>
            <!-- card title -->
            <h5 class="card-title fs-4"><a href="">${product.title}</a> </h5>
            <!-- card text -->
            <p class="text-secondary">${product.subTitle}</p>
            <!-- rating star -->
            <ul class="list-inline mb-0">
              <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
              <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
              <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
              <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
              <li class="list-inline-item me-0 small"><i class="far fa-star text-warning"></i></li>
              <li class="list-inline-item ms-2 text-success  mb-0">4.0/5.0</li>
            </ul>
          </div>
          <!-- card footer -->
          <div class="card-footer pb-3">
            <div class="d-flex justify-content-between mt-2">
              <span class="mt-1"><i class="far fa-clock text-danger me-2"></i>12h 00m</span>
              <button type="button" class="btn btn-primary px-3" onclick="addProductToBasketArray(${product.id})">${product.price}</button>
            </div>
          </div>
        </div>
    <div>
    `)
})

function addProductToBasketArray(productId) {

  let mainProduct = allProducts.find((product) => {  // sets a find loop on the allProducts array then return the entire object that has the same id that the user clickid on its btn
    return productId === product.id
  })
  // the peace of code in button avoid the doubling of product in userBasket by just ++ the product-count
  let indexOfDoubledProduct = userBasket.findIndex((userProdoct) => userProdoct.id === mainProduct.id); // check if the mainProduct was in the userBasket with find-method, then if it was, save its index(in userBasket-Array) in indexOfDoubledProduct 

  if (indexOfDoubledProduct != -1) { // if the findIndex method returns a number else than -1 , in outher words if the mainProduct was before in the userBasket-Array 
    userBasket[indexOfDoubledProduct].count++
    userTableBasketGenerator(userBasket)
    calcUserBasketProducts(userBasket)
  }
  else { // if the findIndex method returns -1, in outher words if there was not any mainProduct in userBasket-Array 
    userBasket.push(mainProduct)
    userTableBasketGenerator(userBasket)
    calcUserBasketProducts(userBasket)
  }

}

function userTableBasketGenerator(userBasketArray) {
  tableContainer.innerHTML = ''
  userBasketArray.forEach((userBasketProduct) => {
    tableContainer.insertAdjacentHTML('beforeend', `
      <tr>
        <td><img class="rounded-3" src="${userBasketProduct.img}" alt=""></td>
        <td class="text-success fw-bolder">${userBasketProduct.price}</td>
        <td>
          <div class="d-flex ">
            <input class="rounded-1 me-2 cart-quantity-input " type="number" value="${userBasketProduct.count}" onchange="inputCountHandler(${userBasketProduct.id},event)">
            <button class="btn btn-danger" onclick="selfUserTableRemove(${userBasketProduct.id})">Remove</button>
          </div>
        </td>
      </tr>
  `)
  })

}

function selfUserTableRemove(userBasketProductId) { // set a filter on the object of the userBasket array, then return every object else the one whitch user clickid the remove btn, then update the userBasket objects
  userBasket = userBasket.filter((userProdoct) => {
    return userProdoct.id !== userBasketProductId
  })
  userTableBasketGenerator(userBasket)
  calcUserBasketProducts(userBasket)
}

function calcUserBasketProducts(userBasket) {
  if (userBasket == '') {
    totalPriceElem.innerHTML = 'Total price : $0'
  }
  else {
    let userBasketTotalPrice = 0
    userBasket.forEach((userProdoct) => {
      userBasketTotalPrice += +(userProdoct.price * userProdoct.count)
      userBasketTotalPrice = Math.floor(userBasketTotalPrice * 100) / 100;
      totalPriceElem.innerHTML = `Total price : ${userBasketTotalPrice}`
    })

  }

}

function inputCountHandler(userBasketArrayId, event) {
  userBasket.forEach((userProdoct) => {
    if (userProdoct.id == userBasketArrayId) {
      userProdoct.count = event.target.value
      event.target.value = userProdoct.count
    }
  })
  calcUserBasketProducts(userBasket)
}

purchaseBtnHandler.addEventListener('click', () => {
  userBasket = []
  userTableBasketGenerator(userBasket)
  calcUserBasketProducts(userBasket)
})
