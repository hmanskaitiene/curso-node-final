const apiQuery = async (url,method,bodyData,json = true) => {
    const token = sessionStorage.getItem('userToken')

    const headers = {
        'x-token': token 
    }
    
    if (json) headers['Content-Type'] = 'application/json; charset=UTF-8';

    const response = await fetch(url, {
        method: method || 'GET',
        body: json ? JSON.stringify(bodyData) : bodyData,
        headers
      });
      
    if (response.status == 401){
        Promise.resolve();
    } 
      
    return response;
}

