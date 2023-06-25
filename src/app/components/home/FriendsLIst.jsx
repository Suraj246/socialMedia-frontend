"use client"
import React, { useEffect, useState } from 'react';
import "./home.css"
import { useDispatch, useSelector } from 'react-redux';
import { removeFriendIdApi, userApi } from '@/app/redux/actions/UserActions';
import { api } from '@/app/api';
import Image from 'next/image';
import Link from 'next/link';
import UserSkeleton from './skeletons/UserSkeleton';

const FriendsList = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.userData)
    const { userInfo, loading, error } = selector

    const [refreshCount, setRefreshCount] = useState(0);

    const handleRefreshClick = () => {
        setRefreshCount(prevCount => prevCount + 1);
    };

    useEffect(() => {
        dispatch(userApi())
    }, [dispatch, refreshCount])

    const handleRemoveFriend = (friend_index) => {
        dispatch(removeFriendIdApi(friend_index))
        handleRefreshClick()
    }

    return (
        <div className="friend-container  p-4">
            <h2 className="text-2xl text-center mb-4 text-gray-900">Connections</h2>
            <ul className="divide-y divide-gray-300">

                {loading ? <UserSkeleton cards={2} /> : error ? <span className="text-gray-800">{error}</span> :
                    userInfo?.data?.friends?.map((friend, idx) => {
                        return (
                            <li key={idx} className="flex justify-between items-center text-gray-900 py-2">
                                <Link href={`/userpersonalscreen/${friend?._id}`} className="flex items-center">
                                    <Image src={`${api}/uploads/${friend?.image}`} alt="User" width={100} height={100} className="w-10 h-10 rounded-full mr-4" loading="lazy" />
                                    <span className="flex-grow">{friend.username}</span>
                                </Link>
                                <button
                                    className="px-4 py-1 bg-red-500 text-white rounded"
                                    onClick={() => handleRemoveFriend(idx)}
                                >
                                    Remove
                                </button>
                            </li>
                        )
                    })}
            </ul>
        </div>
    );
};

export default FriendsList;
