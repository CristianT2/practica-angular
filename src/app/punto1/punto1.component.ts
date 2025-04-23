import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-punto1',
  imports: [NgFor],
  templateUrl: './punto1.component.html',
  styleUrl: './punto1.component.css'
})
export class Punto1Component {

  //Array de noticias

  noticias = [
    {
      titulo: 'Gimnasia de Jujuy le ganó 1 a 0 a Almirante Brown',
      descripcion: 'El equipo de Matías Módolo cosechó una victoria ante Almirante Brown en la previa del clásico del Norte por la Zona B de la Primera Nacional.',
      categoria: 'Deportes',
      foto: `/noticia1.webp`
    },
    {
      titulo: 'Tras el acuerdo con el FMI, estos son los impuestos que deberían cortarse',
      descripcion: 'Un informe privado advierte que una reforma fiscal debe tener en cuenta que el 30% de la recaudación proviene de impuestos distorsivos.',
      categoria: 'Economía',
      foto: `/noticia2.webp`
    },
    {
      titulo: 'Marruecos: un mono mató a un turista de un piedrazo en la cabeza',
      descripcion: 'Los agentes policiales procuraron brindarle auxilio al turista, quien se encontraba subiendo una montaña, pero la gravedad del golpe terminó siendo letal.',
      categoria: 'Internacionales',
      foto: `/noticia3.webp`
    },
    {
      titulo: 'Aumentó el precio de la garrafa en Jujuy: ¿cuánto cuesta?',
      descripcion: 'El nuevo incremento es del 9% aproximadamente y ya rige en las distribuidoras centrales. Es el tercero en lo que va del año.',
      categoria: 'Locales',
      foto: `/noticia4.webp`
    },
    {
      titulo: 'Alertaron sobre una nueva modalidad de estafas en Jujuy',
      descripcion: 'Ante intentos de estafas con pedido de datos bancarios y bonos, el Ministerio de Desarrollo Humano alertó sobre los cuidados para prevenir.',
      categoria: 'Policiales',
      foto: `/noticia5.webp`
    }
  ]
}
