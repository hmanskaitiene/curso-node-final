const loginForm = document.querySelector('#loginForm')
const btnLogin = document.querySelector('#btnLogin');
const buttonLoginContentComplete = 'Ingresar'
const buttonLoginContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${buttonLoginContentComplete}`;

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    cleanErrors();
    let form_validation = true;
    
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

    if (form_validation){
        btnLogin.innerHTML = buttonLoginContentLoading
        btnLogin.disabled = true;
        let formdata = new FormData(loginForm)
        let data = {
            email: formdata.get('email'),
            passwd: formdata.get('passwd'), 
        }

        const response = await apiQuery(`/api/usuarios/login`,'POST',data);
        const info = await response.json();
        if (info.authenticated === true){
            sessionStorage.setItem('userInfo',JSON.stringify(info.user));
            sessionStorage.setItem('userToken',info.token);
            location.replace('/productos')
        } else {
            btnLogin.innerHTML = buttonLoginContentComplete
            btnLogin.disabled = false;
            renderToasty('error', 'Usuario o contraseña invalidos');
        }
    }

});
