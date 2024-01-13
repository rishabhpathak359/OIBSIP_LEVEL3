import React from 'react'
import PizzaList from '../components/PizzaList'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center pt-32'>
      <p>home</p>
      <div>
        <PizzaList/>
      </div>
    </div>
  )
}

export default Home