import React from 'react'
import Button from '../components/Button'
import * as ICON from 'lucide-react'

const Category = () => {
    const testArray = [1,2,3,4]

  return (
    <div className='px-4 py-2'>
        <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl font-bold'>Categories</h1>
            <div>
                <Button className={"flex bg-blue-600 items-center gap-2"}>
                    <ICON.Plus/>
                    <p>Add New</p>
                </Button>
            </div>
        </div>

        {/* Main Body */}
        <div className='flex flex-col shadow-boxShadowBorder2 rounded-md overflow-hidden'>
            <div className='bg-gray-200 p-2'>
                <ul className='grid grid-cols-3 font-semibold'>
                    <li>Name</li>
                    <li className='place-self-center'>Products</li>
                    <li className='place-self-end pr-2'>Action</li>
                </ul>
            </div>

            <div>
                {testArray.map((item,index)=> (
                    <ul key={index} className='grid grid-cols-3 p-2 pr-4 border-b border-gray-300'>
                        <li>Chain</li>
                        <li className='place-self-center'>12</li>
                        <li className='place-self-end text-red-500'>Delete</li>
                    </ul>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Category