document.addEventListener("DOMContentLoaded", async () => {
    await generarMenu();
    fetch('/templates/profile.hbs')
    .then(response => response.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla);
        const userLogged = JSON.parse(sessionStorage.getItem('userInfo'))
        const html = template( {userLogged} )
        document.getElementById('profile').innerHTML = html

        const profileForm = document.getElementById('profileForm')
        const profileImageForm = document.getElementById('profileImageForm')
        
        const buttonFormContentCompleted = `Guardar`;
        const buttonFormContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${buttonFormContentCompleted}`;
        
        const buttonImageContentCompleted = `Actualizar imagen`;
        const buttonImageContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${buttonImageContentCompleted}`;
        
        const btnProfile = document.querySelector('#btnProfile');
        const btnProfileImage = document.querySelector('#btnProfileImage');
        

        const phoneInputField = document.querySelector("#telefono");
        const phoneInput = window.intlTelInput(phoneInputField, {
        preferredCountries: ["ar"],
        utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });


        profileForm.addEventListener('submit', async (e) => {
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
        
            if (form_validation){
                let formdata = new FormData(profileForm)
                let data = {
                    nombre: formdata.get('nombre'),
                    email: formdata.get('email'),
                    direccion: formdata.get('direccion'),
                    edad: formdata.get('edad'),
                    telefono: phoneInput.getNumber(),
                }
        
                btnProfile.innerHTML = buttonFormContentLoading
                btnProfile.disabled = true;
        
                const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
                const response = await apiQuery(`/api/usuarios/${userInfo.id}`,'PUT',data);
                const info = await response.json();
        
                btnProfile.innerHTML = buttonFormContentCompleted
                btnProfile.disabled = false;
                if (info.updated === true){
                    sessionStorage.setItem('userInfo',JSON.stringify(info));
                    renderToasty('success', 'Se han actualizado con éxito los cambios');
                } else {
                    renderToasty('error', 'No se pudieron actualizar los campos. El correo electrónico ya está registrado.');
                }
            }
        
        });
        
        
        profileImageForm.addEventListener('submit',  async (e) => {
            e.preventDefault();
            cleanErrors();
            let form_validation = true;
        
            if (!isRequired(document.getElementById('profileImage').value)) {
                showError('profileImage', 'Este es un campo requerido');
                form_validation = false;
            } else if (!checkExtension(document.getElementById('profileImage').value)) {
                showError('profileImage', 'Este tipo de archivo no esta permitido. Las extensión debe ser jpg o png');
                form_validation = false;
            }
            

            if (form_validation){
                btnProfileImage.innerHTML = buttonImageContentLoading
                btnProfileImage.disabled = true;
                let formData = new FormData(profileImageForm);
                const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
                const response = await apiQuery(`/api/usuarios/userImage/${userInfo.id}`,'POST',formData,false);
                const info = await response.json();
                btnProfileImage.innerHTML = buttonImageContentCompleted
                btnProfileImage.disabled = false;
                if (info.uploaded === true){
                    sessionStorage.setItem('userInfo',JSON.stringify(info));
                    renderToasty('success', 'Se actualizo la imagen');
                    document.querySelector('#profileImageDisplay').src= info.imageProfile;
                    document.querySelector('#menuImageDisplay').src= info.imageProfile;
                } else {
                    renderToasty('error', 'No se pudo actualizar la imagen');
                }
            }
        });
    })
});

    






