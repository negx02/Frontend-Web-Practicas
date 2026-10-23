type Estado = "activo" | "devuelto" | "vencido";

interface Prestamo {
  multa: number;
  ejemplar: number;
  estado: Estado;
  socio?: string;
}

function calcularMulta(prestamo: Prestamo): number {
  const cargoFijo = 50;
  return prestamo.multa + cargoFijo;
}

function armarRecibo(prestamo: Prestamo): string {
  const socio = prestamo.socio ?? "Sin socio registrado";
  return `Recibo | Socio: ${socio} | Ejemplar: ${prestamo.ejemplar} | Estado: ${prestamo.estado} | Multa: $${calcularMulta(prestamo)}`;
}

const prestamo: Prestamo = { multa: 350, ejemplar: 14, estado: "vencido", socio: "Nicolas Becerra" };

console.log(armarRecibo(prestamo));