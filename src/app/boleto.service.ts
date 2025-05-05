import { Injectable } from '@angular/core';
import { Boleto } from './boleto.model';

@Injectable({
  providedIn: 'root'
})
export class BoletoService {

  private boletos: Boleto[] = [
    {
      dni: '39808789',
      precio: this.calcularPrecioFinal(10000, 1),
      categoriaTurista: 1,
      fechaCompra: new Date('2025-05-04T20:13:46-03:00'),
      email: 'c.torrejon96@gmail.com'
    },
    {
      dni: '12987651',
      precio: this.calcularPrecioFinal(10000, 2),
      categoriaTurista: 2,
      fechaCompra: new Date('2025-05-04T20:14:36-03:00'),
      email: 'email@email.com'
    },
    {
      dni: '13465789',
      precio: this.calcularPrecioFinal(10000, 3),
      categoriaTurista: 3,
      fechaCompra: new Date('2025-05-04T20:15:00-03:00'),
      email: 'test@example.com'
    }
  ];
  
  //Crud
  //Obtener todos los boletos
  getBoletos(): Boleto[]{
    return [...this.boletos];
  }
  
  //agregar un boleto
  createBoleto(boleto: Boleto): void{
    this.boletos.push({ ...boleto });
  }

  //Actualizar boleto
  updateBoleto(dni: string, boletoActualizado: Boleto):void{
    const index = this.boletos.findIndex(b => b.dni === dni);
    if(index !== -1){
      this.boletos[index] = { ...boletoActualizado };
    }
  }

  //Eliminar boleto
  deleteBoleto(dni: string): void{
    this.boletos = this.boletos.filter(b => b.dni !== dni);
  }

  //Mostrar el resumen de boletos por categoria
  getResumenPorCategoria(): { categoria: string, cantidad: number, total: number }[] {
    const resumen = [
      {categoria: 'Menor', cantidad: 0, total: 0},
      {categoria: 'Adulto', cantidad: 0, total: 0},
      {categoria: 'Jubilado', cantidad: 0, total: 0}
    ];

    this.boletos.forEach(boleto => {
      const precioFinal = this.calcularPrecioFinal(boleto.precio, boleto.categoriaTurista);
      if(boleto.categoriaTurista === 1){
        resumen[0].cantidad++;
        resumen[0].total += precioFinal;
      } else if(boleto.categoriaTurista === 2){
        resumen[1].cantidad++;
        resumen[1].total += precioFinal;
      } else if(boleto.categoriaTurista === 3){
        resumen[2].cantidad++;
        resumen[2].total += precioFinal;
      } 
    });

    return resumen;
  }

  // Calcular precio final con descuento
  private calcularPrecioFinal(precio: number, categoria: number): number {
    if (categoria === 1) return precio * 0.65; // Menor: 35% descuento
    if (categoria === 3) return precio * 0.5;  // Jubilado: 50% descuento
    return precio; // Adulto: sin descuento
  }

  // Total general
  getTotalGeneral(): number {
    return this.boletos.reduce((total, boleto) => {
      return total + this.calcularPrecioFinal(boleto.precio, boleto.categoriaTurista);
    }, 0);
  }
}
