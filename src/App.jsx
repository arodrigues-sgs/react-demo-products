import './App.css'
import ProductTable from './components/ProductTable';
import SearchBar from './components/SearchBar';
import NewProductForm from './components/NewProductForm'
import * as productService from './service/product-service';
import { useState } from 'react';

function App() {
  return <FilterableProductTable/>
}

function FilterableProductTable() {
  const [productsByCategory, setProductsByCategory] = useState(productService.getProductsByCategory());
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  function handleAddProduct(product) {
    try {
      // attempt to update the DB
      productService.saveProduct(product); 
      // if successful, we update state to tell React to re-render
      setProductsByCategory(productService.getProductsByCategory()); // we re-fetch since it's quick, but there are better ways to do this
    } catch(error) {
      alert(`Could not add product: ${product.name}. ${error.message}`);
    } 
  }

  function handleEditProduct(product) {
    // TODO
  }

  function handleDeleteProduct(product) {
    try {
      // attempt to delete the product from the DB
      productService.deleteProduct(product);
      // if successful, we update state to tell React to re-render
      setProductsByCategory(productService.getProductsByCategory());
    } catch(error) {
      alert(`Could not delete product: ${product.name}`);
    }
  }

  return (
    <div> 
      <SearchBar 
        filterText={filterText}
        inStockOnly={inStockOnly}
        onChangeFilterText={setFilterText}
        onChangeInStockOnly={setInStockOnly}
        />
      <ProductTable 
        productsByCategory={productsByCategory} 
        filterText={filterText}
        inStockOnly={inStockOnly}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct} />
      <NewProductForm 
        categories={[...productsByCategory.keys()]}
        onAddProduct={handleAddProduct}/>
    </div>
  );
}

export default App
