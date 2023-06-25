"use client"
import { api } from "@/app/api";
import { UserDataApi, storeFriendIdApi, userApi } from "@/app/redux/actions/UserActions";
import { postDeleteApi } from "@/app/redux/actions/postsActions";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";

function UserProfilePage({ params }) {
    const id = params?.id
    const dispatch = useDispatch()
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}
    const [refreshCount, setRefreshCount] = useState(0);

    const handleRefreshClick = () => {
        setRefreshCount(prevCount => prevCount + 1);
    };
    // get posts
    const selector = useSelector(state => state.singleUser)
    const { userInfo, loading, error } = selector

    const s = useSelector(state => state.userData)
    const getFriendsIds = s?.userInfo?.data?.friends?.map((item) => item?._id)


    useEffect(() => {
        dispatch(UserDataApi(id))
        dispatch(userApi())

    }, [dispatch, refreshCount])

    const handleDelete = (post_index, postId) => {
        dispatch(postDeleteApi(post_index, postId))
        handleRefreshClick()
    }

    const sendFriendId = (friendId) => {
        dispatch(storeFriendIdApi(friendId))
        handleRefreshClick()

    }
    return (
        <div className="container h-screen mx-auto py-8 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">

            <div className="bg-white shadow-md rounded-lg p-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {
                            userInfo?.image ?
                                <Image
                                    src={`${api}/uploads/${userInfo?.image}`}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full mr-6"
                                    loaded="lazy"
                                    width={400} height={400}
                                />
                                :
                                <Skeleton width={110} height={110} style={{ borderRadius: "50px" }} />
                        }
                        <div>
                            <h1 className="text-gray-600 text-2xl font-semibold mb-2">{userInfo?.username || <Skeleton width={200} height={25} />}</h1>
                            {/* <p className="text-gray-600">Web Developer</p> */}
                            <p className="text-gray-500">{userInfo?.location || <Skeleton width={200} height={25} />}</p>
                        </div>
                    </div>
                    {
                        user?.userId !== id &&
                        <button
                            onClick={() => sendFriendId(userInfo?._id)}
                            className="bg-indigo-500 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-600 transition duration-300">
                            {getFriendsIds?.includes(id) ? "Followed" : "Follow" || <Skeleton width={200} height={25} />}
                        </button>
                    }
                </div>
                {/* <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">About Me</h2>
                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                        consequat risus ligula, vitae gravida purus feugiat eu. Phasellus
                        molestie dolor id mauris ultricies, a mattis velit consequat.
                        Nullam quis leo sapien. Nullam aliquam nec diam a commodo.
                    </p>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Interests</h2>
                    <ul className="flex flex-wrap gap-2 text-gray-600">
                        <li>#WebDevelopment</li>
                        <li>#JavaScript</li>
                        <li>#React</li>
                        <li>#Photography</li>
                        <li>#Travel</li>
                    </ul>
                </div> */}

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-600">Photos</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {loading ? <Skeleton width={400} height={200} /> : error ? <span className="text-gray-600">{error}</span> : userInfo?.posts?.map((item, idx) => (
                            <div key={idx} className="relative">
                                <Image
                                    src={`${api}/uploads/${item?.image}`}
                                    alt="Photo"
                                    className="w-full h-auto rounded-md object-cover text-gray-600"
                                    loading="lazy"
                                    width={700}
                                    height={700}
                                />
                                {
                                    user?.userId === id &&
                                    <button
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-300"
                                        onClick={() => handleDelete(idx, item?._id)}
                                    >
                                        Delete
                                    </button>
                                }
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default UserProfilePage;
