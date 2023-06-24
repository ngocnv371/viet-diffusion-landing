import React, { PureComponent } from 'react';

import GalleryWrapper from '../components/gallery2/GalleryWrapper';

const persons = new Array(50)
  .fill(true)
  .map(() => ({ name: `Jake ${Math.random()}` }))
  .sort((a, b) => a.name.localeCompare(b.name));

class Page2 extends PureComponent<
  {},
  {
    hasNextPage: boolean;
    isNextPageLoading: boolean;
    sortOrder: string;
    items: any[];
  }
> {
  state = {
    hasNextPage: true,
    isNextPageLoading: false,
    sortOrder: 'asc',
    items: [],
  };

  loadNextPage = (startIndex: number, stopIndex: number) => {
    this.setState({ isNextPageLoading: true }, () => {
      setTimeout(() => {
        this.setState((state) => ({
          hasNextPage: state.items.length < 100,
          isNextPageLoading: false,
          items: [...state.items].concat(
            persons.slice(startIndex, stopIndex + 10)
          ),
        }));
      }, 2500);
    });
  };

  handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    persons.sort((a, b) => {
      if (e.target.value === 'asc') {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
    this.setState({
      sortOrder: e.target.value,
      items: [],
    });
  };

  render() {
    const { hasNextPage, isNextPageLoading, items, sortOrder } = this.state;
    return (
      <>
        <p className="Note">
          This demo app shows how to create a list that automatically loads the
          next page of data when a user scrolls close to the end of the list.
        </p>
        <select onChange={this.handleSortOrderChange}>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
        <GalleryWrapper
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          items={items}
          sortOrder={sortOrder}
          loadNextPage={this.loadNextPage}
        />

        <p className="Note">
          Check out the documentation to learn more:
          <br />
          <a href="https://github.com/bvaughn/react-window-infinite-loader#documentation">
            github.com/bvaughn/react-window-infinite-loader
          </a>
        </p>
      </>
    );
  }
}

export default Page2;
