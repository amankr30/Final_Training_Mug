import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../component/header';
import { LayoutProps } from '../../../.next/types/app/layout';
import Card from "../component/card";
import Postcard from './postcard';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchResultsPosts, setSearchResultsPosts] = useState<any[]>([]);


  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        try {
          const firstWord = searchQuery.split(' ')[0];
      // Encode the first word
      const encodedFirstWord = encodeURIComponent(firstWord);
      const link = `https://jsonplaceholder.typicode.com/photos?q=${encodedFirstWord}`;
      const link2 = `https://jsonplaceholder.typicode.com/posts?q=${searchQuery}`;
      const response = await axios.get(link);
      const res =await axios.get(link2);
      const data = response.data;
      const data2=res.data;
      console.log(searchQuery);
      console.log(link);

      setSearchResults(data);
      setSearchResultsPosts(data2);
      console.log(searchResults);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  // useEffect(() => {
  //   console.log('searchResults updated:', searchResults);
  // }, [searchResults]);

  return (
    <>
      <Header onSearch={handleSearch} />
      <div>
        {searchQuery ? (
          <div>
            <div className="search-results-section ">
              <div className="search-results-header">
                <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
  <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
  <p>Top Search Results for {searchQuery} in Photos</p>
</div>
              </div>
              <div className="search-results-cards flex">
                {searchResults.slice(0, 3).map((item) => (
                  <div key={item.id} className="p-4 w-full md:w-1/3 flex-auto">
                    <Card url={item.url} title={item.title} />
                  </div>
                ))}
              </div>
            </div>
            <br />
            <div className="search-results-section">
            <div className="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3" role="alert">
  <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
  <p>Top Search Results for {searchQuery} in Posts</p>
</div>
              <div className="search-results-cards flex">
                {searchResultsPosts.slice(0, 3).map((item) => (
                  <div key={item.id} className="p-4 w-full md:w-1/3 flex-none">
                    <Postcard title={item.title} body={item.body} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </>
  );
  
};

export default Layout;
