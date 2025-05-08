"use strict";
import {heroes} from "./data/heroes.js";
let componente = document.querySelector('lista-heroes');
console.log(componente)
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
                max-width: 13vw;
                max-height:16vw;
                border: 2px solid black;
            }
            .titulo-heroe{
                color: var(----cuartocolor);
                text-shadow: 3px 3px 3px black;
                font-weight: 100;
                font-size: 3vw;
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
                border-radius: 0.5rem;
                background-color: var(----tercercolor);
                font-size: 2rem;
                color: var(----cuartocolor);
                margin: 1rem;
                padding: 0.4rem;
                width: 9rem;
                text-shadow: 2px 2px 3px var(----primercolor);
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
                    imageAlt: "Custom image",
                    background: "#41a6de",
                    backdrop: `
                    rgba(255, 217, 0, 0.29)`
                    });
            });
        });  
    }
}
customElements.define('barra-busqueda',Barrabusqueda);
customElements.define('lista-heroes',MostrarHeroes);
componente.heroes = heroes