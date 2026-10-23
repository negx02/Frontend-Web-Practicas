function calcularMulta(prestamo) {
  const cargoFijo = 50;
  return prestamo.multa + cargoFijo;
}

const prestamo = { multa: '350', ejemplar: 14 };

console.log(calcularMulta(prestamo));