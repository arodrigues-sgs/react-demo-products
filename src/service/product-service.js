import SEED_PRODUCTS from "../data/products.json"

const STORAGE_KEY = "mock_products_db";

function getProducts() {
    const data = localStorage.getItem(STORAGE_KEY);
    if(!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PRODUCTS));
        return SEED_PRODUCTS;
    }
    return JSON.parse(data);
}

function organizeByCategory(products) {
    const productsByCategory = new Map();
    for (const product of products) {
        if(productsByCategory.has(product.category)) {
            productsByCategory.get(product.category).push(product);
        } else {
            productsByCategory.set(product.category, [product])
        }
    }
    return productsByCategory;
}   

export function getProductsByCategory() {
    return organizeByCategory(getProducts());
}

export function saveProduct(product) {
    const existingProducts = getProducts();
    if(existingProducts.find(p => p.name === product.name)) throw new Error("Cannot have duplicate product name");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingProducts, product]));
    return product;
} 

export function deleteProduct(product) {
    const existingProducts = getProducts();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingProducts.filter(p => p.name !== product.name)]));
    return product;
}
