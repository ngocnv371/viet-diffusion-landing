import React from 'react';

import Link from 'next/link';

import { ImageList } from '../components/gallery/community-gallery';
import Orders from '../components/gallery/orders';
import SearchBox from '../components/gallery/searchbox';
import config from '../config/index.json';

const GalleryPage = () => {
  const { company } = config;
  const { logo, name: companyName } = company;

  return (
    <div className={`bg-background grid gap-y-8 overflow-hidden`}>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav
          className="relative flex items-center justify-between sm:h-10 lg:justify-start"
          aria-label="Global"
        >
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/">
                <span className="link cursor-pointer">
                  <span className="sr-only">{companyName}</span>
                  <img alt="logo" className="h-16 w-auto sm:h-16" src={logo} />
                </span>
              </Link>
              <SearchBox />
              <Orders />
            </div>
          </div>
        </nav>
      </div>
      <ImageList />
    </div>
  );
};

export default GalleryPage;
