import { ColdStorageProduct } from './coldstorage.type';
import { ProductInfo, IError } from '../markets.type';
import { stringToURL } from '../utils/urlHelper';

const axios = require("axios")
const https = require("https")
const fs = require("fs")
const path = require("path")

const certPath = path.resolve('src/routes/certsCA/_.coldstorage.com.sg.crt')
const coldstorageCA = fs.readFileSync(certPath)

const agent = new https.Agent({
    ca: coldstorageCA,
});

const getColdStorageProductsSlowly = async (search: string): Promise<Array<ProductInfo> | IError> => {
    try {
        const pagesResponse = await axios.request({
            method: "POST",
            url: `https://coldstorage.com.sg/api/item/wareSearch`,
            headers: {
               "Content-Type": "application/json",
            },
            data: {
                param: {
                    keyword: `${search}`,
                },
                comm: {
                    "dmTenantId": 10,
                    "venderId": 12,
                    "storeId": 550989,
                },
            },
            httpsAgent: agent,
        });
        const totalPages = pagesResponse.data.data.pageInfo.pageCount;
        
        const processedPromises: Array<Array<ColdStorageProduct>> = []
        const results: Array<ProductInfo> = []

        const fetchPageProductList = async (page: number): Promise<Array<ColdStorageProduct>> => {
            const searchResponse = await axios.request({
                method: "POST",
                url: `https://coldstorage.com.sg/api/item/wareSearch`,
                headers: {
                   "Content-Type": "application/json",
                },
                data: {
                    param: {
                        keyword: `${search}`,
                        pageNum: `${page}`,
                    },
                    comm: {
                        "dmTenantId": 10,
                        "venderId": 12,
                        "storeId": 550989,
                    },
                },
                httpsAgent: agent,
            })
            return searchResponse.data.data.wareList;
        }

        for (let page = 1; page <= totalPages; page++) {
            const productList: Array<ColdStorageProduct> = await fetchPageProductList(page);
            processedPromises.push(productList);
        }

        const pagesList: Array<ColdStorageProduct> = processedPromises.flat();

        pagesList.filter((value) => value).map((value) => {
            const offers: Array<string> | null = 'promotionWareVO' in value && 'promotionInfoList' in value.promotionWareVO
                ? value.promotionWareVO.promotionInfoList.map(productInfo => productInfo.displayInfo.proTag)
                : null;
            const url_product_name = stringToURL(value.wareName);

            const product: ProductInfo = {
                name: value.wareName,
                price: Number(value.warePrice),
                images: [value.wareImg],
                offers: offers,
                units: null,
                stock: value.wareStatus === 0,
                url: `https://coldstorage.com.sg/en/p/${url_product_name}/i/${value.sku}.html`,
                shop: "Cold Storage",
            }
            results.push(product)
        })

        return results;
    } catch (error) {
        if (error instanceof Error) {
            return { status: 500, message: "Error occured while fetching Cold Storage data", error: error.message };
        }
        return { status: 500, message: "Unknown error occurred" };
    }
};

export default getColdStorageProductsSlowly;