const phoneInputField = document.querySelector("#telefono");
const phoneInput = window.intlTelInput(phoneInputField, {
  preferredCountries: ["ar"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

const signupForm = document.getElementById('signupForm')
const buttonContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Registrar`;
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    cleanErrors();
    let form_validation = true;

    if (!isRequired(document.getElementById('nombre').value)) {
        showError('nombre', 'Este es un campo requerido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('email').value)){
        showError('email', 'Este es un campo requerido');
        form_validation = false;
    } else if (!isEmailValid(document.getElementById('email').value)) {
        showError('email', 'No es un email válido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('passwd').value)) {
        showError('passwd', 'Este es un campo requerido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('edad').value)) {
        showError('edad', 'Este es un campo requerido');
        form_validation = false;
    }

    if (!phoneInput.getNumber()) {
        showError('telefono', 'Este es un campo requerido');
        form_validation = false;
    } else if (!phoneInput.isValidNumber()) {
        showError('telefono', 'No es un teléfono válido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('direccion').value)) {
        showError('direccion', 'Este es un campo requerido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('profileImage').value)) {
        showError('profileImage', 'Este es un campo requerido');
        form_validation = false;
    }
    

    if (form_validation){
        let formdata = new FormData(signupForm)
        let data = {
            nombre: formdata.get('nombre'),
            email: formdata.get('email'),
            passwd: formdata.get('passwd'), 
            direccion: formdata.get('direccion'),
            edad: formdata.get('edad'),
            telefono: phoneInput.getNumber(),
        }

        document.querySelector('#btnSignup').innerHTML = buttonContentLoading
        fetch('/signup', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(info => {
            if (info.registered === true){
                sessionStorage.setItem('userId',info.userId);
                let formData = new FormData();
                const profile = document.getElementById('profileImage');
                formData.append("profileImage", profile.files[0]);
                return fetch('/userImageUpload', {
                  method: 'POST',
                  body: formData
                });
            } else {
                renderToasty('error', 'No se pudo registrar el usuario');
            }
        })
        .then(response => response.json())
        .then(imageProfile => {
            if (imageProfile.uploaded === true){
                location.replace('/dashboard')
            } else {
                renderToasty('error', 'No se pudo registrar el usuario');
            }
        });
    }

});
