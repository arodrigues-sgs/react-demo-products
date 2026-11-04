import PRODUCTS from "../data/products.json"

export default function getProductsByCategory() {
    const productsByCategory = new Map();
    for (const product of PRODUCTS) {
        if(productsByCategory.has(product.category)) {
            productsByCategory.get(product.category).push(product);
        } else {
            productsByCategory.set(product.category, [product])
        }
    }
    return productsByCategory;
}
