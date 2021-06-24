const aplicacion = document.querySelector('.container');
const url = 'https://jsonplaceholder.typicode.com/users';

const getUrl = new URLSearchParams(window.location.search)
id = getUrl.get('id')

fetch(`${url}/${id}`)
.then(res => res.json())
.then(data => {
    const nombre = document.createElement('p');
    const email = document.createElement('p');

    nombre.innerHTML = data.name;
    email.innerHTML = data.email;

    aplicacion.appendChild(nombre);
    aplicacion.appendChild(email);
})
.catch(err => console.log(err))