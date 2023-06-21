import React, { FC, useCallback } from 'react';

import { SearchIcon } from '@heroicons/react/outline';
import { debounce } from 'lodash';

import { useCommunityImagesFilter } from './hooks';

const SearchBox: FC = () => {
  const [state, setQuery] = useCommunityImagesFilter();

  const handleChange = useCallback(
    debounce((keyword: string) => {
      setQuery(keyword);
    }, 500),
    []
  );

  return (
    <div className="ml-2">
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">
            <SearchIcon className="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
        <input
          type="search"
          name="query"
          id="query"
          autoComplete="query"
          defaultValue={state.query}
          onChange={(e) => handleChange(e.currentTarget.value)}
          className="block w-full rounded-md border-0 py-1.5 pl-10 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Tìm kiếm..."
        />
      </div>
    </div>
  );
};

export default SearchBox;
