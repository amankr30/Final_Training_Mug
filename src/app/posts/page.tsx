'use client'
import React from 'react'
import Layout from "../component/layout";
import Postcard from '../component/postcard'
import { useEffect, useState } from "react";
import axios from "axios";

import Searchbar from "../component/searchbar";

interface PostsItem {
  albumId: number;
  id: number;
  title: string;
  body: string;
}



const Post = () => {

  const [posts, setPosts] = useState<PostsItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20; // Change this to adjust the number of items per page

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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle pagination for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(posts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle pagination for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Layout>
      <section className=" body-font bg-slate-200 text-black">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-wrap m-4">
          {currentPosts.map((item) => (
              <div key={item.id} className="p-4 w-full md:w-1/3">
                <Postcard id={item.id} title={item.title} body={item.body} />
              </div>
            ))}            
            </div>
            <div className="flex justify-between mt-4">
            {/* Previous button */}
            <button onClick={prevPage} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
              Previous
            </button>
            {/* Display current page number */}
            <span className="text-gray-800 px-4 py-2 flex items-center justify-center rounded-xl bg-slate-300 ">{currentPage}</span>
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