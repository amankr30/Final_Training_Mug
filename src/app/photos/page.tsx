'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../component/layout";
import Card from "../component/card";
import Searchbar from "../component/searchbar";

interface PhotoItem {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Page = () => {
  const [photo, setPhoto] = useState<PhotoItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const itemsPerPage = 20; // Change this to adjust the number of items per page

  const getPhotos = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/photos");
      setPhoto(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  // Logic to calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhotos = photo.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle pagination for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(photo.length / itemsPerPage)) {
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
     
      <section className="text-white body-font bg-slate-300">
        {/* <div className="flex justify-center items-center"><Searchbar /></div> */}
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4 ">
            {currentPhotos.map((item) => (
              <div key={item.id} className="p-4 w-full md:w-1/3 ">
                <Card id={item.id} url={item.url} title={item.title} />
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
  );
};

export default Page;