import { atom, atomFamily } from 'recoil';

import { ListFilter, Paged } from './model';

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
});

export const listFilterState = atomFamily<ListFilter, string>({
  key: 'listFilterState',
  default: {
    order: 'new',
    query: '',
    limit: 50,
    offset: 0,
    mode: '',
  },
});

export const listState = atomFamily<Paged<{ id: number | string }>, string>({
  key: 'listState',
  default: {
    mode: '',
    query: '',
    order: 'new',
    limit: 50,
    offset: 0,
    items: [],
    loading: false,
    hasMore: true,
  },
});
