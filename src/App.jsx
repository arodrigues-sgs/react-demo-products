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
  const [products, setProducts] = useState(productService.getProducts());
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  function handleAddProduct(product) {
    try {
      // or could check for duplicates here before invoking saveProduct
      const saved = productService.saveProduct(product); // attempt to update "DB"
      setProducts( [...products, saved]); // update state
    } catch(error) {
      alert(`Could not add product: ${product.name}. ${error.message}`);
    } 
  }

  function handleEditProduct(product) {
    // TODO
  }

  function handleDeleteProduct(product) {
    try {
      const deleted = productService.deleteProduct(product);
      setProducts([...products.filter(p => p.name !== deleted.name)]);
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
        productsByCategory={productService.organizeByCategory(products)} 
        filterText={filterText}
        inStockOnly={inStockOnly}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct} />
      <NewProductForm 
        categories={[...productService.organizeByCategory(products).keys()]}
        onAddProduct={handleAddProduct}/>
    </div>
  );
}

export default App
