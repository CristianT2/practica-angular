
export interface Boleto {
  dni: string;
  precio: number;
  categoriaTurista: number; // 1 = Menor, 2 = Adulto, 3 = Jubilado
  fechaCompra: Date;
  email: string;  
}