'use client'
import React from 'react';
import Layout from '../component/layout';
import { useSelector } from 'react-redux';
import Postcard from '../component/postcard';

interface PhotoItem {
  id: number;
  title: string;
  body: string;
}

const Page = () => {
  const posts: PhotoItem[] = useSelector((state: any) => state.texts);

  return (
    <Layout>
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -m-4">
          {posts.map((item: PhotoItem) => (
            <div key={item.id} className="p-4 w-full md:w-1/3">
              <Postcard id={item.id}  title={item.title} body={item.body} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
