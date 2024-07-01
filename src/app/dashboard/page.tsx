"use client"

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function Dashboard() {
    const currentUser = useSelector((state: RootState)=>state.user.currentUser)
  return (
    <>
    <div className="">
        <div className=" bg-orange-50 px-16">
            <div className="">
                <div className="">
                    <div className=" w-40 aspect-square rounded-full overflow-hidden">
                        <img  className="w-full h-full object-cover object-center" src={currentUser?.avatar} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
