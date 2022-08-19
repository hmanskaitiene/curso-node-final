const notAuth = ['login','signup']
const protectedssUrls = ['stock','chat','info']

const token = sessionStorage.getItem('userToken')
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
const url = window.location.href.split("/").pop();

if (!notAuth.includes(url) && token === null ) {
    window.location.href = '/login';
}

if (notAuth.includes(url) && token !== null ) {
    window.location.href = '/productos';
}

if (protectedssUrls.includes(url) && userInfo.rol === 'USER' ) {
    window.location.href = '/productos';
}