import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Boleto } from '../boleto.model';
import { BoletoService } from '../boleto.service';
import { CommonModule, CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parte2',
  imports: [ NgIf, NgFor, CommonModule, FormsModule, DataTablesModule, DatePipe, CurrencyPipe ],
  templateUrl: './parte2.component.html',
  styleUrl: './parte2.component.css'
})
export class Parte2Component implements OnInit, AfterViewInit{

  // Referencia a la directiva DataTable para controlar la tabla
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  // Opciones de configuración para DataTables (paginación, idioma, etc.)
  dtOptions: any = {};
  // Subject para disparar el renderizado inicial y posterior de la tabla
  dtTrigger: Subject<any> = new Subject<any>();

  boleto: Boleto = {
    dni: '',
    precio: 10000,
    categoriaTurista: 0,
    fechaCompra: new Date(),
    email: ''
  };

  precioFinal: number = 0;
  categorias = [
    { value: 0, label: 'Seleccionar categoría' },
    { value: 1, label: 'Menor' },
    { value: 2, label: 'Adulto' },
    { value: 3, label: 'Jubilado' }
  ];

  constructor(private boletoService: BoletoService, private cdr: ChangeDetectorRef) {}

  // Inicializa el componente y configura las opciones de DataTables
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',  // Paginación completa (primera, anterior, siguiente, última)
      pageLength: 10,  // Muestra 10 filas por página
      language: {
        url: 'https://cdn.datatables.net/plug-ins/2.1.8/i18n/es-ES.json' // Idioma español
      },
      responsive: true, // Hace la tabla adaptable a diferentes tamaños de pantalla
      data: this.getBoletos().map(boleto => ({
        dni: boleto.dni,
        email: boleto.email,
        precio: boleto.precio,
        precioFinal: this.calcularPrecioFinalParaBoleto(boleto),
        categoria: this.categorias[boleto.categoriaTurista].label,
        fechaCompra: boleto.fechaCompra
      })),
      columns: [
        { data: 'dni' },
        { data: 'email' },
        { data: 'precio', render: (data: number) => `$${data.toFixed(2)}` },
        { data: 'precioFinal', render: (data: number) => `$${data.toFixed(2)}` },
        { data: 'categoria' },
        { data: 'fechaCompra', render: (data: string) => new Date(data).toLocaleDateString('es-AR') }
      ]
    };

    // Calcula el precio final inicial
    this.calcularPrecioFinal();
  }

  // Dispara el renderizado inicial de la tabla después de que la vista esté lista
  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  // Calcula el precio final del boleto con descuentos según la categoría
  calcularPrecioFinal(): void {
    if (this.boleto.precio > 0 && this.boleto.categoriaTurista > 0) {
      if (this.boleto.categoriaTurista === 1) {
        this.precioFinal = this.boleto.precio * 0.65; // 35% descuento para Menor
      } else if (this.boleto.categoriaTurista === 3) {
        this.precioFinal = this.boleto.precio * 0.5; // 50% descuento para Jubilado
      } else {
        this.precioFinal = this.boleto.precio; // Sin descuento para Adulto
      }
    } else {
      this.precioFinal = 0; // Sin descuento para Adulto
    }
    this.cdr.detectChanges(); // Forzar detección de cambios
  }

  // Calcula el precio final para un boleto dado (usado en la tabla)
  calcularPrecioFinalParaBoleto(boleto: Boleto): number {
    if (boleto.categoriaTurista === 1) return boleto.precio * 0.65;
    if (boleto.categoriaTurista === 3) return boleto.precio * 0.5;
    return boleto.precio;
  }

  // Registra un nuevo boleto en el servicio y actualiza la tabla
  registrarBoleto(): void {
    if (this.boleto.dni && this.boleto.email && this.boleto.precio > 0 && this.boleto.categoriaTurista > 0) {
      this.boletoService.createBoleto({ ...this.boleto, fechaCompra: new Date() });
      this.resetFormulario();
      this.rerenderTable();
      console.log(this.boletoService.getBoletos());
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Resetea el formulario manteniendo el precio fijo
  resetFormulario(): void {
    this.boleto = {
      dni: '',
      precio: 10000, // Precio fijo
      categoriaTurista: 0,
      fechaCompra: new Date(),
      email: ''
    };
    this.precioFinal = 0;
    this.cdr.detectChanges(); // Forzar detección de cambios
  }

  // Obtiene la lista de boletos desde el servicio
  getBoletos(): Boleto[] {
    return this.boletoService.getBoletos();
  }

  // Obtiene el resumen por categoría (cantidad y total por Menor, Adulto, Jubilado)
  getResumenPorCategoria() {
    return this.boletoService.getResumenPorCategoria();
  }

  // Obtiene el total general de precios finales
  getTotalGeneral(): number {
    return this.boletoService.getTotalGeneral();
  }

  // Destruye y vuelve a renderizar la tabla
  private rerenderTable(): void {
    console.log('Intentando rerenderizar tabla...');
    const newData = this.getBoletos().map(boleto => ({
      dni: boleto.dni,
      email: boleto.email,
      precio: boleto.precio,
      precioFinal: this.calcularPrecioFinalParaBoleto(boleto),
      categoria: this.categorias[boleto.categoriaTurista].label,
      fechaCompra: boleto.fechaCompra
    }));
    console.log('Datos para DataTables:', newData);
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: any) => {
        console.log('Actualizando datos de la tabla...');
        dtInstance.destroy(); // Destruir la tabla existente
        this.dtOptions.data = newData;
        this.dtTrigger.next(null); // Reinicializar
        this.cdr.detectChanges();
        console.log('Tabla rerenderizada');
      }).catch((error: any) => {
        console.error('Error al destruir tabla:', error);
        this.dtOptions.data = newData;
        this.dtTrigger.next(null);
        this.cdr.detectChanges();
        console.log('Tabla renderizada tras error');
      });
    } else {
      console.log('Tabla no inicializada, renderizando desde cero');
      this.dtOptions.data = newData;
      this.dtTrigger.next(null);
      this.cdr.detectChanges();
      console.log('Tabla renderizada desde cero');
    }
  }
}
