"use client"
import { api } from '@/app/api';
import { userApi, userUpdateApi } from '@/app/redux/actions/UserActions';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.userRegister)
    const router = useRouter()
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}

    const users = useSelector(state => state.userData)
    const { userInfo, loading, error } = users

    const [refreshCount, setRefreshCount] = useState(0);

    const handleRefreshClick = () => {
        setRefreshCount(prevCount => prevCount + 1);
    };

    useEffect(() => {
        dispatch(userApi())

        if (!user?.token) {
            router.push("/login")
        }
    }, [dispatch, user?.token, router, refreshCount])

    const [imagePreview, setImagePreview] = useState(null);
    const [input, setInput] = useState({ username: userInfo?.data?.username || "", email: userInfo?.data?.email || "", location: userInfo?.data?.location || "" });
    const [image, setImage] = useState('')
    // console.log('setImage', image)
    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }


    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData()

        formData.append("image", image)
        formData.append("location", input.location)
        dispatch(userUpdateApi(formData));
    };
    const logout = () => {
        Cookies.remove("user")
        router.push("/login")
        handleRefreshClick()
    }

    return (

        <div className="container mx-auto px-4 py-8 h-screen">
            <div className=" mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold mb-6">Update Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center mb-6">
                        <label htmlFor="image" className="relative cursor-pointer">
                            <div className="w-40 h-40 bg-gray-200 rounded-full mb-4">
                                {
                                    userInfo?.data?.image ?
                                        <Image
                                            src={`${api}/uploads/${userInfo?.data?.image}`}
                                            alt="Profile Preview"
                                            className="w-full h-full rounded-full object-cover"
                                            width={500} height={500}
                                        />
                                        :
                                        <>
                                            {imagePreview && (
                                                <Image
                                                    src={imagePreview}
                                                    alt="Profile Preview"
                                                    className="w-full h-full rounded-full object-cover"
                                                    width={500} height={500}
                                                />
                                            )}
                                        </>
                                }
                            </div>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <div className="absolute bottom-0 right-0 rounded-full bg-indigo-500 text-white px-2 py-1 text-sm">
                                Upload
                            </div>
                        </label>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={inputHandler}
                            value={input.username}
                            className="w-full text-gray-700 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={inputHandler}
                            value={input.email}

                            className="w-full text-gray-700 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            value={input.location}
                            name="location"
                            onChange={inputHandler}
                            className="w-full text-gray-700 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your location"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition duration-300"
                    >
                        Update
                    </button>

                    <button
                        className="w-full mt-2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition duration-300"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Profile
