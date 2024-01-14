import React from 'react'
import PizzaList from '../components/PizzaList'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center pt-32'>
      <p className='text-3xl font-bold'>Get the best Pizzas for you</p>
      <div>
        <PizzaList/>
      </div>
    </div>
  )
}

export default Home