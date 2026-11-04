export default function SearchBar({ filterText, inStockOnly, onChangeFilterText, onChangeInStockOnly }) {
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