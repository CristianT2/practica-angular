import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Boleto } from '../boleto.model';
import { BoletoService } from '../boleto.service';

@Component({
  selector: 'app-parte2',
  imports: [ DataTablesModule ],
  templateUrl: './parte2.component.html',
  styleUrl: './parte2.component.css'
})
export class Parte2Component implements OnInit, AfterViewInit{

  // Referencia a la directiva DataTable para controlar la tabla
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  // Opciones de configuración para DataTables (paginación, idioma, etc.)
  dtOptions: DataTables.Settings = {};
  // Subject para disparar el renderizado inicial y posterior de la tabla
  dtTrigger: Subject<any> = new Subject<any>();

  boleto: Boleto = {
    dni: '',
    precio: 0,
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

  constructor(private boletoService: BoletoService) {}

  // Inicializa el componente y configura las opciones de DataTables
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',  // Paginación completa (primera, anterior, siguiente, última)
      pageLength: 10,  // Muestra 10 filas por página
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'  // Idioma español
      },
      responsive: true // Hace la tabla adaptable a diferentes tamaños de pantalla
    };
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
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Resetea el formulario a valores iniciales
  resetFormulario(): void {
    this.boleto = {
      dni: '',
      precio: 0,
      categoriaTurista: 0,
      fechaCompra: new Date(),
      email: ''
    };
    this.precioFinal = 0;
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

  // Destruye y vuelve a renderizar la tabla para reflejar cambios
  private rerenderTable(): void {
    this.dtElement.dtInstance.then((dtInstance: any) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }
}
