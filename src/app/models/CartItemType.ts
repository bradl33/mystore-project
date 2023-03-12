import { ProductType } from "./ProductType";

export interface CartItemType {
    product: ProductType;
    totalPrice: number;
}