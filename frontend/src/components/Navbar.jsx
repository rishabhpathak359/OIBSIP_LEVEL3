import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from '../assets/pizza.svg';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, selectIsUserSignedIn, selectUser } from '../utils/userSlice';
import PrivateRoute from './PrivateRoute';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropVisible, setDropVisible] = useState(false);
  const [signed, setSigned] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isUserSignedIn = useSelector(selectIsUserSignedIn);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    dispatch(removeUser(0));
    setSigned(false);
    navigate('/register');
  };

  useEffect(() => {
    if (isUserSignedIn) {
      setSigned(true);
    }
  }, [isUserSignedIn]);

  return (
    <nav className="fixed z-50 w-full bg-white shadow dark:bg-yellow-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className='flex justify-center items-center'>
                <img
                  className="w-auto h-8 sm:h-12 fill-white"
                  src={logo}
                  alt=""
                />
                <h1 className='text-white text-xl'>Pizzeria</h1>
              </div>
            </Link>
            <div className="flex lg:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 8h16M4 16h16" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={`${isOpen ? 'block translate-x-0 opacity-100 ' : 'hidden opacity-0 -translate-x-full'} absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-yellow-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center `}>
            {signed ? (
              <div className="lg:flex lg:items-center lg:mx-8">
                {user.users[0].name !== "Admin" && (
                  <>
                    <Link
                      to="/"
                      className="block px-3 py-2 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-yellow-700"
                    >
                      Home
                    </Link>
                    <PrivateRoute
                      path="/cart"
                      element={
                        <button
                          className="block px-3 py-2 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-yellow-700"
                          onClick={() => navigate('/cart')}
                        >
                          Cart
                        </button>
                      }
                    />
                    <PrivateRoute
                      path="/custom"
                      element={
                        <button
                          className="block px-3 py-2 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-yellow-700"
                          onClick={() => navigate('/custom')}
                        >
                          Custom Pizza
                        </button>
                      }
                    />
                    <PrivateRoute
                      path="/order"
                      element={
                        <button
                          className="block px-3 py-2 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-yellow-700"
                          onClick={() => navigate('/order')}
                        >
                         Orders
                        </button>
                      }
                    />
                  </>
                )}
                <div className="mt-2 px-3">
                  <button
                    type="button"
                    className="block text-gray-600 transition-colors duration-300 transform lg:hidden dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                    aria-label="show notifications"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                    </svg>
                  </button>
                </div>
                <div className="flex items-center mt-2">
                  <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                      className="object-cover w-full h-full"
                      alt="avatar"
                    />
                  </div>
                  {user.users.length > 0 && (
                    <h3 className="mx-2 text-gray-700 dark:text-gray-200">{user.users[0]?.name}</h3>
                  )}
                </div>
                <div className="mt-2">
                  <button
                    onClick={handleSignOut}
                    className="block px-3 py-2 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-yellow-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
