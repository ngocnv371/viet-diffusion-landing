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
      className={`capitalize ring-1 ring-inset  py-2 px-4 inline-flex relative text-md font-semibold  ${className} ${
        active
          ? 'bg-primary text-white ring-primary'
          : 'ring-gray-300 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
};

const orders = ['trending', 'top', 'new', 'liked'];
const Orders: FC = () => {
  const [filter, , setOrder, setMode] = useCommunityImagesFilter();
  const { order, mode } = filter;
  const selectedOrder = mode || order;

  function onOrderUpdated(e: string) {
    if (e === 'liked') {
      setMode(e);
    } else {
      setOrder(e);
    }
  }

  return (
    <span className="inline-flex isolate ml-2">
      {orders.map((k, idx) => (
        <OrderButton
          key={k}
          onClick={() => onOrderUpdated(k)}
          className={
            (idx === 0 && 'rounded-l') ||
            (idx === orders.length - 1 && 'rounded-r') ||
            ''
          }
          active={k === selectedOrder}
        >
          {k}
        </OrderButton>
      ))}
    </span>
  );
};

export default Orders;
