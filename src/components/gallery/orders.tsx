import React, { FC } from 'react';

import { useCommunityImagesFilter } from './hooks';

interface OrderButtonProps {
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

const OrderButton: FC<React.PropsWithChildren<OrderButtonProps>> = ({
  className,
  active,
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`ring-1 ring-inset ring-gray-300 py-1 px-2 inline-flex relative text-sm font-semibold hover:bg-gray-100 ${className} ${
        active ? 'active' : ''
      }`}
    >
      {children}
    </button>
  );
};

const Orders: FC = () => {
  const [, , setOrder, setMode] = useCommunityImagesFilter();

  function onOrderUpdated(e: string) {
    if (e === 'liked') {
      setMode(e);
    } else {
      setOrder(e);
    }
  }

  return (
    <span className="inline-flex isolate ml-2">
      <OrderButton
        onClick={() => onOrderUpdated('trending')}
        className="rounded-l"
      >
        Trending
      </OrderButton>
      <button
        onClick={() => onOrderUpdated('top')}
        className="ring-1 ring-inset ring-gray-300 py-1 px-2 inline-flex relative text-sm font-semibold hover:bg-gray-100"
      >
        Top
      </button>
      <button
        onClick={() => onOrderUpdated('new')}
        className="ring-1 ring-inset ring-gray-300 py-1 px-2 inline-flex relative text-sm font-semibold hover:bg-gray-100"
      >
        New
      </button>
      <button
        onClick={() => onOrderUpdated('liked')}
        className="ring-1 ring-inset ring-gray-300 py-1 px-2 inline-flex relative text-sm font-semibold hover:bg-gray-100 rounded-r"
      >
        Liked
      </button>
    </span>
  );
};

export default Orders;
