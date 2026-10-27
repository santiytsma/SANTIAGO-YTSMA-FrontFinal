async function traerCompositores(){
    let url =`https://api.openopus.org/composer/list/pop.json`;

    let respuesta = await fetch(url);

    let datos = null;

    if(respuesta.ok){
        datos = await respuesta.json();
    }
    else{
        console.log('Hubo un error');
    }

    return datos;
}
async function cargarDatos(){
    let contenedor = document.getElementById('contenedor');
    let objeto = await traerCompositores();
    console.log(objeto);

    let arrayCompositores = objeto.composers;

    
    
    contenedor.innerHTML='';

    arrayCompositores.forEach(compositor =>{
    
        contenedor.innerHTML+=`
            <div class="carta">
              <p class="titulo" id="titulo">${compositor.complete_name}</p>
              <img src="${compositor.portrait}" id="portrait">
              <p id="birthDeath">${compositor.birth.split('-01-01')}-${compositor.death.split('-01-01')}</p>
              <p id="epoch">${compositor.epoch}</p>
              <button class="boton" id="mas">Obras</button>
            </div>
        `

    })
}
cargarDatos();