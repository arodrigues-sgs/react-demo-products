import './App.css'
import { useState } from 'react';
import getProductsByCategory from './service/products-service';

function App() {
  return <FilterableProductTable productsByCategory={getProductsByCategory()}/>
}

function FilterableProductTable({ productsByCategory }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

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
        inStockOnly={inStockOnly} />
    </div>
  );
}

function SearchBar({ filterText, inStockOnly, onChangeFilterText, onChangeInStockOnly }) {
  return (
    <form>
      <input 
        type="text"
        value={filterText} 
        onChange={(e) => onChangeFilterText(e.target.value)}
        placeholder='Search ...' />
      <br />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly}
          onChange={(e) => onChangeInStockOnly(e.target.checked)} />
          Only show products in stock
      </label>
    </form>
  );
}

function ProductTable({ productsByCategory, filterText, inStockOnly } ) {
  const rowsToDisplay = [];

  const matchesFilterText = (product, text) => product.name.toLowerCase().indexOf(text.toLowerCase()) !== -1;

  productsByCategory.forEach((productsOfCategory, category) => {
    // filter out only products that match our stateful filters (filterText, inStockOnly)
    const productRowsToDisplay = productsOfCategory
      .filter(p => matchesFilterText(p, filterText) && (!inStockOnly || p.stocked))
      .map(p => <ProductRow product={p} key={p.name} />);
    
    // if there are not any product rows to display for this category, we will skip to the next
    if(productRowsToDisplay.length === 0) return;
    
    rowsToDisplay.push(<CategoryRow category={category} key={category} />);
    rowsToDisplay.push(...productRowsToDisplay);
  });
  
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rowsToDisplay}
      </tbody>
    </table>
  );
}

function CategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  return (
    <tr className={!product.stocked ? "out-of-stock" : ""}>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

export default App
