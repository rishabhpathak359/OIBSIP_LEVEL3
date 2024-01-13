import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { additem, removeitem } from '../utils/cartSlice';
import { selectUser } from '../utils/userSlice';

const PizzaCard = ({ pizza, fromCart, quantity }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const {_id} =  user.users[0];
  console.log(_id)
  const [quantityValue, setQuantityValue] = useState(quantity || 1);
   const pizzaPrice =pizza.price*quantityValue*10 ;
   const handleAddToCart = () => {
    toast.success(`Added ${pizza.name} to cart`);
    dispatch(additem({ _id, ...pizza, quantity: quantityValue }));
  };
  const handleCheckOut = async () => {
    try {
      const response = await fetch('http://localhost:3000/payment/initiate', {
        method: 'POST',
        body: JSON.stringify({ totalAmount:pizzaPrice}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const { order_id } = await response.json();

        // Loading the Razorpay library script dynamically
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        document.body.appendChild(script);

        script.onload = () => {
          const options = {
            key: 'rzp_test_jIa5H7VXBb97vw',
            amount: pizzaPrice*100, 
            currency: 'INR',
            name: 'Rishabh Pathak',
            description: `Payment for ${quantityValue} ${pizza.size} sized ${pizza.name} pizza`,
            order_id: order_id,
            handler: function (response) {
              console.log(response);
              capturePayment(response.razorpay_payment_id,pizzaPrice*100 );
            },
            prefill: {
              name: 'Customer Name',
              email: 'customer@example.com',
              contact: '9999999999',
            },
            notes: {
              address: 'Customer Address',
            },
            theme: {
              color: '#F37254',
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        };
      } else {
        toast.error('Failed to initiate payment:', response.status);
      }
    } catch (error) {
      toast.error('Error initiating payment:', error);
    }
  };

  const capturePayment = async (paymentId, amount) => {
    try {
      const response = await fetch('http://localhost:3000/payment/capture', {
        method: 'POST',
        body: JSON.stringify({ paymentId, amount }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const capturedPayment = await response.json();
       const capturedPaymentData = await capturedPayment;
       dispatch(removeitem({ _id, itemName: pizza.name }));
        toast.success(`Payment Captured:₹${capturedPaymentData.amount/100}`);
      } else {
        toast.error('Failed to capture payment:', response.status);
      }
    } catch (error) {
      toast.error('Error capturing payment:', error);
    }
  };

  const handleRemove = () => {
    dispatch(removeitem({ _id, itemName: pizza.name }));
    toast.error('Removed from cart');
  };

  const handleIncrement = () => {
    setQuantityValue((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantityValue > 1) {
      setQuantityValue((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className='max-w-xs mx-1 overflow-hidden bg-white rounded-lg shadow-lg my-2'>
      <img src={pizza.image} alt="pizza" className='w-96 h-48 object-cover object-center' />
      <div className='p-4'>
        <h2 className='text-gray-900 font-bold text-xl mb-2'>{pizza.name}</h2>
        <p className='text-gray-700 text-base mb-2'>{pizza.size}</p>
        <p className='text-gray-700 text-base mb-2'>{pizza.type}</p>
        <p className='text-gray-700 text-base font-bold mb-2'>₹{pizzaPrice}</p>
        <div className='flex items-center justify-between'>
         { fromCart && <div className='flex items-center'>
            <button onClick={handleDecrement} className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-l'>
              -
            </button>
            <span className='bg-gray-200 px-3 py-1'>{quantityValue}</span>
            <button onClick={handleIncrement} className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-r'>
              +
            </button>
          </div>}
         {!fromCart ? <button onClick={handleAddToCart} className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'>
            Add to Cart
          </button> 
          :
          <div className='flex px-2'>
          <button onClick={handleCheckOut} className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2'>
            Checkout
          </button>
          <button onClick={handleRemove} className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded'>
            Remove
          </button>
        </div>
          }
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
