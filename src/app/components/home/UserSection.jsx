"use client"
import { api } from '@/app/api'
import { userApi } from '@/app/redux/actions/UserActions'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import UserSkeleton from './skeletons/UserSkeleton'
import Ske_User from './skeletons/Ske_User'

const UserSection = () => {


    const dispatch = useDispatch()
    const selector = useSelector(state => state.userData)
    const { userInfo, loading, error } = selector
    useEffect(() => {
        dispatch(userApi())
    }, [dispatch])


    return (
        <section className="fullscreen-user">

            <div className="bg-white shadow-md rounded-md p-4 flex flex-col items-center">
                {loading ? <Ske_User /> : error ? <span className="text-xl font-semibold text-red-800">{error}</span> :
                    <>

                        <div className="mb-4 sm:mb-0">
                            <Image
                                src={`${api}/uploads/${userInfo?.data?.image}`}
                                alt="" className="w-12 h-12 rounded-full"
                                width={100} height={100}
                            />
                        </div>
                        <div className="flex flex-col items-start text-center sm:text-left sm:ml-4">
                            <Link href={`/userpersonalscreen/${userInfo?.data?._id}`}>
                                <h2 className="text-xl font-semibold text-gray-800">{userInfo?.data?.username || <Skeleton />}</h2>
                            </Link>
                            <span className="text-gray-500">Email: {userInfo?.data?.email}</span>
                            <span className="text-gray-500">Location: {userInfo?.data?.location}</span>
                            <span className="text-gray-500">Connections: {userInfo?.data?.friends?.length}</span>
                            <span className="text-gray-500">Joined: {userInfo?.data?.createdAt.slice(0, 10)}</span>
                        </div>
                    </>
                }
            </div>
        </section>
    )
}

export default UserSection
