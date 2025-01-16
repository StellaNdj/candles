import { useState } from "react";
import { search } from "../endpoints";
import { useNavigate } from "react-router-dom";

const CandleSearch = ({closeModal}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  if (!results) return <div>Loading...</div>

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchResults = await search({query});

    if (searchResults) {
      setResults(searchResults);
    }
  }

  const handleProductClick = (productId) => {
    navigate(`/candle/${productId}`);
  }

  return(
    <>
      <div>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search candle names or ingredients"
          className="w-full"
        />
        <button type="submit" onClick={handleSearch}>Search</button>
      </div>
      {results && (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 m-8">
          {results.map((product) =>
            <div key={product.id} onClick={() => handleProductClick(product.id)} className="cursor-pointer">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
            </div>
          )}
        </div>
      )}
    </>
  )

}

export default CandleSearch;
