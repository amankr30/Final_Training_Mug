import React, { useState } from 'react';

import SearchBar from './searchbar'; // Import SearchBar component
import Link from 'next/link';

const Header: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <>
    <header>
    <div className="bg-slate-600 text-white border-gray-200 px-4 py-3 lg:px-6 darkpy-2.5  :bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap  :text-white">TrainingMug</span>
            </a>

            {/* <SearchBar onSearch={handleSearch} /> */}
            {/* searchbar start */}


            <SearchBar onSearch={onSearch} />
  






            {/* searchbar enbd  */}
            
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <a href="/photos" className="block py-2 pr-4 pl-3  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0  :text-white" aria-current="page">Photos</a>
                    </li>
                    <li>
                        <a href="/savephoto" className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0  :text-gray-400 lg: :hover:text-white  :hover:bg-gray-700  :hover:text-white lg: :hover:bg-transparent  :border-gray-700">Saved Photos</a>
                    </li>
                    <li>
                        <a href="/posts" className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0  :text-gray-400 lg: :hover:text-white  :hover:bg-gray-700  :hover:text-white lg: :hover:bg-transparent  :border-gray-700">Posts</a>
                    </li>
                    <li>
                        <a href="/savepost" className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0  :text-gray-400 lg: :hover:text-white  :hover:bg-gray-700  :hover:text-white lg: :hover:bg-transparent  :border-gray-700">Saved Post</a>
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
</header>
    </>
  );
};

export default Header;