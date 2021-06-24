const url = 'https://jsonplaceholder.typicode.com/users';

//Vista principal
const vista_principal = document.querySelector('.principal');
const vista_presentacion = document.querySelector('.presentacion');
const imagen_presentacion = document.querySelector('.imgPresentacion');
const btn_api = document.querySelector('.traerApi');
const btn_home = document.querySelector('.material-icons');
const contenedor_vistaUsuarios = document.createElement('div');
const navegacion = document.createElement('div');
navegacion.classList.add('navegacion');

const consula_usuario = document.createElement('div');
consula_usuario.classList.add('consulta_usuario');
const aplicacion = document.createElement('div');
aplicacion.classList.add('container')


btn_api.addEventListener('click', function(){
    btn_home.style.visibility = 'visible'
    vista_principal.removeChild(vista_presentacion);
    vista_principal.removeChild(imagen_presentacion);
    vista_principal.appendChild(aplicacion);
    vista_principal.appendChild(consula_usuario);
    consula_usuario.appendChild(navegacion);
    //aplicacion.innerHTML = '<h1>Usuarios</h1>'
    aplicacion.appendChild(navegacion);
    navegacion.innerHTML = `<div>
    <h1>Usuarios</h1>
    </div>`
    //Trayendo los datos de la api

    fetch(url)
.then(res => res.json())
.then(data => {
    data.forEach(usuario => {
        const parrafo = document.createElement('p');
        parrafo.setAttribute('id', usuario.id);
        parrafo.setAttribute('class', 'usuarioIn');
        parrafo.addEventListener('click', function(){
            //window.location.href = `./usuario.html?id=${usuario.id}`;
            mostDatos_usuario(usuario.id);
        })
        parrafo.innerHTML = usuario.name;
        aplicacion.appendChild(parrafo);
    });
})

//capturar el error si alguna de las promesas falla
.catch(err => console.log(err))
})
//debemos usar el metodo fetch, recibe un string donde se carga la URL

function mostDatos_usuario(identificador){
    contenedor_vistaUsuarios.classList.add('parrafo_datos');
    consula_usuario.appendChild(contenedor_vistaUsuarios);


    fetch(`${url}/${identificador}`)
.then(res => res.json())
.then(data => {
    const nombre = document.createElement('p');
    const email = document.createElement('p');
    console.log(data.name);
    console.log(data.email);
    console.log(data.address.city);
    contenedor_vistaUsuarios.innerHTML = `
    <h1>Informacion</h1>
    <p>Identificador: ${data.id}</p>
    <p>Nombre: ${data.name}</p>
    <p>User name: ${data.username}</p>
    <h1>Direccion</h1>
    <p>Calle: ${data.address.street}</p>
    <p>Ciudad: ${data.address.city}</p>
    <p>Suite: ${data.address.suite}</p>
    <h1>Contacto</h1>
    <p>Telefono: ${data.phone}</p>
    <p>Website: ${data.website}</p>
    <p>compania: ${data.address.company}</p>
    `;
})
.catch(err => console.log(err))
}
btn_home.addEventListener('click', function(){
    btn_home.style.visibility = 'hidden'
    for(i = 1; i<=10; i++){
        const remover = document.getElementById(`${i}`);
        //console.log(remover)
        aplicacion.removeChild(remover)
    }

    vista_principal.removeChild(aplicacion);
    vista_principal.removeChild(consula_usuario);

    vista_principal.appendChild(vista_presentacion);
    vista_principal.append(imagen_presentacion);
});