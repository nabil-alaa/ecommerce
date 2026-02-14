let userName = document.querySelector("#userName");
let password = document.querySelector("#password");
let signInBtn = document.querySelector("#signIn");

let getUser = localStorage.getItem("user");

window.onload = function () {
    userName.focus();
};

signInBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (userName.value === "" || password.value === "") {
        alert("Fill Your Data");
    } else {
        try {
            if (
                JSON.parse(getUser).userName &&
                JSON.parse(getUser).userName.trim() === userName.value.trim() &&
                JSON.parse(getUser).password &&
                JSON.parse(getUser).password.trim() === password.value.trim()
            ) {
                localStorage.setItem(
                    "login",
                    JSON.stringify({ userName: userName.value }),
                );

                setTimeout(() => {
                    window.location = "index.html";
                }, 500);
            } else {
                alert("not valid");
            }
        } catch {
            alert("not valid");
        }
    }
});

