import PRODUCTS from "../data/products.json";

export default function getProductsByCategory() {
    const productsByCategory = new Map();
    for(const p of PRODUCTS) {
        if(productsByCategory.has(p.category)) {
            productsByCategory.get(p.category).push(p);
        } else {
            productsByCategory.set(p.category, [p]);
        }
    }
    return productsByCategory;
}
