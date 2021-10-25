const NAMES = document.getElementById("names");
const LASTNAME = document.getElementById("last-name");
const AGE = document.getElementById("age");
const EMAIL = document.getElementById("email");
const PHONENUMBER = document.getElementById("phone-number");
const COUNTRY = document.getElementById("country");
const IMAGE = document.getElementById("img");


function impressDataUser() {
    let user = JSON.parse(localStorage.getItem('userProfile'));
    NAMES.value = user.names
    LASTNAME.value = user.lastName
    AGE.value = user.age
    EMAIL.value = user.email
    PHONENUMBER.value = user.numberPhone
    COUNTRY.value = user.country
    IMAGE.src = localStorage.getItem("imgProfile")

}

function getUserData() {

    let userData = {
        names: NAMES.value, // obligatorio
        lastName: LASTNAME.value, // obligatorio
        age: AGE.value, // obligatorio
        email: EMAIL.value, // obligatorio
        numberPhone: PHONENUMBER.value,
        country: COUNTRY.value,
        img: IMAGE.src
    }

    if (userData.names !== '' && userData.lastName !== '' && userData.email !== "" && userData.numberPhone !== "" && userData.age !== "") {
        localStorage.setItem("userProfile", JSON.stringify(userData));

        document.getElementById("buttonCongratulations").innerHTML =
            `
            <div class="alert alert-success" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="alert-heading">Correcto!</h4>
                <p>Datos actualizados con éxito!</p>
            </div>
        `
    } else {
        document.getElementById("buttonCongratulations").innerHTML =
            `
            <div class="alert alert-danger" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="alert-danger">No!.</h4>
                <p>Porfavor, rellena los campos obligatorios</p>
            </div>
        `
    }

}

function previewFile() {
    var preview = document.getElementById('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
        localStorage.setItem("imgProfile", reader.result)
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "https://bootdey.com/img/Content/avatar/avatar6.png";
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    impressDataUser();
})
