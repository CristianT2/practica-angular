import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-punto2',
  imports: [NgFor, NgIf],
  templateUrl: './punto2.component.html',
  styleUrl: './punto2.component.css'
})
export class Punto2Component {

  //Array de productos

  productos = [
    {
      nombre: "Lenovo ThinkPad X1",
      descripcion:"Procesadores hasta Intel® Core™ i7 de 11va generación y Evo® opcional, Impresionante pantalla de 14 pulgadas",
      imagen:  `producto1.jpg`,
      precio: "3.050.999,00",
    },
    {
      nombre: "ASUS Zenbook Pro 16X",
      descripcion:"Procesador Intel® Core™ hasta i9 12ª Gen,Graficos NVIDIA® GeForce RTX™ 3060 Memoria RAM hasta 32 GB Almacenamiento hasta 1TB SSD",
      imagen:  `producto2.webp`,
      precio: "3.399.999",
    },
    {
      nombre: "Samsung Galaxy Book3",
      descripcion:"Procesador Intel® Core™ i5-1335U Memoria RAM 8 GB LPDDR4x Almacenamiento 512 GB NVMe SSD",
      imagen:  `producto3.jpeg`,
      precio: "2.169.999",
    },
    {
      nombre: "iPhone 13 Pro Max",
      descripcion:"Pantalla: 6.7 pulgadas, 1284 x 2778 pixels Cámara: Cuádruple, 12MP+12MP +12MP+TOF 3D",
      imagen:  `producto4.webp`,
      precio: "2.919.900",
    },
    {
      nombre: "Samsung Galaxy S23 Ultra",
      descripcion:"Pantalla AMOLED de 6,8 pulgadas, 12 GB de RAM256, 1 TB de memoria, procesador Qualcomm Snapdragon 8",
      imagen:  `producto5.jpeg`,
      precio: "2.550.899",
    },
    {
      nombre: "Monitor Acer Predator X34",
      descripcion:"Pantalla IPS curvo LCD de 34 pulgadas con una resolución de 3440px-1440px es giratorio y reclinable",
      imagen:  `producto6.webp`,
      precio: "1.529.982",
    },
  ];

  //Array para los productos agregados al carrito
  carrito: any[] = [];

  constructor(){};

  //Agrega un producto al carrito
  addToCar(producto: any){
    this.carrito.push(producto);
    console.log(this.carrito);
  }

  //Calcula el total de los productos en el carrito
  getTotal(): any{
    let total = 0;

    this.carrito.forEach(producto => {
      const precioFormateado = producto.precio.replace(/\./g, '');
      total += parseFloat(precioFormateado); 
    });

    return total.toLocaleString();
  }

  //Eliminar productos
  vaciarCarrito(): void{
    this.carrito = [];
  }
}
