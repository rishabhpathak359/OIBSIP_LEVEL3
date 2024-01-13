import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inventoryItems, updateInventory } from '../utils/inventorySlice';
import { UserOrder, updateorder } from '../utils/orderSlice';
import toast from 'react-hot-toast';

const Admin = () => {
  const inventory = useSelector(inventoryItems);
  const orders = useSelector(UserOrder);
  const dispatch = useDispatch();

  const getCategoryColor = (category) => {
    switch (category) {
      case 'bases':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'sauces':
        return 'bg-red-500 hover:bg-red-600';
      case 'cheese':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'veggies':
        return 'bg-pink-500 hover:bg-pink-600';
      default:
        return 'bg-pink-500 hover:bg-green-600';
    }
  };

  const handleApproveOrder = (userId, orderId) => {
    try {
      dispatch(updateorder({ userId, orderId, order_status: 'Confirmed', deliveryTime: new Date() }));
      toast.success("Order Approved");
    } catch (error) {
      toast.error("Error Approving Order:", error);
    }
  };
  const handleIncrement = (category, itemName) => {
    const updatedInventory = {
      ...inventory,
      [category]: inventory[category].map((item) =>
        item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
      ),
    };
    dispatch(updateInventory(updatedInventory));
  };
  

  return (
    <div className="pt-28 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(inventory).map(([category, items]) => (
          <div key={category} className="mb-8 relative">
            <h3 className="text-2xl mb-2 font-bold">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            {items.map((item, index) => (
              <div key={index} className="relative mb-2">
                <button
                  className={`w-full ${getCategoryColor(category)} text-white md:text-xl font-bold py-2 md:px-4 px-10 rounded ${
                    item.quantity === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
                  }`}
                  disabled={item.quantity === 0}
                >
                  {item.name} ({item.quantity} available)
                </button>
                <button
                  onClick={() => handleIncrement(category, item.name)}
                  className="absolute md:top-1 top:3 right-0 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  +
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-8">
        {Object.keys(orders).map((userId) => (
          <div key={userId} className="mb-8">
            <h3 className="text-xl font-bold mb-2">User ID: {userId}</h3>
            {orders[userId]?.map((order) => (
              <div key={order.id} className="bg-white p-4 rounded-md shadow-md mb-4">
                <p className="text-lg font-bold">Order ID: {order.id}</p>
                <p className="text-lg font-semibold">Amount : ₹{order.amount/100}</p>
                <p>Items: {order.description}</p>
                <p>Amount Status: {order.status}</p>
                {/* <p>
                  Delivery Time: {deliveryTime}
                </p> */}
                {order.status !== 'approved' && (
                  <button
                    onClick={() => handleApproveOrder(userId, order.id)}
                    className={`mt-2 ${order.order_status =="Confirmed"? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} text-white px-3 py-1 rounded-md `}
                  >
                   {order.order_status =="Confirmed" ? 'Approved' : 'Approve Order'}
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
