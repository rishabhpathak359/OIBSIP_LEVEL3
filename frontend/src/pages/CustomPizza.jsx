import React, { useState } from 'react';
import { Inventory } from '../data/pizzaInventory';
import {toast} from "react-hot-toast"
import { useSelector, useDispatch } from 'react-redux';
import { inventoryItems, updateInventory } from '../utils/inventorySlice';
import { addorder } from '../utils/orderSlice';
import { selectUser } from '../utils/userSlice';
const CustomPizza = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  const inventory = useSelector(inventoryItems);
  const user = useSelector(selectUser);
  const {_id} =  user.users[0];
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
  const handleSelection = (category, option) => {
    const existingItemIndex = selectedItems?.findIndex(
      (item) => item.option === option && item.category === category
    );
  
    const selectedItem = inventory[category].find((item) => item.name === option);
  
    if (existingItemIndex !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += 1;
      updatedItems[existingItemIndex].price =
        updatedItems[existingItemIndex].quantity * selectedItem.price;
      setSelectedItems(updatedItems);
      toast.success(`Selected ${option} from ${category}`);
      const updatedInventory = {
        ...inventory,
        [category]: inventory[category].map((item) =>
          item.name === option ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
      dispatch(updateInventory({ updatedInventory, itemUpdated: selectedItem }));
    } else {
      if (selectedItem.quantity > 0) {
        const updatedCategoryData = inventory[category].map((item) =>
          item.name === option ? { ...item, quantity: item.quantity - 1 } : item
        );
  
        dispatch(updateInventory({
          updatedInventory: { ...inventory, [category]: updatedCategoryData },
          itemUpdated: selectedItem,
        }));
  
        setSelectedItems((prevItems) => [
          ...prevItems,
          { category, option, price: selectedItem.price, quantity: 1 },
        ]);
        toast.success(`Selected ${option} from ${category}`);
      } else {
        toast.error(`${option} is out of stock`);
      }
    }
  };
  
  
  const handleRemoveItem = (index) => {
    const removedItem = selectedItems[index];
  
    const updatedItems = [...selectedItems.slice(0, index), ...selectedItems.slice(index + 1)];
    setSelectedItems(updatedItems);
  
    const updatedCategoryData = inventory[removedItem.category].map((item) =>
      item.name === removedItem.option ? { ...item, quantity: item.quantity + 1 } : item
    );
  
    dispatch(updateInventory({
      ...inventory,
      [removedItem.category]: updatedCategoryData,
    }));
  };
  

  const calculateTotalAmount = () => {
    let total = 0;
    for (const item of selectedItems) {
      total += item.price ;
    }
    return total ;
  };
   
  
  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:3000/payment/initiate', {
        method: 'POST',
        body: JSON.stringify({ totalAmount: calculateTotalAmount() }),
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
            amount: calculateTotalAmount()*100, 
            currency: 'INR',
            name: 'Rishabh Pathak',
            description: `${selectedItems ? selectedItems.map((item) => item.option).join(', ') : ''}`,
            order_id: order_id,
            handler: function (response) {
              console.log(response);
              capturePayment(response.razorpay_payment_id, calculateTotalAmount()*100);
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
       setSelectedItems(null)
       dispatch(addorder({_id, ...capturedPaymentData})) ;
       console.log(capturedPaymentData);
       console.log(capturedPaymentData.amount);
        toast.success(`Payment Captured:₹${capturedPaymentData.amount/100}`);
      } else {
        toast.error('Failed to capture payment:', response.status);
      }
    } catch (error) {
      toast.error('Error capturing payment:', error);
    }
  };


  return (
    <div className='pt-20 px-8'>
       {/* Displaying available items */}
       <div className='mb-8'>
        <h2 className='text-3xl mb-4'>Create Your Custom Pizza</h2>
        <div className='grid grid-cols-1 gap-4 '>
          {Object.entries(inventory).map(([category, items]) => (
            <div key={category}>
              <h3 className='text-xl mb-2'>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              {items.map((item, index) => (
                    <button
                      key={index}
                      className={`${getCategoryColor(category)} text-white font-bold py-2 px-4 mx-2 rounded mt-5 md:mt-0`}
                      onClick={() => handleSelection(category, item.name)}
                      disabled={item.quantity === 0}
                    >
                      {item.name} - ₹{item.price} ({item.quantity} available)
                    </button>
                  ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Displaying user selections */}
      <div className='mt-8'>
        <h2 className='text-2xl mb-4'>Your Selections:</h2>
        <div className='grid md:grid-cols-6 grid-cols-1 gap-4'>
          {selectedItems?.map((item, index) => (
            <div key={index} className='border p-4 rounded shadow'>
              <p>{item.category}</p>
              <p>{item.option}</p>
              <p>₹{item.price}</p>
              <button onClick={() => handleRemoveItem(index)} className='mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded'>
                Remove Item
              </button>
            </div>
          ))}
        </div>
        {selectedItems?.length > 0 && (
          <button onClick={handleCheckout} className='mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'>
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomPizza;
