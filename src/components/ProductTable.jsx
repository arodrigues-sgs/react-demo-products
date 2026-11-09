export default function ProductTable(
  { 
    productsByCategory, 
    filterText, 
    inStockOnly,
    onDeleteProduct,
    onEditProduct
  } ) {
  const rowsToDisplay = [];

  const matchesFilterText = (product, text) => product.name.toLowerCase().indexOf(text.toLowerCase()) !== -1;

  productsByCategory.forEach((productsOfCategory, category) => {
    // filter out only products that match our stateful filters (filterText, inStockOnly)
    const productRowsToDisplay = productsOfCategory
      .filter(p => matchesFilterText(p, filterText) && (!inStockOnly || p.stocked))
      .map(p => <ProductRow product={p} key={p.name} onDeleteProduct={onDeleteProduct}/>);
    
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
      <th colSpan="3">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product, onDeleteProduct }) {
  return (
    <tr className={!product.stocked ? "out-of-stock" : ""}>
      <td>{product.name}</td>
      <td>$ {parseFloat(product.price).toFixed(2)}</td>
      <td><button onClick={() => onDeleteProduct(product)}>Delete</button></td>
    </tr>
  );
}