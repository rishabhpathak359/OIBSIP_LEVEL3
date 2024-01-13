import React from 'react'
import { pizza_data } from '../data/data'
import PizzaCard from './PizzaCard'
const PizzaList = () => {
  return (
    <div className='flex flex-wrap m-5'>
     {
        pizza_data.map((pizza) =>(
            <PizzaCard pizza={pizza} fromCart={false}/>
        ))
     }
    </div>
  )
}

export default PizzaList