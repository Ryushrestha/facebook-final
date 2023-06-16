import { getProductData } from '@/service/axios.service'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Advertise = () => {
    const [product, setProduct] = useState([])
    const getProdImage = async () => {
        const data = await getProductData()
        const limitedData = data.slice(0, 2);
        setProduct(limitedData)
    }
    useEffect(() => {
        getProdImage()
    }, [])
    console.log(product)
    return (
        <div className='flex flex-col'>
            <h1 className='font-semibold text-gray-600'>Sponsered by:</h1>
        <div className='mt-3'>
            {product.length > 0 && product.map((products, index) => {
                return (
                    <div className='flex flex-row mt-3 gap-3 items-center ' key={index}>
                   
                        <img className='rounded w-1/2 h-1/2' src={products.links.download}  />
                        <div className='flex flex-col items-start'>
                        <p className='font-semibold uppercase text-sm '>{products.alt_description}</p>
                        <Link href={products.urls.full} className='text-blue-700 font-medium text-base hover:underline'>View Now</Link>
                        </div>
                        <hr/>
                    </div>

                )
            })}
        </div>
        </div>
    )
}

export default Advertise