export const getDiscount = (newPrice: number, oldPrice: number) => {
    const parsedNewPrice = parseFloat(newPrice.toFixed(2));
    const parsedOldPrice = parseFloat(oldPrice.toFixed(2));


    return Math.round(100 - (parsedNewPrice * 100 / parsedOldPrice))
}