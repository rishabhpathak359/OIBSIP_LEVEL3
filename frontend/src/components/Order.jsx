import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserOrder, clearorder } from '../utils/orderSlice';
import { selectUser } from '../utils/userSlice';

const OrderPage = () => {
  const orders = useSelector(UserOrder);
  const user = useSelector(selectUser);
  const userId = user && user.users && user.users[0] ? user.users[0]._id : null;
  const dispatch = useDispatch();

  const calculateMinutes = (deliveryTime) => {
    const orderTime = new Date(deliveryTime);
    const minutes = orderTime.getMinutes();
    return minutes;
  };

  const handleClearOrder = () => {
    dispatch(clearorder({ userId }));
  };

  return (
    <div className="pt-28 px-5">
        <h2 className="text-3xl mb-4 font-bold">Your Orders</h2>
      {orders[userId]?.length > 0 ? (
        <>
          {orders[userId]?.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-md shadow-md mb-4">
              <p className="text-lg font-bold">Order ID: {order.id}</p>
              <p className="text-lg font-semibold">Amount: ₹{order.amount/100}</p>
              <p>Items: {order.description}</p>
              <p>Order Approval: <span className={`${order.order_status === 'Confirmed' ? "text-green-500" : "text-red-500"}`}>{order.order_status}</span></p>
              <p>Delivery Time: {order.deliveryTime ? `${calculateMinutes(order.deliveryTime)} minutes` : 'Not available'}</p>
            </div>
          ))}
          <button
            onClick={handleClearOrder}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            Clear Order
          </button>
        </>
      ) : (
        <p>You can track your orders here</p>
      )}
    </div>
  );
};

export default OrderPage;
