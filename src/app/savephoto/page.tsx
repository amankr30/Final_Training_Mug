'use client'
import React from 'react';
import Layout from '../component/layout';
import { useSelector } from 'react-redux';
import Card from '../component/card';

interface PhotoItem {
  id: number;
  title: string;
  url: string;
}

const Page = () => {
  const posts: PhotoItem[] = useSelector((state: any) => state.posts);

  return (
    <Layout>
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -m-4">
          {posts.map((item: PhotoItem) => (
            <div key={item.id} className="p-4 w-full md:w-1/3">
              <Card id={item.id} url={item.url} title={item.title} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
