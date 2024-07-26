export type SideBarProp = {
    checkSuperMarket: {[shop: string]: boolean},
    setCheckSuperMarket: React.Dispatch<React.SetStateAction<{[shop: string]: boolean}>>,
}