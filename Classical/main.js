

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
let popup = document.getElementById('popup');
let obrasPop = document.getElementById('obrasPop');

function mostrarCompositores(lista){
  contenedor.innerHTML = '';

  lista.forEach(compositor => {
    contenedor.innerHTML+=`
     <div class="carta">
     <p class="titulo" id="titulo">${compositor.complete_name}</p>
     <img src="${compositor.portrait}" id="portrait">
     <p class="vida" id="birthDeath">${compositor.birth.split('-01-01')}-${compositor.death.split('-01-01')}</p>
     <p class="periodo" id="epoch">${compositor.epoch}</p>
     <button class="botonObras" id="mas" compo="${compositor.id}" >Obras</button>
     </div>
     `
  })
}
let btnObras = document.getElementById('mas');
let btnCerrar = document.getElementById('cerrar');

contenedor.addEventListener('click', function(e) {
  
  if (e.target && e.target.classList.contains('botonObras')) {
    e.preventDefault();

    
    let idCompositor = e.target.getAttribute('compo');


    
    let url = `https://api.openopus.org/work/list/composer/${idCompositor}/genre/all.json`;

    fetch(url)          
     .then(response => response.json())  
     .then(data => {                   
       console.log("Obras conseguidas:", data);    
       let obras = data.works; 
       mostrarPopUp(obras);
       
     })
     .catch(error => {                   
       console.error('Error al leer las obras:', error);
     });
  }
});

function mostrarPopUp(obras){
    obrasPop.innerHTML = ''; 
    popup.classList.add('mostrar');
    const popularesYRecomendadas = obras.filter(
      obra => obra.popular === "1" && obra.recommended === "1"
      
    );
    popularesYRecomendadas.forEach(obra =>{
        let item = document.createElement('li');
        item.classList.add('item');
        item.textContent = obra.title;

        obrasPop.appendChild(item);


    })
}
popup.addEventListener('click', function(e) {
    if (e.target === popup) {
        popup.classList.remove('mostrar');
    }
});

btnCerrar.addEventListener('click', function(e){
    popup.classList.remove('mostrar')
})

let buscador = document.getElementById('buscarAutor');
let filtroEpoca = document.getElementById('filtroPeriodo');

function filtrar(){

  const filtro = filtroEpoca.value;
  const filtrados = compositores.filter(compositor => {
    
    if(filtro === 'Romantic'){
        return compositor.epoch === filtro;
    }
    else{
        return compositor.epoch.includes(filtro)
    }
     
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



