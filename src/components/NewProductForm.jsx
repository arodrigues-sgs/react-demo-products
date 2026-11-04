import { useState } from "react";
import "../App.css"

const INITIAL_PRODUCT = {
    name: "",
    price: "",
    category: "",
    stocked: false,
}

export default function NewProductForm({ categories, onAddProduct }) {
    const [product, setProduct] = useState(INITIAL_PRODUCT);
    const [errors, setErrors] = useState({});

    function validateInput(product) {
        const inputErrors = {};
        
        if(!product.name) inputErrors.name = "Product name cannot be blank";
        
        const priceAsFloat = parseFloat(product.price);
        if(isNaN(priceAsFloat)) inputErrors.price = "Price must be a number";

        setErrors(inputErrors);
        return Object.keys(inputErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!validateInput(product)) return;
        product.price = parseFloat(product.price).toFixed(2); // round to 2 decimal places
        onAddProduct(product);
        setProduct(INITIAL_PRODUCT); // reset form
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <form 
            className="form-layout" 
            onSubmit={handleSubmit}>
            <label>
                Product Name:
                <br />
                <input 
                    type="text" 
                    name="name"
                    value={product.name}
                    placeholder="Enter a new product ..."
                    required
                    onChange={handleChange} />
                {errors.name && <span className="error-text">{errors.name}</span>}
            </label>
            <label>
                Price ($):
                <br />
                <input 
                    type="text"
                    name="price"
                    value={product.price} 
                    required
                    onChange={handleChange} />
                {errors.price && <span className="error-text">{errors.price}</span>}
            </label>
            <label>
                Category:
                <br />
                <select 
                    name="category"
                    value={product.category}
                    required
                    onChange={handleChange}>
                    <option value="" key={"empty"}>--Select a category--</option>
                    {categories.map(c => <option value={c} key={c}>{c}</option>)}
                </select>
            </label>
            <label>
                <input 
                    type="checkbox"
                    name="stocked"
                    checked={product.stocked}
                    onChange={handleChange}
                    />
                    Stocked?
            </label>
            <button type="submit">Add Product</button>
        </form>
    );
}