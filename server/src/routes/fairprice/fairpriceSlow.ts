import { FairPriceProduct } from './fairprice.type';
import { ProductInfo, IError } from '../markets.type';

const axios = require("axios")

const getFairPriceProductsSlowly = async (search: string, postalCode: string): Promise<Array<ProductInfo> | IError> => {
    try {
        const fairpriceLocationResponse = await axios.request({
            method: "GET",
            url: `https://website-api.omni.fairprice.com.sg/api/serviceable-area?availableStores=true&city=Singapore&orderType=DELIVERY&pincode=${postalCode}`,
        })
        const store = fairpriceLocationResponse.data.data.store
        
        const pagesResponse = await axios.request({
            method: "GET",
            url: `https://website-api.omni.fairprice.com.sg/api/product/v2?algopers=prm-ppb-1%2Cprm-ep-1%2Ct-epds-1%2Ct-ppb-0%2Ct-ep-0&experiments=searchVariant-B%2CtimerVariant-Z%2CsubstitutionBSVariant-B%2Cgv-B%2Cshelflife-B%2Cds-A%2CSDND_delivery_reason-C%2Cls_comsl-B%2Cls_deltime-ogA%2Cls_deltime-feA%2Ccartfiller-a%2Ccatnav-hide%2Ccatbubog-B%2Csbanner-A%2Ccount-b%2Ccam-a%2Cpriceperpiece-b%2Cls_deltime-sortA%2Cpromobanner-c%2Calgopers-b%2Cdlv_pref_mf-B%2Cdelivery_pref_ffs-A%2Cdelivery_pref_pfc-B%2Ccrtalc-B%2Crec-wtyl-ds%2Crec-fbt-ds&includeTagDetails=true&metaData=%5Bobject%20Object%5D&orderType=DELIVERY&pageType=search&query=${search}&storeId=${store.id}&url=${search}`,
        })
        const totalPages = pagesResponse.data.data.pagination.total_pages;

        const processedPromises: Array<Array<FairPriceProduct>> = []
        const results: Array<ProductInfo> = []

        const fetchPageProductList = async (page: number): Promise<Array<FairPriceProduct>> => {
            const searchResponse = await axios.request({
                method: "GET",
                url: `https://website-api.omni.fairprice.com.sg/api/product/v2?algopers=prm-ppb-1%2Cprm-ep-1%2Ct-epds-1%2Ct-ppb-0%2Ct-ep-0&experiments=searchVariant-B%2CtimerVariant-Z%2CsubstitutionBSVariant-B%2Cgv-B%2Cshelflife-B%2Cds-A%2CSDND_delivery_reason-C%2Cls_comsl-B%2Cls_deltime-ogA%2Cls_deltime-feA%2Ccartfiller-a%2Ccatnav-hide%2Ccatbubog-B%2Csbanner-A%2Ccount-b%2Ccam-a%2Cpriceperpiece-b%2Cls_deltime-sortA%2Cpromobanner-c%2Calgopers-b%2Cdlv_pref_mf-B%2Cdelivery_pref_ffs-A%2Cdelivery_pref_pfc-B%2Ccrtalc-B%2Crec-wtyl-ds%2Crec-fbt-ds&includeTagDetails=true&metaData=%5Bobject%20Object%5D&orderType=DELIVERY&page=${page}&pageType=search&query=${search}&storeId=${store.id}&url=${search}`,
            })
            return searchResponse.data.data.product;
        }

        for (let page = 1; page <= totalPages; page++) {
            const productList: Array<FairPriceProduct> = await fetchPageProductList(page);
            processedPromises.push(productList);
        }

        const pagesList = processedPromises.flat()

        pagesList.filter((value) => value).map((value) => {
            const offers: Array<string> | null = 'offers' in value && value.offers ? value.offers.map(offer => offer.description) : null;
            const product: ProductInfo = {
                name: value.name,
                price: value.final_price,
                images: value.images,
                offers: offers,
                units: value.metaData.DisplayUnit,
                stock: value.storeSpecificData[0].inStoreStock > 0,
                url: `https://www.fairprice.com.sg/product/${value.slug}`,
                shop: "FairPrice",
            }
            results.push(product)
        })

        return results;
    } catch (error) {
        if (error instanceof Error) {
            return { status: 500, message: "Error occured while fetching FairPrice data", error: error.message };
        }
        return { status: 500, message: "Unknown error occurred" };
    }
};

export default getFairPriceProductsSlowly;