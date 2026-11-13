export type EstadoPrestamo = 'activo' | 'devuelto' | 'vencido' | 'extraviado';

export interface Prestamo {
  readonly folio: string;        
  readonly creadoEn: Date;    
  libroId: string;
  ejemplares: number[];         
  socioId: string;
  estado: EstadoPrestamo;
  costoReposicion: number;       
}

let consecutivo = 100;
export function nuevoFolio(): string {
  consecutivo += 1;
  return `P-${consecutivo}`;
}
