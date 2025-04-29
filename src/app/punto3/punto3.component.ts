import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';

interface Palabra {
  texto: string;
}

@Component({
  selector: 'app-punto3',
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './punto3.component.html',
  styleUrl: './punto3.component.css'
})
export class Punto3Component implements OnInit{

  //Array de palabras para el juego
  palabras: Palabra[] = [
    {texto: 'RINOCERONTE'},
    {texto: 'MURCIELAGO'},
    {texto: 'CABALLO'},
    {texto: 'HIPOPOTAMO'},
    {texto: 'CANGURO'},
    {texto: 'TIBURON'},
    {texto: 'ORANGUTAN'},
    {texto: 'COCODRILO'},
    {texto: 'AGUILA'},
    {texto: 'ELEFANTE'},
  ];

  //Variables necesarias para el juego
  categoria = 'Animales';
  palabraActual: string = '';
  palabraOculta: string[] = [];
  letrasUsadas: string[] = [];
  intentos: number = 5;
  juegoTerminado: boolean = false;
  mensajeModal: string = '';
  mostrarModal: boolean = false;
  imagenEstado: string = `/estados/estado-5.png`;
  ultimaLetraPresionada: string = '';
  alfabeto: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  //Lanzamos el metodo iniciarJuego cuando carga el componente.
  ngOnInit(): void {
    this.iniciarJuego();
  }

  //inicializa y carga las funcionalidades del juego
  iniciarJuego():void {
    this.palabraActual = this.palabras[Math.floor(Math.random() * this.palabras.length)].texto;
    this.palabraOculta = Array(this.palabraActual.length).fill('_');
    this.letrasUsadas = [];
    this.intentos = 5;
    this.juegoTerminado = false;
    this.mostrarModal = false;
    this.imagenEstado = `/estados/estado-5.png`;
    this.ultimaLetraPresionada = '';
  }

  @HostListener('document:keydown', ['$event'])
  manejarTecla(event: KeyboardEvent): void {
    if (this.juegoTerminado || this.mostrarModal) return;

    const letra = event.key.toUpperCase();
    if (letra.length === 1 && /[A-Z]/.test(letra) && !this.letrasUsadas.includes(letra)) {
      this.ultimaLetraPresionada = letra;
      this.adivinarLetra(letra);
    }
  }

  //verifica si la letra seleccionada es valida o no
  adivinarLetra(letra: string): void{
    this.letrasUsadas.push(letra);
    let acierto = false;

    //Verificamos si la letra seleccionada pertenece a la palabra.
    for(let i = 0 ; i < this.palabraActual.length; i++){
      if (this.palabraActual[i] === letra) {
        this.palabraOculta[i] = letra;
        acierto = true;
      }
    }

    //Verificamos si el numero de intentos se acabaron y finalizamos el juego
    if(!acierto){
      this.intentos--;
      this.imagenEstado = `/estados/estado-${this.intentos}.png`;
      if (this.intentos === 0) {
        this.juegoTerminado = true;
        this.mensajeModal = `¡Perdiste! La palabra era "${this.palabraActual}".`;
        this.mostrarModal = true;
      }
    }

    //Verificamos si la palabra oculta se completo y finalizamos el juego
    if (!this.palabraOculta.includes('_')) {
      this.juegoTerminado = true;
      this.mensajeModal = '¡Ganaste! Adivinaste la palabra.';
      this.mostrarModal = true;
    }
  }
  
  //Cierra el modal y recarga el juego
  cerrarModal(): void{
    this.mostrarModal = false;
    this.iniciarJuego();
  }

}
