

fetch('https://api.openopus.org/composer/list/pop.json')          
  .then(response => response.json())  
  .then(data => {                   
    console.log(data);    
    compositores = data.composers; 
    mostrarCompositores(compositores);                  
  })
  .catch(error => {                   
    console.error('Error al leer el archivo:', error);
  });

let compositores = [];

let contenedor = document.getElementById('contenedor');

function mostrarCompositores(lista){
  contenedor.innerHTML = '';

  lista.forEach(compositor => {
    contenedor.innerHTML+=`
     <div class="carta">
     <p class="titulo" id="titulo">${compositor.complete_name}</p>
     <img src="${compositor.portrait}" id="portrait">
     <p class="vida" id="birthDeath">${compositor.birth.split('-01-01')}-${compositor.death.split('-01-01')}</p>
     <p class="periodo" id="epoch">${compositor.epoch}</p>
     <button class="botonObras" id="mas">Obras</button>
     </div>
     `
  })
}

let buscador = document.getElementById('buscarAutor');
let filtroEpoca = document.getElementById('filtroPeriodo');

function filtrar(){
  const filtrados = compositores.filter(compositor => {
    return compositor.epoch.includes(filtroPeriodo.value)
     
  })
  mostrarCompositores(filtrados);
}

function buscar(){
  const texto = buscador.value.toLowerCase()

  const filtrados = compositores.filter( compositor => {
    return compositor.complete_name.toLowerCase().includes(texto)
      
  });
  mostrarCompositores(filtrados);
  
}

buscador.addEventListener('change', buscar);
filtroEpoca.addEventListener('change', filtrar);



