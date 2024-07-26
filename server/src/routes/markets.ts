import express, { Request, Response } from 'express';
import { IError, MarketResults, ProductInfo } from './markets.type';
import getFairPriceProducts from './fairprice/fairprice'
import getColdStorageProducts from './coldstorage/coldstorage';
import getFairPriceProductsSlowly from './fairprice/fairpriceSlow';
import getColdStorageProductsSlowly from './coldstorage/coldstorageSlow';
import {getShengSiongProducts, getShengSiongImage} from './shengsiong/shengsiong';

const router = express.Router();

const marketOrder = ['FairPrice', 'Cold Storage', 'Sheng Siong']

router.get("/", async (req: Request, res: Response) => {
    try {
        const search = req.query.search as string ?? "";
        const postalCode = req.query.pin as string ?? "528523";

        const promisesList: Array<Promise<Array<ProductInfo> | IError>> = []
        const results: MarketResults = {}
        
        promisesList.push(getFairPriceProducts(search, postalCode));
        promisesList.push(getColdStorageProducts(search));
        promisesList.push(getShengSiongProducts(search)); // images is imgKey, need to retrieve image with lazy loading!!!
        //res.json(await getCheersProducts(search));
        // 7 Eleven next?
        // Giant if can find products

        const processedPromises: Array<Array<ProductInfo> | IError> = (await Promise.all(promisesList));

        for (let i = 0; i < processedPromises.length; i++) {
            results[marketOrder[i]] = processedPromises[i];
        }
        res.json(results)
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({message: "Error occured", error: error.message});
        }
    }
})

router.get("/shengshiong/img/:key", async (req: Request, res, Response) => {
    try {
        const key: string = req.params.key;
        const response = await getShengSiongImage(key);
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(Buffer.from(response.data, 'binary'));
        // console.log(response.data)
        // console.log(URL.createObjectURL(new Blob([response.data])))
        // res.json(URL.createObjectURL(new Blob([response.data])));
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({message: "Error occured", error: error.message});
        }
    }
})

module.exports = router;