import { useEffect, useState } from 'react';

import {
  RecoilState,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import { getImages } from './api';
import { accessTokenState, listFilterState, listState } from './atom';
import { ListFilter, Paged } from './model';

function usePagedList<T extends { id: number | string }>(
  filterStore: RecoilState<ListFilter>,
  dataStore: RecoilState<Paged<T>>,
  api: (args: any) => Promise<Paged<T>>,
  onError: (msg: string) => void
): [state: Paged<T>, getMore: () => any, refresh: (query: string) => any] {
  const accessToken = useRecoilValue(accessTokenState);
  const [filter, setFilter] = useRecoilState(filterStore);
  const [state, setState] = useRecoilState(dataStore);

  const { order, query, limit, offset, mode } = filter;

  function setLoading(loading: boolean) {
    setState((o) => ({ ...o, loading }));
  }

  function setOffset(value: number) {
    setFilter((o) => ({ ...o, offset: value }));
  }

  function setHasMore(hasMore: boolean) {
    setState((o) => ({ ...o, hasMore }));
  }

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await api({
          accessToken,
          query,
          order,
          limit,
          offset,
          mode,
        });
        setLoading(false);
        setState((old) => ({
          ...old,
          ...data,
          items: old.items.concat(
            data.items.filter((k) => !old.items.some((x) => x.id === k.id))
          ),
        }));
        if (data.items.length < state.limit) {
          setHasMore(false);
        }
      } catch (e) {
        onError('Không tải được danh sách, vui lòng thử lại sau');
      }
    }

    if (
      offset === state.offset &&
      order === state.order &&
      query === state.query &&
      mode === state.mode &&
      state.items.length
    ) {
      return;
    }

    load();
  }, [offset, order, query, mode]);

  function fetchMore() {
    if (state.loading) {
      return;
    }

    const newOffset = offset + state.limit;
    setOffset(newOffset);
  }

  function refresh(newQuery: string) {
    setState((o) => ({ ...o, offset: 0, items: [], hasMore: true }));
    setFilter((o) => ({ ...o, offset: 0, query: newQuery }));
  }

  return [state, fetchMore, refresh];
}

export function useCommunityImages(onError: (msg: string) => void) {
  const filter = listFilterState('community-images');
  const store = listState('community-images');
  return usePagedList(filter, store, getImages, onError);
}

export function useScrollToTop() {
  return () => document.querySelector('#scroll-container')?.scrollTo(0, 0);
}

export function useCommunityImagesFilter(): [
  filter: ListFilter,
  setQuery: (keyword: string) => void,
  setOrder: (order: string) => void,
  setMode: (mode: string) => void
] {
  const scroll = useScrollToTop();
  const [filter, setFilter] = useRecoilState(
    listFilterState('community-images')
  );
  const store = listState('community-images');
  const setState = useSetRecoilState(store);
  return [
    filter,
    (keyword: string) => {
      setFilter((f) => ({ ...f, query: keyword, offset: 0 }));
      setState((s) => ({ ...s, items: [], hasMore: true }));
      scroll();
    },
    (order: string) => {
      setFilter((f) => ({ ...f, order, mode: '', offset: 0 }));
      setState((s) => ({ ...s, items: [], hasMore: true }));
      scroll();
    },
    (mode: string) => {
      setFilter((f) => ({ ...f, mode, offset: 0 }));
      setState((s) => ({ ...s, items: [], hasMore: true }));
      scroll();
    },
  ];
}

export const useWindowWidth = () => {
  const [width, setWidth] = useState(0); // default width, detect on server.
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  return width;
};
