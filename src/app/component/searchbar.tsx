import { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // Example: Fetch suggestions from an API based on the input query

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

 

 

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="bg-slate-700 text-white border border-gray-500 px-5 py-2 w-[25rem] rounded-md focus:outline-none "
        placeholder="Search..."
      />
      <button type="submit" className="absolute right-0 top-0 bg-cyan-800 text-white px-3 py-2 rounded-md">
        Search
      </button>
      
    </form>
  );
};

export default SearchBar;