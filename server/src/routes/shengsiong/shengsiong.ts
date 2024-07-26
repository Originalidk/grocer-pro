import { ShengSiongProduct } from './shengsiong.type';
import { ProductInfo, IError } from '../markets.type';
import SockJS from "sockjs-client";
import axios, { AxiosResponse } from 'axios';

export const getShengSiongProducts = async (search: string): Promise<Array<ProductInfo> | IError> => {
    try {
        return new Promise((resolve, reject) => {
            const products: Array<ProductInfo> = [];
            let totalCount = 0;

            const socket = new SockJS("https://shengsiong.com.sg/sockjs");

            socket.onopen = () => {
                // console.log("Connected");

                socket.send(JSON.stringify({
                    msg: "connect",
                    version: "1",
                    support:["1", "pre2", "pre1"],
                }));

                const productCountStringRequest = `{\"msg\":\"method\",\"id\":\"1\",\"method\":\"Products.getCountByAllSlugs\",\"params\":[{\"categoryFilter\":{\"slugs\":[]},\"campaignPageFilter\":{\"slug\":\"\",\"category\":{\"slug\":\"\"}},\"shoppingListFilter\":{\"slug\":\"\",\"category\":{\"slug\":\"\"},\"search\":{\"slug\":\"\"},\"showKeptForLater\":false},\"searchFilter\":{\"slug\":\"${search}\",\"category\":{\"slug\":\"\"}}},{\"brands\":{\"slugs\":[]},\"prices\":{\"slugs\":[]},\"countryOfOrigins\":{\"slugs\":[]},\"dietaryHabits\":{\"slugs\":[]},\"tags\":{\"slugs\":[]},\"sortBy\":{\"slug\":\"\"}}]}`;
                socket.send(productCountStringRequest);
            }

            socket.onmessage = (event) => {
                const message = JSON.parse(event.data)
                const id = message.id ? Number(message.id) : 0
                if (id === 0) {
                    // console.log("Connection Established")
                    // console.log(message)
                } else if (id === 1) {
                    totalCount = message.result.count;
                    socket.send(getAllProductsRequest(search, totalCount));
                } else {
                    message.result.filter((item: ShengSiongProduct) => item).map((item: ShengSiongProduct) => {
                        products.push({
                            name: item.brand + " " + item.name,
                            price: item.price,
                            images: [item.imgKey],
                            offers: Object.entries(item.associatedPromoRules).map(([key, promo]) => promo.label),
                            units: item.packSize,
                            stock: !item.isSoldOut,
                            url: `https://shengsiong.com.sg/product/` + `${item.brand}-${item.name}-${item.packSize}`
                                .toLowerCase()
                                .replace(' ', '-')
                                .replace(/[^a-zA-Z0-9\-\.\_\~]/g, char => ""),
                            shop: "Sheng Siong",
                        })
                    })
                    resolve(products);
                    closeConnection();
                }
            }

            socket.onerror = (error) => {
                if (error instanceof Error) {
                    reject({ status: 500, message: "Error occurred while fetching Sheng Siong data", error: error.message });
                }
                return { status: 500, message: "Unknown error occurred" };
            }

            socket.onclose = () => {
                // console.log("Disconnected");
            };

            const closeConnection = () => {
                socket.close();
                // console.log('Closing the connection');
            };

            const timeoutError = () => {
                if (products.length > 0) {
                    resolve(products);
                    socket.close();
                }
                reject({ status: 500, message: "Timeout error occured for Sheng Siong data" });
                socket.close();
            };

            setTimeout(timeoutError, 5000);
        })
    } catch (error) {
        // if (error instanceof Error) {
        //     return { status: 500, message: "Error occured while fetching Sheng Siong data", error: error.message };
        // }
        // return { status: 500, message: "Unknown error occurred" };
        return [];
    }
};

const getAllProductsRequest = (search: string, totalCount: number) => {
    return `{\"msg\":\"method\",\"id\":\"2\",\"method\":\"Products.getByAllSlugs\",\"params\":[{\"categoryFilter\":{\"slugs\":[]},\"campaignPageFilter\":{\"slug\":\"\",\"category\":{\"slug\":\"\"}},\"shoppingListFilter\":{\"slug\":\"\",\"category\":{\"slug\":\"\"},\"search\":{\"slug\":\"\"},\"showKeptForLater\":false},\"searchFilter\":{\"slug\":\"${search}\",\"category\":{\"slug\":\"\"}}},{\"brands\":{\"slugs\":[]},\"prices\":{\"slugs\":[]},\"countryOfOrigins\":{\"slugs\":[]},\"dietaryHabits\":{\"slugs\":[]},\"tags\":{\"slugs\":[]},\"sortBy\":{\"slug\":\"\"}},1,${totalCount}]}`
}

export const getShengSiongImage = async (imgKey: string): Promise<AxiosResponse> => {
    return axios.request({
        method: "GET",
        url: `https://ssecomm.s3-ap-southeast-1.amazonaws.com/products/sm/${imgKey}.0.jpg`,
        responseType: 'arraybuffer',
    });
}