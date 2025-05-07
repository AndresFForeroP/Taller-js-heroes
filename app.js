"use strict";
import {heroes} from "./data/heroes.js";
console.log(heroes)

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
                    background-color: var(----primercolor);
                    border: 2px solid black;
                    border-radius: 0.6rem;
                    height: 4rem;
                    width: 40rem;
                    form{display: grid;
                        grid-template-columns: 25% 60% 19%;
                        color: var(----quintocolor);
                        font-size: 1.5rem;
                        text-shadow: 2px 2px black;}
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
                    <input type="text">
                    <p><span class="material-symbols-outlined">search</span></p>
                </form>
            </div>`;
    }
}
customElements.define('barra-busqueda',Barrabusqueda)