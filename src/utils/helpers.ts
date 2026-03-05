export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const calculateTotal = (items: { price: number }[]) => {
  return items.reduce((acc, item) => acc + item.price, 0);
};
