/**
 * Proytecto Buscador de SuperHeroes
 * Autor: Andres Forero
 * Fecha: 9/mayo/2025
 */
"use strict";
/** Importo el arreglo donde estan los heroes*/
import {heroes} from "./data/heroes.js";
let componente = document.querySelector('lista-heroes');
console.log(componente)
/**Esta funcion se usa cada vez que el usuario escribe alguna letra en 
 * el buscador, usa un forEach para recorrer el arreglo con los heroes
 * y si el nombre del heroe coincide con el que esta en la barra
 * lo agrega a otro arreglo llamado lista nueva
 * luego le enviamos al webcomponent encargado de crear las tarjetas de
 * heroes la lista nueva para que se muestren los heroes buscados
 */
const filtrarsuperheroes = (texto) =>{
    let listanueva = [];
    heroes.forEach(personaje => {
        if (personaje.clave.toLocaleLowerCase().startsWith(texto)) {
            listanueva.push(personaje)
        }
    });
    componente = document.querySelector('lista-heroes');
    console.log(listanueva)
    componente.heroes = listanueva
}
/**Web componen encargado de crear la barra de busqueda,se le agregan
 * los estilos y las etiquetas necesarias para crearla en el html,
 * cuenta con una funcion que se usa cada vez que se escribe algo
 * en el input
 */
class Barrabusqueda extends HTMLElement{
    constructor() {
        super();
        this.attachShadow ({mode:'open'});
        this.shadowRoot.innerHTML = /*css*/`
            <style>
                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-weight: normal;
                    font-style: normal;
                    font-size: 24px;
                    display: inline-block;
                    line-height: 1;
                    letter-spacing: normal;
                    text-transform: none;
                    white-space: nowrap;
                    direction: ltr;
                  }
                .barra-busq{
                    margin-left: 30vw;
                    background-color: var(----tercercolor);
                    border: 2px solid black;
                    border-radius: 0.6rem;
                    height: 4rem;
                    width: 40rem;
                    form{display: grid;
                        grid-template-columns: 25% 60% 19%;
                        color: var(----cuartocolor);
                        font-size: 1.5rem;
                        text-shadow: 3px 3px 5px black;}
                        input{
                            margin-top: 0.9rem;
                            margin-bottom: 2.5rem;
                            margin-left: 2rem;
                            font-size: 1.5rem;
                            border-radius: 0.6rem;
                        }
                        span{
                            margin-left: 2rem;
                            margin-top: -1rem;
                            font-size: 2rem;
                        }
                    .texto-buscar{
                        margin-top: 0.5rem;
                        margin-left: 2rem;
                        font-weight: 100;
                    }
                }
                @media(max-width:768px) {
                    .barra-busq{
                    margin:0px;
                    width: 370px;
                        .texto-buscar{
                        margin:10px;
                        font-size:2.5rem;}
                    }
                    input{
                        margin:1px;
                    }
                    p{
                        margin-top:18px;
                        margin-left:-20px;
                        font-size: 1.8rem;
                    }
                }
                @media(max-width:1180px) and (min-width:768px){
                    .barra-busq{
                        margin:0px;
                        width: 770px;
                            .texto-buscar{
                            margin-left:50px;
                            font-size:3rem;}
                        }
                }
}
            </style>
            <div class="barra-busq">
                <form action="">
                    <h1 class="texto-buscar">Buscar</h1>
                    <input id="input-busqueda" type="text">
                    <p><span class="material-symbols-outlined">search</span></p>
                </form>
            </div>`;
    }
    connectedCallback(){
        let dato = this.shadowRoot.querySelector('#input-busqueda')
        dato.addEventListener('input', () =>{
            let valor = dato.value.toLowerCase()
            filtrarsuperheroes(valor)
        })
    }
}
/**Web component encargado en crear todas las tarjetas de los superheroes 
 *este componente va cambiando segun la lista de heroes que tenga en la clave componente.heroes
*/
class MostrarHeroes extends HTMLElement{
    constructor(){
        super();
        this.attachShadow ({mode:'open'});
        this._heroes = []
        this.estilos = document.createElement('style') 
        this.estilos.innerHTML = /*css*/`
        .Heroe{
            margin: 1.3rem;
            margin-top: 3rem;
            border: 3px solid var(----primercolor);
            border-radius: 1.5rem;
            background-color: var(----segundocolor);
            text-align: center;
            img{
                width: 14rem;
                height:19rem;
                border: 2px solid black;
            }
            .titulo-heroe{
                color: var(----cuartocolor);
                text-shadow: 3px 3px 3px black;
                font-weight: 100;
                font-size: 3rem;
            }
            p{
                font-size: 1.8rem;
                margin: 0.8rem;
                color: #fedb0e;
                text-shadow: 2px 2px 2px var(----quintocolor);
            }
            p:nth-child(6){
                color: black;
                text-shadow: 2px 2px 3px white;
                font-size: 1.3rem;
            }
            button{
                font-family: "Bangers";
                border-radius: 0.5rem;
                background-color: var(----tercercolor);
                font-size: 2rem;
                color: var(----cuartocolor);
                margin: 1rem;
                padding: 0.4rem;
                width: 9rem;
                text-shadow: 2px 2px 3px var(----primercolor);
            }
        }
        @media(max-width:768px) {
            lista-heroes{
                display: block;
            }
}`
        this.shadowRoot.appendChild(this.estilos)
    }
    set heroes(value){
        this._heroes = value;
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(this.estilos.cloneNode(true));
        this._heroes.forEach(heroe => {
            const cadena = document.createElement('div');
            cadena.classList.add('Heroe')
            cadena.innerHTML = /*html*/`
                <h1 class="titulo-heroe">${heroe.nombre}</h1>
                <img src=${heroe.img} alt="">
                <p>${heroe.clave}</p>
                <p>${heroe.casa}</p>
                <p>${heroe.año}</p>
                <p>${heroe.descripcion}</p>
                <button id="heroe-${heroe.clave}">Ver mas</button>`;
            this.shadowRoot.appendChild(cadena);
            cadena.querySelector(`#heroe-${heroe.clave}`).addEventListener('click',() =>{
                Swal.fire({
                    title: heroe.clave,
                    text: heroe.descripcionplus,
                    imageUrl: heroe.img,
                    imageWidth: 400,
                    imageHeight: 550,
                    color: "#fedb0e",
                    confirmButtonColor: "black",
                    confirmButtonText:"SALIR",
                    imageAlt: "Custom image",
                    background: "#41a6de",
                    backdrop: `
                    rgba(194, 3, 44, 0.13)`
                    });
            });
        });  
    }
}
//**Se definen los web components en el html y se le agrega la
// lista incial de superheroes para que al iniciarse la pagina
// muestre todos los superheroes */
customElements.define('barra-busqueda',Barrabusqueda);
customElements.define('lista-heroes',MostrarHeroes);
componente.heroes = heroes