let userName = document.querySelector("#userName");
let password = document.querySelector("#password");
let email = document.querySelector("#email");
let registerBtn = document.querySelector("#register");

window.onload = function () {
    userName.focus();
};

registerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (userName.value === "" || password.value === "" || email.value === "") {
        alert("please Fill The Empty");
    } else {
        const user = {
            userName: userName.value,
            password: password.value,
            email: email.value,
        };
        localStorage.setItem("user", JSON.stringify(user));

        setTimeout(() => {
            window.location = "login.html";
        }, 500);
    }
});



