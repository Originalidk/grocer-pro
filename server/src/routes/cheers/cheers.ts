import { ProductInfo, IError } from '../markets.type';
import { AxiosResponse } from 'axios';

const axios = require("axios")
const cheerio = require("cheerio")

const getCheersProducts = async (search: string): Promise<Array<ProductInfo> | IError> => {
    try {
        let totalPages = 0;
        const cheersMaxPage = await axios.request({
            method: "GET",
            url: `https://cheers.com.sg/?s=${search}`,
            // headers: {
            //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            // },
        });

        const cheersPages = cheerio.load(cheersMaxPage.data);
        cheersPages('.pagination.jupiterx-posts-pagination').find('a').each((index: number, anchor: HTMLAnchorElement) => {
            const page = cheersPages(anchor).text();
            const pageNumber = page === "Next" ? 0 : Number(page)
            totalPages = Math.max(totalPages, pageNumber);
        });

        const promisesHTMLList: Array<Promise<AxiosResponse>> = []
        const result: Array<ProductInfo> = []

        for (let i = 1; i <= totalPages; i++) {
            const cheersHTML: Promise<AxiosResponse> = axios.request({
                method: "GET",
                url: `https://cheers.com.sg/page/${i}/?s=${search}`
            })
            promisesHTMLList.push(cheersHTML);
        }

        const resolvedHTMLList: Array<AxiosResponse> = await Promise.all(promisesHTMLList);
        
        for (let i = 0; i < resolvedHTMLList.length; i++) {
            const $ = cheerio.load(resolvedHTMLList[i].data);
            $('.jupiterx-content').find('article').each((index: number, article: HTMLElement) => {
                const name = $(article).find('.jupiterx-post-body.col').find('a').text();
                const url_product_name = name.toLowerCase().replace(/[^a-zA-Z0-9\-\.\_\~]/g, "-");

                result.push({
                    name: name,
                    price: 0, // Unknown
                    images: [$(article).find('.jupiterx-post-image.col-md-4').find('img').attr('src')],
                    offers: null,
                    units: null,
                    stock: true,
                    url: `https://cheers.com.sg/portfolio/${url_product_name}/`,
                    shop: "Cheers",
                });
            });
        }

        return result;
    } catch (error) {
        if (error instanceof Error) {
            return { status: 500, message: "Error occured while fetching Cheers data", error: error.message };
        }
        return { status: 500, message: "Unknown error occurred" };
    }
}

export default getCheersProducts;