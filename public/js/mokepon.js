//Gabriel Duran
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionSeleccionarSeleccionarmMascota = document.getElementById('seleccionar-mascota');
const sectionReiniciar = document.getElementById('reiniciar');
const sectionInicio = document.getElementById('Inicio');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonSeleccionMulti = document.getElementById('Multi');
const botonSeleccionUnjugador = document.getElementById('Unjugador');
const botonReiniciar = document.getElementById('boton-reiniciar');
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaJugador = document.getElementById('mascota-jugador');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');
let Modo = 0
let jugadorId=null
let enemigoId=null
let mokepones = [];
let mokeponesEnemigos=[]
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputPydos
let inputTucapalma
let inputLangostelvis
let mascotaJugador;
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext("2d");
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa=window.innerWidth-20
const anchoMaximoDelMapa=350
if(anchoDelMapa>anchoMaximoDelMapa){anchoDelMapa=anchoMaximoDelMapa-20}
alturaQueBuscamos=anchoDelMapa*600/800
mapa.width=anchoDelMapa
mapa.height=alturaQueBuscamos
class Mokepon{constructor(nombre,foto,vida,fotoMapa,id=0){this.id=id
    this.nombre=nombre
    this.foto=foto
    this.vida=vida
    this.ataques=[]
    this.ancho=40
    this.alto=40
    this.x=aleatorio(0,mapa.width-this.ancho)
    this.y=aleatorio(0,mapa.height-this.alto)
    this.mapaFoto=new Image()
    this.mapaFoto.src=fotoMapa
    this.velocidadX=0
    this.velocidadY=0}
    pintarMokepon(){lienzo.drawImage(this.mapaFoto,this.x,this.y,this.ancho,this.alto)}
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5,'./assets/hipodoge.png');
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5,'./assets/capipepo.png');
let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5,'./assets/langostelvis.png');
let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5,'./assets/pydos.png')
let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5,'./assets/tucapalma.png')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5,'./assets/Ratigueya.png')
const HIPODOGE_ATAQUES=[{nombre:'Chorro',id:'boton-agua'},{nombre:'Chorro',id:'boton-agua'},{nombre:'Chorro',id:'boton-agua'},{nombre:'Incinerar',id:'boton-fuego'},{nombre:'Erosion',id:'boton-tierra'},]
const CAPIPEPO_ATAQUES=[{nombre:'Erosion',id:'boton-tierra'},{nombre:'Erosion',id:'boton-tierra'},{nombre:'Erosion',id:'boton-tierra'},{nombre:'Chorro',id:'boton-agua'},{nombre:'Incinerar',id:'boton-fuego'},]
const RATIGUEYA_ATAQUES=[{nombre:'Incinerar',id:'boton-fuego'},{nombre:'Incinerar',id:'boton-fuego'},{nombre:'Incinerar',id:'boton-fuego'},{nombre:'Chorro',id:'boton-agua'},{nombre:'Erosion',id:'boton-tierra'},]
const LANGOSTELVIS_ATAQUES=[
    { nombre: 'Incinerar', id: 'boton-fuego' },
    { nombre: 'Incinerar', id: 'boton-fuego' },
    { nombre: 'Incinerar', id: 'boton-fuego' },
    { nombre: 'Chorro', id: 'boton-agua' },
    { nombre: 'Erosion', id: 'boton-tierra' }]
const PYDOS_ATAQUES=[
    { nombre: 'Chorro', id: 'boton-agua' },
    { nombre: 'Chorro', id: 'boton-agua' },
    { nombre: 'Chorro', id: 'boton-agua' },
    { nombre: 'Incinerar', id: 'boton-fuego' },
    { nombre: 'Erosion', id: 'boton-tierra' }]    
const TUCAPALMA_ATAQUES=[
        { nombre: 'Erosion', id: 'boton-tierra' },
        { nombre: 'Erosion', id: 'boton-tierra' },
        { nombre: 'Erosion', id: 'boton-tierra' },
        { nombre: 'Incinerar', id: 'boton-fuego' },
        { nombre: 'Chorro', id: 'boton-agua' }]
hipodoge.ataques.push(...HIPODOGE_ATAQUES)
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)
langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)
pydos.ataques.push(...PYDOS_ATAQUES)
tucapalma.ataques.push(...TUCAPALMA_ATAQUES)
mokepones.push(hipodoge,capipepo,ratigueya,langostelvis,pydos,tucapalma)
function Juego(){
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none';
    sectionVerMapa.style.display = 'none';
    botonSeleccionMulti.addEventListener('click', iniciarJuegoMulti );
    botonSeleccionUnjugador.addEventListener('click', iniciarJuegounjugador );

    
}
function iniciarJuegounjugador(){
    sectionSeleccionarMascota.style.display = 'flex'
    sectionInicio.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none';
    sectionVerMapa.style.display = 'none';
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `;
        contenedorTarjetas.innerHTML+=opcionDeMokepones
        inputHipodoge=document.getElementById('Hipodoge')
        inputCapipepo=document.getElementById('Capipepo')
        inputRatigueya=document.getElementById('Ratigueya')
        inputPydos=document.getElementById('Pydos')
        inputLangostelvis=document.getElementById('Langostelvis')
        inputTucapalma=document.getElementById('Tucapalma')
    });
    manejarClicMascota();
    manejarClicSeleccion();
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

}
function seleccionarMascotaEnmigo() {
    
    
    
    secuenciaAtaque ()
}
function iniciarJuegoMulti() {
    sectionSeleccionarMascota.style.display = 'flex'
    sectionInicio.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none';
    sectionVerMapa.style.display = 'none';
    Modo = 1

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `;
        contenedorTarjetas.innerHTML+=opcionDeMokepones
        inputHipodoge=document.getElementById('Hipodoge')
        inputCapipepo=document.getElementById('Capipepo')
        inputRatigueya=document.getElementById('Ratigueya')
        inputPydos=document.getElementById('Pydos')
        inputLangostelvis=document.getElementById('Langostelvis')
        inputTucapalma=document.getElementById('Tucapalma')
    });
 
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    botonReiniciar.addEventListener('click', reiniciarJuego);
    
    manejarClicMascota();
    manejarClicSeleccion();

    unirseAlJuego()
}
function unirseAlJuego(){fetch("http://192.168.100.93:8080/unirse").then((res)=>{if(res.ok){res.text().then((respuesta)=>{console.log(respuesta);jugadorId=respuesta})}})}
function seleccionarMascotaJugador(){
    if(inputHipodoge.checked){spanMascotaJugador.innerHTML=inputHipodoge.id
mascotaJugador=inputHipodoge.id}else if(inputCapipepo.checked){spanMascotaJugador.innerHTML=inputCapipepo.id
mascotaJugador=inputCapipepo.id}else if(inputRatigueya.checked){spanMascotaJugador.innerHTML=inputRatigueya.id
mascotaJugador=inputRatigueya.id}else if(inputTucapalma.checked){spanMascotaJugador.innerHTML=inputTucapalma.id
    mascotaJugador=inputTucapalma.id}else if(inputLangostelvis.checked){spanMascotaJugador.innerHTML=inputLangostelvis.id
    mascotaJugador=inputLangostelvis.id}else if(inputPydos.checked){spanMascotaJugador.innerHTML=inputPydos.id
    mascotaJugador=inputPydos.id}else{alert('Selecciona una mascota')
return}

sectionSeleccionarMascota.style.display='none'
seleccionarMokepon(mascotaJugador)
extraerAtaques(mascotaJugador)
sectionVerMapa.style.display='flex'
iniciarMapa()
}

function manejarClicSeleccion() {
    const botonesSeleccion = document.querySelectorAll('.boton-mascota');

    botonesSeleccion.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesSeleccion.forEach(boton => {
                boton.classList.remove('selected1');
            });
            boton.classList.add('selected1');
        });
    });
}
function  manejarClicMascota() {
    const botonesSeleccion = document.querySelectorAll('.tarjeta-de-mokepon');

    botonesSeleccion.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesSeleccion.forEach(boton => {
                boton.classList.remove('selected');
            });
            boton.classList.add('selected');
        });
    });
}
function seleccionarMokepon(mascotaJugador){
    fetch(`http://192.168.100.93:8080/mokepon/${jugadorId}`,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({mokepon:mascotaJugador})})}

    function extraerAtaques(mascotaJugador){let ataques
        for(let i=0;i<mokepones.length;i++){if(mascotaJugador===mokepones[i].nombre){ataques=mokepones[i].ataques}}
        mostrarAtaques(ataques)}

        function mostrarAtaques(ataques){contenedorAtaques.innerHTML = '';
            ataques.forEach((ataque)=>{ataquesMokepon=`
            <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
            `
    contenedorAtaques.innerHTML+=ataquesMokepon})
    botonFuego=document.getElementById('boton-fuego')
    botonAgua=document.getElementById('boton-agua')
    botonTierra=document.getElementById('boton-tierra')
    botones=document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque(){botones.forEach((boton)=>{boton.addEventListener('click',(e)=>{if(e.target.textContent==='Incinerar'){ataqueJugador.push('Incinerar')
    console.log(ataqueJugador)
    boton.style.background='#FF0000'
    boton.disabled=true}else if(e.target.textContent==='Chorro'){ataqueJugador.push('Chorro')
    console.log(ataqueJugador)
    boton.style.background='#0000ff'
    boton.disabled=true}else{ataqueJugador.push('Erosion')
    console.log(ataqueJugador)
    boton.style.background='#BC8648'
    boton.disabled=true}
    if(ataqueJugador.length===5){enviarAtaques()}})})}

function enviarAtaques(){console.log('Enviar ataques',ataqueJugador);fetch(`http://192.168.100.93:8080/mokepon/${jugadorId}/ataques`,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({ataques:ataqueJugador})})
        intervalo=setInterval(obtenerAtaques,50)}

function seleccionarMascotaEnemigo(enemigo) {
    
    spanMascotaEnemigo.innerHTML=enemigo.nombre
    ataquesMokeponEnemigo=enemigo.ataques
    secuenciaAtaque ()
}
function indexAmbosOponente(jugador,enemigo){indexAtaqueJugador=ataqueJugador[jugador]
    indexAtaqueEnemigo=ataqueEnemigo[enemigo]}
    function obtenerAtaques(){console.log('OBTENER ATAQUES');fetch(`http://192.168.100.93:8080/mokepon/${enemigoId}/ataques`).then(function(res){if(res.ok){res.json().then(function({ataques}){if(ataques.length===5){ataqueEnemigo=ataques
        combate()}})}})}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate(){clearInterval(intervalo)
    console.log('COMBATE');for(let index=0;index<ataqueJugador.length;index++){if(ataqueJugador[index]===ataqueEnemigo[index]){indexAmbosOponente(index,index)
    crearMensaje("EMPATE")}else if(ataqueJugador[index]==='Incinerar'&&ataqueEnemigo[index]==='Erosion'){indexAmbosOponente(index,index)
    crearMensaje("GANASTE")
    victoriasJugador++
    spanVidasJugador.innerHTML=victoriasJugador}else if(ataqueJugador[index]==='Chorro'&&ataqueEnemigo[index]==='Incinerar'){indexAmbosOponente(index,index)
    crearMensaje("GANASTE")
    victoriasJugador++
    spanVidasJugador.innerHTML=victoriasJugador}else if(ataqueJugador[index]==='Erosion'&&ataqueEnemigo[index]==='Chorro'){indexAmbosOponente(index,index)
    crearMensaje("GANASTE")
    victoriasJugador++
    spanVidasJugador.innerHTML=victoriasJugador}else{indexAmbosOponente(index,index)
    crearMensaje("PERDISTE")
    victoriasEnemigo++
    spanVidasEnemigo.innerHTML=victoriasEnemigo}}
    revisarVidas()}
function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!");
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)");
    } else {
        crearMensajeFinal('Lo siento, perdiste :(');
    }
}

function crearMensaje(resultado){let nuevoAtaqueDelJugador=document.createElement('p')
    let nuevoAtaqueDelEnemigo=document.createElement('p')
    sectionMensajes.innerHTML=resultado
    nuevoAtaqueDelJugador.innerHTML=indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML=indexAtaqueEnemigo
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)}
function crearMensajeFinal(resultadoFinal){sectionMensajes.innerHTML=resultadoFinal
    sectionReiniciar.style.display='block'}
  

function reiniciarJuego() {
    restablecerEstado();
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas(){
    let ancho=mapa.width - 40
    let alto= mapa.height -40
   
    if (mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX >= ancho || 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX <= 0) {
        mascotaJugadorObjeto.velocidadX = 0;
    }
    if (mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY >= alto || 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY <= 0) {
        mascotaJugadorObjeto.velocidadY = 0;
        }
    mascotaJugadorObjeto.x=mascotaJugadorObjeto.x+mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y=mascotaJugadorObjeto.y+mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(mapaBackground,0,0,mapa.width,mapa.height)

    console.log(alto);
    console.log(mascotaJugadorObjeto.y);
    mascotaJugadorObjeto.pintarMokepon()
    mokeponesEnemigos.forEach(function(mokepon){mokepon.pintarMokepon()
 
        revisarColision(mokepon)})
            enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);
        
        }   
  
function enviarPosicion(x,y){fetch(`http://192.168.100.93:8080/mokepon/${jugadorId}/posicion`,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({x,y})}).then(function(res){if(res.ok){res.json().then(function({enemigos}){mokeponesEnemigos=enemigos.map(function(enemigo){;let mokeponEnemigo=null
    const mokeponNombre=enemigo.mokepon.nombre||""
    switch (mokeponNombre) {
        case "Hipodoge":
            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id);
            break;
        case "Capipepo":
            mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id);
            break;
        case "Ratigueya":
            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id);
            break;
        case "Pydos":
            mokeponEnemigo = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, './assets/pydos.png', enemigo.id);
            break;
        case "Tucapalma":
            mokeponEnemigo = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5, './assets/tucapalma.png', enemigo.id);
            break;
        case "Langostelvis":
            mokeponEnemigo = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, './assets/langostelvis.png', enemigo.id);
            break;
        default:
            break
    }  
    mokeponEnemigo.x=enemigo.x||0
    mokeponEnemigo.y=enemigo.y||0
    return mokeponEnemigo})})}})}
    
  
    
function moverDerecha(){mascotaJugadorObjeto.velocidadX=5}
function moverIzquierda(){mascotaJugadorObjeto.velocidadX=-5}
function moverAbajo(){mascotaJugadorObjeto.velocidadY=5}
function moverArriba(){mascotaJugadorObjeto.velocidadY=-5}
function detenerMovimiento(){mascotaJugadorObjeto.velocidadX=0
mascotaJugadorObjeto.velocidadY=0}
    function sePresionoUnaTecla(event){
        switch(event.key)
        {
            case 
                'ArrowUp':moverArriba()
                break
            case 
                'ArrowDown':moverAbajo()
                break
            case 
                'ArrowLeft':moverIzquierda()
                break
            case 
                'ArrowRight':moverDerecha()
                break
            default:break
        }
    }
    function iniciarMapa(){mascotaJugadorObjeto=obtenerObjetoMascota(mascotaJugador)
        console.log(mascotaJugadorObjeto,mascotaJugador);intervalo=setInterval(pintarCanvas,50)
        window.addEventListener('keydown',sePresionoUnaTecla)
        window.addEventListener('keyup',detenerMovimiento)}
    function obtenerObjetoMascota()
    {for(let i=0;i<mokepones.length;i++){if(mascotaJugador===mokepones[i].nombre){return mokepones[i]}}}
    function revisarColision(enemigo){
        const arribaEnemigo=enemigo.y
        const abajoEnemigo=enemigo.y+enemigo.alto
        const derechaEnemigo=enemigo.x+enemigo.ancho
        const izquierdaEnemigo=enemigo.x
        const arribaMascota=mascotaJugadorObjeto.y
        const abajoMascota=mascotaJugadorObjeto.y+mascotaJugadorObjeto.alto
        const derechaMascota=mascotaJugadorObjeto.x+mascotaJugadorObjeto.ancho
        const izquierdaMascota=mascotaJugadorObjeto.x
        if(
            abajoMascota<arribaEnemigo||
            arribaMascota>abajoEnemigo||
            derechaMascota<izquierdaEnemigo||
            izquierdaMascota>derechaEnemigo
            
        ){
            return
        }
        clearInterval(intervalo)
console.log('Se detecto una colision');enemigoId=enemigo.id
sectionSeleccionarAtaque.style.display='flex'
sectionVerMapa.style.display='none'
seleccionarMascotaEnemigo(enemigo)
    }

    function restablecerEstado() {
        // Eliminar el mokepon del mapa
        mascotaJugadorObjeto = null;
        mokeponesEnemigos = [];
        
        // Restablecer los contenedores de HTML
        contenedorTarjetas.innerHTML = '';
        contenedorAtaques.innerHTML = '';
        sectionMensajes.innerHTML = '';
        ataquesDelJugador.innerHTML = '';
        ataquesDelEnemigo.innerHTML = '';
    
        // Restablecer variables del juego
        jugadorId = null;
        enemigoId = null;
        ataqueJugador = [];
        ataqueEnemigo = [];
        victoriasJugador = 0;
        victoriasEnemigo = 0;
        vidasJugador = 3;
        vidasEnemigo = 3;
        clearInterval(intervalo);
    }
window.addEventListener('load',Juego);

