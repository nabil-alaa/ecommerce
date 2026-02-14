let allProducts = document.querySelector(".products");
let AddToCartBtn = document.querySelector(".AddToCartBtn");
let RemoveFromCartBtn = document.querySelector(".RemoveFromCartBtn");
function requireLogin() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.userName) {
        window.location.href = "login.html";
        return false;
    }
    return true;
}
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
];

// show products
function drawData(start, end) {
    let pro = products.slice(start, end).map((item) => {
        let isFavorite = checkFavorite(item.id);

        let heartIconClass = isFavorite ? "fas" : "far";
        let heightImage;
        switch (item.category) {
            case "phone":
                heightImage = "330px";
                break;

            case "smart watch":
                heightImage = "240px";
                break;
            default:
                heightImage = "200px";
                break;
        }

        return `
            <div class="product-item col-12 col-sm-6 col-lg-4  mb-4 p-4">
                <div class="card border border-info pt-3">
                    <img class="product-item-img card-img-top m-auto" src="${item.imageURL}" alt="Card image" style="width:80%; height:${heightImage};">
                    <div class="product-itm-desc card-body pb-0 pl-4">
                        <p class="card-title">Product: ${item.title}.</p>
                        <p class="card-text">Category :${item.category}.</p>
                        <p class="color">Color: ${item.color}.</p>
                        <p class="card-price">Price: <span> <del>${item.price} EGP</del> ${item.salePrice} EGP</span></p>
                    </div>
                    <div class="product-item-action d-flex justify-content-between pr-4 pl-4">
                    <button id="add-btn-${item.id}" class="AddToCartBtn btn btn-primary mb-2" onClick="addTOCartEvent(${item.id})">Add To Cart</button>
                    <button id="remove-btn-${item.id}" class="RemoveFromCartBtn btn btn-primary mb-2" onClick="removeFromCart(${item.id})">Remove From Cart</button>
                        <i id="fav-${item.id}" class="${heartIconClass} fa-heart" onClick="addFav(${item.id})"></i>
                    </div>
                </div>
            </div>
        `;
    });

    allProducts.innerHTML = pro.join("");
}
drawData(0, 6);
// -------------------------------------------

// pagination
let itemsPerPage = 6;

let start = 0;
let end = itemsPerPage;
let pagesCount = Math.ceil(products.length / 6);

for (let i = 0; i < pagesCount; i++) {
    let s = i * itemsPerPage;
    let e = s + itemsPerPage;
    document.querySelector(".pages").innerHTML +=
        ` <li class="page-item" id="page"  start="${s}" end="${e}">
                    <a class="page-link">${i + 1}</a>
                </li>`;
}

document.querySelectorAll(".pages li").forEach((li) => {
    li.onclick = function () {
        start = Number(li.getAttribute("start"));
        end = Number(li.getAttribute("end"));
        drawData(start, end);
        updateButtons();
        updateActivePageByStart();
    };
});

document.querySelector("#prev").onclick = function () {
    if (start > 0) {
        start -= itemsPerPage;
        end -= itemsPerPage;
        drawData(start, end);
        updateButtons();
        updateActivePageByStart();
    }
};
document.querySelector("#next").onclick = function () {
    if (end < products.length) {
        start += itemsPerPage;
        end += itemsPerPage;
        drawData(start, end);
        updateButtons();
        updateActivePageByStart();
    }
};
function updateButtons() {
    document.querySelector("#prev").classList.toggle("disabled", start === 0);
    document
        .querySelector("#next")
        .classList.toggle("disabled", end >= products.length);
}

function updateActivePageByStart() {
    document.querySelectorAll(".pages li").forEach((li) => {
        const s = Number(li.getAttribute("start"));
        li.classList.toggle("active", s === start);
    });
}

let badge = document.querySelector(".badge");
let buyProudect = document.querySelector(".buyProudect");
let totalPrice = document.querySelector(".total .totalPrice");
let shoppingCartIcon = document.querySelector(".shoppingCart");
let cartsProudect = document.querySelector(".cartsProudect");
// let total = 0;
let quantity = 1;
let total = localStorage.getItem("totalPrice")
    ? +localStorage.getItem("totalPrice")
    : 0;

let addItemStorage = localStorage.getItem("proudectInCart")
    ? JSON.parse(localStorage.getItem("proudectInCart"))
    : [];

if (addItemStorage) {
    addItemStorage.map((item) => {
        drawBuyProudect(item);
        document.getElementById(`add-btn-${item.id}`).style.display = "none";
        document.getElementById(`remove-btn-${item.id}`).style.display =
            "inline-block";
        total += +item.salePrice * +localStorage.getItem(`quantity-${item.id}`);
    });
    totalPrice.innerHTML = total + " EGP";

    if (addItemStorage.length != 0) {
        badge.style.display = "block";
        badge.innerHTML = addItemStorage.length;
    } else {
        badge.style.display = "none";
    }
} else {
    document.getElementById(`remove-btn-${item.id}`).style.display = "none";
}

function plus(id, salePrice) {
    // console.log(item);

    let quantityElement = document.getElementById(`quantity-${id}`);
    let quantity = +quantityElement.innerHTML;

    quantity++;
    quantityElement.innerHTML = quantity;
    localStorage.setItem(`quantity-${id}`, quantity.toString());
    total += +salePrice;
    totalPrice.innerHTML = total + " EGP";
    localStorage.setItem("totalPrice", JSON.stringify(total));
    openCart();
}
function minus(id, salePrice) {
    // console.log(item);
    let quantityElement = document.getElementById(`quantity-${id}`);
    let quantity = +quantityElement.innerHTML;

    if (quantity > 1) {
        quantity--;
        quantityElement.innerHTML = quantity;
        localStorage.setItem(`quantity-${id}`, quantity.toString());
        total -= +salePrice;
        totalPrice.innerHTML = total + " EGP";
        localStorage.setItem("totalPrice", JSON.stringify(total));
    }
    openCart();
}
function removeFromCart(id) {
    let itemIndex = addItemStorage.findIndex((item) => item.id === id);
    let quantityElement = document.getElementById(`quantity-${id}`);
    let quantity = +quantityElement.innerHTML;

    if (itemIndex !== -1) {
        addItemStorage.splice(itemIndex, 1);
        localStorage.setItem("proudectInCart", JSON.stringify(addItemStorage));

        total = 0;
        document.getElementById(`add-btn-${id}`).style.display = "inline-block";
        document.getElementById(`remove-btn-${id}`).style.display = "none";

        let buyProudectItem = document.getElementById(`buyProudectItem-${id}`);
        if (buyProudectItem) {
            buyProudectItem.remove();
        }

        addItemStorage.forEach((item) => {
            drawBuyProudect(item);
            total +=
                +item.salePrice * +localStorage.getItem(`quantity-${item.id}`);
        });

        totalPrice.innerHTML = total + " EGP";
        localStorage.setItem("totalPrice", JSON.stringify(total));

        if (addItemStorage.length !== 0) {
            badge.style.display = "block";
            badge.innerHTML = addItemStorage.length;
        } else {
            badge.style.display = "none";
        }
    } else {
        document.getElementById(`remove-btn-${id}`).style.display = "none";
    }
}
function addTOCartEvent(id) {
    if (!requireLogin()) return;

    let choosenItem = products.find((item) => item.id === id);
    let itemIndex = addItemStorage.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
        drawBuyProudect(choosenItem);

        addItemStorage = [...addItemStorage, choosenItem];
        localStorage.setItem("proudectInCart", JSON.stringify(addItemStorage));

        let quantity = localStorage.getItem(`quantity-${choosenItem.id}`)
            ? +localStorage.getItem(`quantity-${choosenItem.id}`)
            : 1;

        total += +choosenItem.salePrice * quantity;
        totalPrice.innerHTML = total + " EGP";
        localStorage.setItem("totalPrice", JSON.stringify(total));

        document.getElementById(`add-btn-${id}`).style.display = "none";
        document.getElementById(`remove-btn-${id}`).style.display =
            "inline-block";

        if (addItemStorage.length != 0) {
            badge.style.display = "block";
            badge.innerHTML = addItemStorage.length;
        }
    } else {
        badge.style.display = "none";
    }
}
function drawBuyProudect(item) {
    if (!document.getElementById(`buyProudectItem-${item.id}`)) {
        let quantity = +localStorage.getItem(`quantity-${item.id}`) || 1;

        buyProudect.innerHTML += `<div id="buyProudectItem-${item.id}" class="row my-2 pr-2">
        <span class="col-6">${item.title}</span>
        <span class="col-2" id="quantity-${item.id}">${quantity}</span>
        <span class="text-danger minus col-2" onClick="minus(${item.id},${item.salePrice})">-</span>
        <span class="text-success plus col-2" onClick="plus(${item.id},${item.salePrice})">+</span>
      </div>`;
    }
}

// --------------------------------------------------------------------------
function checkFavorite(itemId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // console.log(favorites);
    let isFavorite = favorites.includes(itemId);
    // console.log(isFavorite);

    return isFavorite;
    // return false;
}

function addFav(id) {
    if (!requireLogin()) return;

    var heartIcon = document.getElementById(`fav-${id}`);
    if (heartIcon.classList.contains("far")) {
        heartIcon.classList.remove("far");
        heartIcon.classList.add("fas");
        addToFavorites(id);
    } else {
        heartIcon.classList.remove("fas");
        heartIcon.classList.add("far");
        removeFromFavorites(id);
    }
}

function addToFavorites(itemId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log(favorites);
    if (!favorites.includes(itemId)) {
        favorites.push(itemId);
    }
    // console.log(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function removeFromFavorites(itemId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // console.log(favorites);
    let index = favorites.indexOf(itemId);
    if (index !== -1) {
        favorites.splice(index, 1);
    }
    // console.log(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
// -------------------------------------------------------------------

shoppingCartIcon.addEventListener("click", openCart);

function openCart() {
    if (buyProudect.innerHTML != "") {
        if (cartsProudect.style.display == "block") {
            cartsProudect.style.display = "none";
        } else {
            cartsProudect.style.display = "block";
        }
    }
}

// --------------------------------------------------------------------------------------

// search
let search = document.getElementById("search");
let searchOption = document.getElementById("searchOption");
// let searchCategory = document.getElementById('title');
let modeSearch = "title";

searchOption.addEventListener("change", function () {
    let selectedValue = this.value;

    if (selectedValue === "searchTitle") {
        modeSearch = "title";
        console.log(searchOption.value);
    } else if (selectedValue === "searchCategory") {
        modeSearch = "category";
        console.log(searchOption.value);
    }

    search.placeholder = `search by ${modeSearch}`;
    search.focus();
    search.value = "";
    drawData(start, end);
});

// -----
function searchData(value) {
    let filteredProducts = products.filter((item) => {
        if (modeSearch === "title") {
            return item.title.toLowerCase().includes(value.toLowerCase());
        } else if (modeSearch === "category") {
            return item.category.toLowerCase().includes(value.toLowerCase());
        }
    });
    let pro = filteredProducts.map((item) => {
        let isFavorite = checkFavorite(item.id);

        let heartIconClass = isFavorite ? "fas" : "far";
        let heightImage;
        switch (item.category) {
            case "phone":
                heightImage = "330px";
                break;

            case "smart watch":
                heightImage = "240px";
                break;
            default:
                heightImage = "200px";
                break;
        }

        return `
            <div class="product-item col-4 mb-4 p-4">
                <div class="card border border-info pt-3">
                    <img class="product-item-img card-img-top m-auto" src="${item.imageURL}" alt="Card image" style="width:80%; height:${heightImage};">
                    <div class="product-itm-desc card-body pb-0 pl-4">
                        <p class="card-title">Product: ${item.title}.</p>
                        <p class="card-text">Category :${item.category}.</p>
                        <p class="color">Color: ${item.color}.</p>
                        <p class="card-price">Price: <span> <del>${item.price} EGP</del> ${item.salePrice} EGP</span></p>
                    </div>
                    <div class="product-item-action d-flex justify-content-between pr-4 pl-4">
                    <button id="add-btn-${item.id}" class="AddToCartBtn btn btn-primary mb-2" onClick="addTOCartEvent(${item.id})">Add To Cart</button>
                    <button id="remove-btn-${item.id}" class="RemoveFromCartBtn btn btn-primary mb-2" onClick="removeFromCart(${item.id})">Remove From Cart</button>
                        <i id="fav-${item.id}" class="${heartIconClass} fa-heart" onClick="addFav(${item.id})"></i>
                    </div>
                </div>
            </div>
        `;
    });

    allProducts.innerHTML = pro.join("");
}

