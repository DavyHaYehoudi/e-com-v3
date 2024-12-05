export function formatPrice(number: number | string): string {
  const parsedNumber = Number(number);
  // Vérifier si le nombre est un entier ou a des décimales
  const isInteger = Number.isInteger(parsedNumber);
  // Si c'est un entier, ajouter deux décimales
  if (isInteger) {
    return `${parsedNumber.toFixed(2).replace(".", ",")} €`;
  } else {
    // Si c'est un décimal, ajoute un 0 pour compléter jusqu'au centième avec une virgule comme séparateur
    return `${parsedNumber.toFixed(2).replace(".", ",")} €`;
  }
}

export function sumPriceArticle(quantity: number, price: number) {
  const total = quantity * price;
  const formattedTotal = formatPrice(total);
  return `${quantity} x ${formatPrice(price)} = ${formattedTotal}`;
}
 