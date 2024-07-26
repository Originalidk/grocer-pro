export const parseCorrectPrice = (price: number, shop: string) => {
    if (shop === 'Cold Storage') {
        return Math.round(price) / 100;
    }
    return Math.round(price * 100) / 100;
}