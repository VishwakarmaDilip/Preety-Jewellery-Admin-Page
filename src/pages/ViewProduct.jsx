import React from 'react'
import Button from '../components/Button'

const ViewProduct = () => {

    const testArray = [1, 2, 3, 4, 5,];
  return (
    <div className='px-8 py-3 flex '>
        {/*Product image */}
        <div className='w-1/2 flex flex-col gap-10 py-10'>
            {/* image */}
            <div className='h-96 flex items-center justify-center'>
                <img src="https://bindhani.in/cdn/shop/files/bindhani-gold-plated-white-stone-beads-mirror-hanging-multi-colorful-drop-earring-for-women.jpg?v=1745644708" alt="" className='h-full' />
            </div>

            {/* More Image */}
            <div className='flex gap-4 justify-center'>
                {testArray.map((img) => (
                   <div className='h-20' key={img}>
                        <img src='https://bindhani.in/cdn/shop/files/bindhani-gold-plated-white-stone-beads-mirror-hanging-multi-colorful-drop-earring-for-women.jpg?v=1745644708' alt="" className='h-full' />
                   </div>
                ))}
            </div>
        </div>

        {/* product details */}
        <div className='bg-white w-1/2 p-5 flex flex-col justify-between'>
            <div>
                <p className='text-gray-400 text-xs'>PID</p>
                <p className='text-base'>123456</p>
            </div>
            <div>
                <p className='text-gray-400 text-xs'>Name</p>
                <p className='text-base'>Gold Bird</p>
            </div>          
            <div>
                <p className='text-gray-400 text-xs'>Price</p>
                <p className='text-base'>₹450</p>
            </div>
            <div>
                <p className='text-gray-400 text-xs'>Stock</p>
                <p className='text-base'>60</p>
            </div>
            <div>
                <p className='text-gray-400 text-xs'>Category</p>
                <p className='text-base'>Ear Ring</p>
            </div>
             <div>
                <p className='text-gray-400 text-xs'>Description</p>
                <p className='text-base'>Discover the perfect pair to complement your look. Our diverse collection of earrings offers something for everyone, from delicate studs that add a touch of everyday elegance to dazzling drops that make a statement. Crafted with quality materials and exquisite attention to detail, these earrings are designed to be comfortable, durable, and effortlessly stylish. Find your new favorite accessory and express your unique personality!</p>
            </div>

            {/* buttons */}
            <div flex className='flex gap-5'>
                <Button className="bg-blue-400 w-1/2 hover:bg-blue-500 active:bg-blue-600">Edit</Button>
                <Button className="bg-red-600 w-1/2 hover:bg-red-700 active:bg-red-800">Delete</Button>
            </div>
        </div>
    </div>
  )
}

export default ViewProduct