let userInfo = document.querySelector("#userInfo");
let user = document.querySelector("#user");
let links = document.querySelector("#links");
let logOutBtn = document.querySelector("#logOut");

let storedUser = JSON.parse(localStorage.getItem("login"));

if (storedUser && storedUser.userName) {
    if (links) links.style.display = "none";

    user.style.display = "block";
    userInfo.style.display = "flex";

    user.textContent = `Welcome, ${storedUser.userName}`;
} else {
    if (userInfo) userInfo.style.display = "none";
}

if (logOutBtn) {
    logOutBtn.addEventListener("click", logOut);
}

function logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("login");

    localStorage.removeItem("cart");
    localStorage.removeItem("favorites");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 300);
}

