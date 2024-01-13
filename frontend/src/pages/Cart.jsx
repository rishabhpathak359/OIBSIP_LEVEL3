import React from 'react';
import PizzaCard from '../components/PizzaCard';
import { useSelector, useDispatch } from 'react-redux';
import { clearcart } from '../utils/cartSlice';
import { selectUser } from '../utils/userSlice';

const Cart = () => {
  const user = useSelector(selectUser);
  const userId = user.users[0]._id; 

  const cartItems = useSelector((store) => store.cart.carts[userId]);
  const dispatch = useDispatch();

  const handleEmptyCart = () => {
    dispatch(clearcart({ _id: userId }));
  };

  return (
    <div className='text-black pt-20'>
      <div className='flex justify-center'>
        <h1 className='text-4xl font-bold mt-8 mb-4'>Your Cart</h1>
      </div>
      {cartItems?.length === 0 ? (
        <div className='flex justify-center'>
          <h2 className='text-xl text-gray-600'>Your Cart is empty</h2>
        </div>
      ) : (
        <div className='max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {cartItems?.map((pizza, index) => (
            <PizzaCard key={index} pizza={pizza} fromCart={true} />
          ))}
        </div>
      )}

      {cartItems?.length > 0 && (
        <div className='flex justify-center mt-8'>
          <button
            className='px-6 py-3 bg-red-500 text-white font-bold rounded hover:bg-red-600 focus:outline-none'
            onClick={handleEmptyCart}
          >
            Empty Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
