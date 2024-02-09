'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../component/layout'
import Postcard from "../component/postcard"
import SearchBar from "../component/searchbar"

interface PostItem
{
    albumId: number;
    id: number;
    title: string;
    body: string;
}

const Post = () => {
// Fetching data using axios
const [posts, setPosts] = useState<PostItem[]>([]);
const [currentpage, setCurrentPage]=useState<number>(1);
const itemsPerPage =20;

const getPosts = async () => {
  try {
    const res = await axios.get(" https://jsonplaceholder.typicode.com/posts");
    setPosts(res.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getPosts();
}, []);



// Logic to calculate the index of the first and last item to display on the current page
const indexOfLastItem = currentpage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

// Function to handle pagination for the next page
const nextPage = () => {
  if (currentpage < Math.ceil(posts.length / itemsPerPage)) {
    setCurrentPage(currentpage + 1);
  }
};

// Function to handle pagination for the previous page
const prevPage = () => {
  if (currentpage > 1) {
    setCurrentPage(currentpage - 1);
  }
};

const handleSearch = async (query: string) => {
  try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${query}`);
      const data = await response.json();
      setPosts(data);
  } catch (error) {
      console.error('Error searching posts:', error);
  }
};

return (
    <Layout>
      <SearchBar onSearch={handleSearch} />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -mx-4 -mb-10 text-center">
            {currentPosts.map((item: PostItem) => (
              <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-4 mb-10">
                <Postcard title={item.title} body={item.body} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {/* Previous button */}
            <button onClick={prevPage} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
              Previous
            </button>
            {/* Display current page number */}
            <span className="text-gray-800 px-4 py-2 flex items-center justify-center rounded-xl bg-slate-300 ">{currentpage}</span>
            {/* Next button */}
            <button onClick={nextPage} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
              Next
            </button>
          </div>
        </div>
      </section>
    </Layout>
  )
  
}

export default Post