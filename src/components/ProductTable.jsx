function CategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product, onEditProduct, onDeleteProduct }) {
  return (
    <tr className={!product.stocked ? "out-of-stock" : ""}>
      <td>{product.name}</td>
      <td>${product.price}</td>
      <td><button onClick={() => onDeleteProduct(product)}>Delete</button></td>
    </tr>
  );
}

export default function ProductTable(
  { 
    productsByCategory, 
    filterText, 
    inStockOnly,
    onEditProduct,
    onDeleteProduct 
  } ) {
  const rows = [];
  const isMatch = (product, searchText) => product.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;

  productsByCategory.forEach((productsOfCategory, category) => {
    const productRows = [...productsOfCategory]
      .filter(p => (!inStockOnly || p.stocked) && isMatch(p, filterText))
      .map(p => {
      return <ProductRow 
        product={p} 
        onEditProduct={onEditProduct}
        onDeleteProduct={onDeleteProduct}
        key={p.name} />
    });

    // only push a category row if there are product rows to show for that category
    if (productRows.length > 0) rows.push( <CategoryRow category={category} key={category} /> );

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

