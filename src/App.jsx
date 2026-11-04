import './App.css'
import Counter from './Counter';
import getProductsByCategory from './service/product-service';
import { useState } from 'react';

function App() {
  console.log(getProductsByCategory());
  return <FilterableProductTable products={getProductsByCategory()}/>
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
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
        <Counter />
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
  const isMatch = (product, searchText) => product.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;

  products.forEach((productsOfCategory, category) => {
    const productRows = [...productsOfCategory]
      .filter(p => (!inStockOnly || p.stocked) && isMatch(p, filterText))
      .map(p => <ProductRow product={p}/>);

    // only push a category row if there are product rows to show for that category
    if (productRows.length > 0) rows.push( <CategoryRow category={category} /> );

    // push the product rows for that category after the category row
    rows.push(productRows);
  })
    
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
