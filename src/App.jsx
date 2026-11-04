import './App.css'
import { useState } from 'react';
import Counter from './Counter';
import getProductsByCategory from './service/products-service';

function App() {
  return <FilterableProductTable products={PRODUCTS}/>
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const myCustomHandler = (someString) => {
    console.log("This is the sring that was passed to me: ", someString);
    setFilterText(someString);
  }

  return (
    <div> 
      <SearchBar 
        filterText={filterText}
        inStockOnly={inStockOnly}
        onChangeFilterText={myCustomHandler}
        onChangeInStockOnly={setInStockOnly}
        />
      <ProductTable 
        products={PRODUCTS} 
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

function ProductTable({ products, filterText, inStockOnly } ) {
  const rows = [];
  let lastCategory = null;

  products.forEach(product => {
    if(product.category !== lastCategory) {
      rows.push(
        <CategoryRow 
          category={product.category} 
          key={product.category} />
      );
    }

    let skip = false;
    // skip over products are not in stock if we want in stock only
    if(inStockOnly && !product.stocked) skip = true;
    // skip if no match to filterText anywhere in the product name
    if(product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) skip = true; 
    
    !skip && rows.push(
      <ProductRow 
        product={product} 
        key={product.name} />
    );

    lastCategory = product.category;
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
        {rows}
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
