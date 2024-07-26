export type FairPriceProduct = {
    name: string,
    final_price: number,
    images: Array<string>,
    offers: Array<{description: string}>,
    metaData: ProductMetaData,
    storeSpecificData: Array<{inStoreStock: number}>,
    slug: string,
}

type ProductMetaData = {
	DisplayUnit: string,
	"Unit Of Measurement": string,
	"Unit Of Weight": string,
	Weight: string,
}