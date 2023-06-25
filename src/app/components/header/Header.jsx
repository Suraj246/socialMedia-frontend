"use client"
import { USER_LOGOUT } from '@/app/redux/constants/UserConstants'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    // const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}
    // console.log(user)
    return (
        <header className="sticky top-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
            <div className="container mx-auto flex flex-col items-center sm:flex-row justify-between">
                <Link href="/" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-0">My Social Media</Link>
                <nav className="space-x-4 sm:ml-4 flex flex-col sm:flex-row items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2 sm:mb-0"
                    />
                    <div className="flex flex-row space-x-4 items-center">
                        <Link className="text-sm sm:text-base md:text-lg lg:text-xl font-medium hover:text-purple-200" href="/explore">Explore</Link>
                        <Link className="text-sm sm:text-base md:text-lg lg:text-xl font-medium hover:text-purple-200" href="/notifications">Notifications</Link>
                        <Link className="text-sm sm:text-base md:text-lg lg:text-xl font-medium hover:text-purple-200" href="/profile">Profile</Link>
                        <Link className="w-full sm:w-auto py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition duration-300" href="/login">
                            Login
                        </Link>
                    </div>
                </nav>
            </div>
        </header>


    )
}

export default Header
