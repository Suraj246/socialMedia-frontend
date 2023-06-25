"use client"
import { userLoginApi } from '@/app/redux/actions/UserActions'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const Login = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.userLogin)
    const router = useRouter()
    const { user, loading, error } = selector
    const [refreshCount, setRefreshCount] = useState(0);

    const handleRefreshClick = () => {
        setRefreshCount(prevCount => prevCount + 1);
    };

    useEffect(() => {
        if (user) {
            router.push("/")
        }
    }, [user, router, refreshCount])

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password || !username) {
            alert("Please enter a valid username or password")
            return
        }
        dispatch(userLoginApi(username, password))
        handleRefreshClick()
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
            <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
                {error && <span className="text-red-800">{error}</span>}
                <h1 className="text-2xl font-bold text-indigo-500 mb-6">Welcome Back!</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-gray-800 font-medium mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-800 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {
                        loading ?
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition duration-300">
                                <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Login
                            </button>
                            :
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition duration-300">
                                Login
                            </button>
                    }
                    <p className="text-gray-600 text-center text-sm">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-indigo-500 hover:text-indigo-600">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
