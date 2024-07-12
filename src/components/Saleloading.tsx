import { paddingForpage } from '@/app/sizeDeclare'
import React from 'react'

export default function Saleloading() {
  return (
    <div className={paddingForpage}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-14 md:gap-10 lg:gap-24">
            <div className="w-full aspect-[9/12] animate-pulse bg-gray-300"></div>
            <div className="w-full aspect-[9/12] animate-pulse bg-gray-300"></div>
            <div className="w-full aspect-[9/12] animate-pulse bg-gray-300"></div>
        </div>
    </div>
  )
}
