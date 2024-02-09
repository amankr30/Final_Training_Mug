import { useState } from 'react';
import SearchBar from './searchbar';

const SearchPage = () => {
  const [results, setResults] = useState<any[]>([]); // Specify type for results as any[]

  const handleSearch = async (query: string) => { // Explicitly specify type for query as string
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?q=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Search Page</h1>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {results.map((result: any) => ( // Specify type for result as any
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
