let proudectInCart = localStorage.getItem("proudectInCart");
let allProducts = document.querySelector(".products");
let allfavorites = document.querySelector(".favorites");
const cartTotal = document.getElementById("cartTotal");
const pageTotal = document.getElementById("pageTotal");

if (JSON.parse(proudectInCart).length > 0) {
    drawProudectCart(JSON.parse(proudectInCart));
} else {
    allProducts.innerHTML = "Not Found";
}

// show product
function drawProudectCart(products) {
    let y = products.map((item) => {
        let quantity = +localStorage.getItem(`quantity-${item.id}`) || 1;

        return `
        <div id="product-${item.id}" class="product-item col-lg-6 col-sm-12 mb-sm-4 mb-5 px-5 px-sm-3">
        <div class="card border border-info">
          <div class="row">
            <div class="col-sm-4 col-12 ">
              <img class="product-item-img card-img-top ml-sm-3 mt-sm-4" src="${item.imageURL}" alt="Card image">
            </div>
            <div class="col-sm-8 col-12">
              <div class="product-item-desc card-body pb-0">
                <p class="card-title">Product: ${item.title}.</p>
                <p class="card-text">Category: ${item.category}.</p>
                <p class="color">Color: ${item.color}.</p>
                <p class="card-price">Price: <span><del>${item.price}</del> EGP ${item.salePrice}</span></p>
              </div>

              <div class="product-item-action d-flex justify-content-between align-items-center pr-4 pl-3">
                <button id="remove-btn-${item.id}" class="RemoveFromCartBtn btn btn-primary mb-2 d-inline-block" onClick="removeFromCart(${item.id})">Remove From Cart</button>
                <span class="text-danger minus p-0 m-0" style="font-size : 30px;  cursor: pointer; " onClick="minus(${item.id},${item.salePrice})">-</span>
                <span class="text-success plus p-0 m-0" style="font-size : 30px;  cursor: pointer; " onClick="plus(${item.id},${item.salePrice})">+</span>
                <div class="text-primary" style="font-size : 25px" id="quantity-${item.id}">${quantity}</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    });
    allProducts.innerHTML = y.join("");
}

// ---------------------------------------------------------------------------------------------

// total
let addItemStorage = localStorage.getItem("proudectInCart")
    ? JSON.parse(localStorage.getItem("proudectInCart"))
    : [];
let quantity = 1;
let total = localStorage.getItem("totalPrice")
    ? +localStorage.getItem("totalPrice")
    : 0;

if (addItemStorage) {
    addItemStorage.map((item) => {
        total += +item.salePrice * +localStorage.getItem(`quantity-${item.id}`);
    });

    if (cartTotal) cartTotal.innerHTML = total;
    if (pageTotal) pageTotal.innerHTML = total;
}

function removeFromCart(id) {
    let itemIndex = addItemStorage.findIndex((item) => item.id === id);
    let quantityElement = document.getElementById(`quantity-${id}`);
    let quantity = +quantityElement.innerHTML;

    if (itemIndex !== -1) {
        addItemStorage.splice(itemIndex, 1);
        localStorage.setItem("proudectInCart", JSON.stringify(addItemStorage));

        total = 0;
        let productItem = document.getElementById(`product-${id}`);
        if (productItem) {
            productItem.remove();
        }
        addItemStorage.forEach((item) => {
            total +=
                +item.salePrice * +localStorage.getItem(`quantity-${item.id}`);
        });

        if (cartTotal) cartTotal.innerHTML = total;
        if (pageTotal) pageTotal.innerHTML = total;
        localStorage.setItem("totalPrice", JSON.stringify(total));
    }
}
// -----------------------------------------------

// ----------------------------------------------------
function plus(id, salePrice) {
    // console.log(item);

    let quantityElement = document.getElementById(`quantity-${id}`);
    let quantity = +quantityElement.innerHTML;

    quantity++;
    quantityElement.innerHTML = quantity;
    localStorage.setItem(`quantity-${id}`, quantity.toString());
    total += +salePrice;

    if (cartTotal) cartTotal.innerHTML = total;
    if (pageTotal) pageTotal.innerHTML = total;
    localStorage.setItem("totalPrice", JSON.stringify(total));
}
function minus(id, salePrice) {
    let quantityElement = document.getElementById(`quantity-${id}`);
    let quantity = +quantityElement.innerHTML;

    if (quantity > 1) {
        quantity--;
        quantityElement.innerHTML = quantity;
        localStorage.setItem(`quantity-${id}`, quantity.toString());
        total -= +salePrice;

        if (cartTotal) cartTotal.innerHTML = total;
        if (pageTotal) pageTotal.innerHTML = total;
        localStorage.setItem("totalPrice", JSON.stringify(total));
    }
}
// -----------------------------------------------------------
let products = [
    {
        id: 1,
        title: "Dell G15-5520",
        category: "Labtop",
        color: "Black",
        price: "36870",
        salePrice: "36270",
        imageURL: "images/Labtop1.jpg",
    },
    {
        id: 2,
        title: "Lenovo V15",
        category: "Labtop",
        color: "gray",
        price: "13333",
        salePrice: "13011",
        imageURL: "images/Labtop2.jpg",
    },
    {
        id: 3,
        title: "HP Victus",
        category: "Labtop",
        color: "Black",
        price: "47699",
        salePrice: "47438",
        imageURL: "images/Labtop3.jpg",
    },
    {
        id: 4,
        title: "Dell Vostro",
        category: "Labtop",
        color: "Black",
        price: "29660",
        salePrice: "29320",
        imageURL: "images/Labtop4.jpg",
    },
    {
        id: 5,
        title: "R50i",
        category: "Earbuds",
        color: "Black",
        price: "1699",
        salePrice: "1399",
        imageURL: "images/Earbuds1.jpg",
    },
    {
        id: 6,
        title: "R100",
        category: "Earbuds",
        color: "White",
        price: "1600",
        salePrice: "1499",
        imageURL: "images/Earbuds.jpg",
    },
    {
        id: 7,
        title: "Life P2",
        category: "Earbuds",
        color: "Black",
        price: "2899",
        salePrice: "2699",
        imageURL: "images/Earbuds3.jpg",
    },
    {
        id: 8,
        title: "Life Note E",
        category: "Earbuds",
        color: "Black",
        price: "2485",
        salePrice: "1600",
        imageURL: "images/Earbuds4.jpg",
    },

    {
        id: 9,
        title: "Panduo",
        category: "smart watch",
        color: "Green",
        price: "450",
        salePrice: "375",
        imageURL: "images/smartwatch1.jpg",
    },
    {
        id: 10,
        title: "Muktrics",
        category: "smart watch",
        color: "Black",
        price: "400",
        salePrice: "350",
        imageURL: "images/smartwatch2.jpg",
    },
    {
        id: 11,
        title: "BigPlayer",
        category: "smart watch",
        color: "Brown",
        price: "730",
        salePrice: "650",
        imageURL: "images/smartwatch3.jpg",
    },
    {
        id: 12,
        title: "Samsung Galaxy A34",
        category: "phone",
        color: "Awesome Silver",
        price: "11286",
        salePrice: "10400",
        imageURL: "images/phone1.jpg",
    },
    {
        id: 13,
        title: "A24",
        category: "phone",
        color: "Black",
        price: "49900",
        salePrice: "38090",
        imageURL: "images/phone2.jpg",
    },
    {
        id: 14,
        title: "Oppo Reno 8T",
        category: "phone",
        Gold: "gray",
        price: "12793",
        salePrice: "12.445",
        imageURL: "images/phone3.jpg",
    },
    {
        id: 15,
        title: "Galaxy S22",
        category: "phone",
        color: "Green",
        price: "24299",
        salePrice: "24899",
        imageURL: "images/phone4.jpg",
    },
    {
        id: 16,
        title: "Galaxy S22 Ultra",
        category: "phone",
        color: "Phantom Black",
        price: "32800",
        salePrice: "33400",
        imageURL: "images/phone5.jpg",
    },
    {
        id: 17,
        title: "Galaxy S21",
        category: "phone",
        color: "Light Green",
        price: "21990",
        salePrice: "19299",
        imageURL: "images/phone6.jpg",
    },
    {
        id: 18,
        title: "Galaxy Z Fold5",
        category: "phone",
        color: "	Light blue",
        price: "73930",
        salePrice: "66000",
        imageURL: "images/phone7.jpg",
    },
    {
        id: 19,
        title: "oppo reno 7",
        category: "phone",
        color: "Black",
        price: "1120",
        salePrice: "1000",
        imageURL: "images/1.jpg",
    },
    {
        id: 20,
        title: "Iphone 14",
        category: "phone",
        color: "gray",
        price: "2120",
        salePrice: "2000",
        imageURL: "images/2.jpg",
    },
    {
        id: 21,
        title: "relme",
        category: "phone",
        color: "white",
        price: "3120",
        salePrice: "3000",
        imageURL: "images/3.jpg",
    },
    {
        id: 22,
        title: "infinx",
        category: "smart watch",
        color: "Blue",
        price: "4120",
        salePrice: "4000",
        imageURL: "images/4.jpg",
    },
    {
        id: 23,
        title: "oppo reno 7",
        category: "smart watch",
        color: "Black",
        price: "1120",
        salePrice: "1000",
        imageURL: "images/1.jpg",
    },
    {
        id: 24,
        title: "Iphone 14",
        category: "smart watch",
        color: "gray",
        price: "2120",
        salePrice: "2000",
        imageURL: "images/2.jpg",
    },
    {
        id: 25,
        title: "relme",
        category: "Labtob",
        color: "white",
        price: "3120",
        salePrice: "3000",
        imageURL: "images/3.jpg",
    },
    {
        id: 26,
        title: "infinx",
        category: "Labtob",
        color: "Blue",
        price: "4120",
        salePrice: "4000",
        imageURL: "images/4.jpg",
    },
    {
        id: 27,
        title: "oppo reno 7",
        category: "Labtob",
        color: "Black",
        price: "1120",
        salePrice: "1000",
        imageURL: "images/1.jpg",
    },
    {
        id: 28,
        title: "Iphone 14",
        category: "Air pods",
        color: "gray",
        price: "2120",
        salePrice: "2000",
        imageURL: "images/2.jpg",
    },
    {
        id: 29,
        title: "relme",
        category: "Air pods",
        color: "white",
        price: "3120",
        salePrice: "3000",
        imageURL: "images/3.jpg",
    },
    {
        id: 30,
        title: "infinx",
        category: "Air pods",
        color: "Blue",
        price: "4120",
        salePrice: "4000",
        imageURL: "images/4.jpg",
    },
];

// show favorite product
function drawFavData() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let pro = [];
    let indicators = "";
    let slideContent = "";
    const itemsPerSlide = 3;

    for (let i = 0; i < favorites.length; i++) {
        const favoriteId = favorites[i];
        const item = products.find((product) => product.id === favoriteId);
        if (item) {
            const heartIconClass = "fas";

            slideContent += `
        <div class="col-md-4 col-sm-6 ">
          <div class="card border border-info pt-3">
            <img class="product-item-img card-img-top m-auto" src="${item.imageURL}" alt="Card image" style="width:80%; height: 150px;">
            <div class="row m-0 justify-content-between">
              <div class="product-itm-desc card-body  ">
                <p class="card-title">Product: ${item.title}.</p>
                <p class="card-text">Category: ${item.category}.</p>
              </div>
              <div class="product-item-action row m-0 align-items-center p-2 ml-1 ">
                <i id="fav-${item.id}" class="${heartIconClass} fa-heart" onClick="removeFromFavorites(${item.id})"></i>
              </div>
            </div>
          </div>
        </div>
      `;

            if ((i + 1) % itemsPerSlide === 0 || i === favorites.length - 1) {
                pro.push(`
          <div class="carousel-item  ${pro.length === 0 ? "active" : ""}">
            <div class="row">${slideContent}</div>
          </div>
        `);

                indicators += `<li data-target="#carouselExampleIndicators" data-slide-to="${
                    pro.length - 1
                }" class="${pro.length === 0 ? "active" : ""}"></li>`;

                slideContent = "";
            }
        }
    }

    const carouselInner = document.querySelector(".carousel-inner");
    carouselInner.innerHTML = pro.join("");

    const carouselIndicators = document.querySelector(".carousel-indicators");
    carouselIndicators.innerHTML = indicators;
}

drawFavData();
// ------------------------------------------------------------

// remove favorite product
function removeFromFavorites(id) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    var heartIcon = document.getElementById(`fav-${id}`);
    heartIcon.classList.remove("fas");
    heartIcon.classList.add("far");

    const index = favorites.indexOf(id);
    if (index !== -1) {
        favorites.splice(index, 1);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    drawFavData();
}

