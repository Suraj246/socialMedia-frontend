"use client";
import { USER_LOGOUT } from "@/app/redux/constants/UserConstants";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import {  useSelector} from "react-redux/es/hooks/useSelector";
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from "@/app/redux/filterSlice";

const Header = () => {
    const dispatch = useDispatch()
    const router = useRouter();
    const [userToken, setUserToken] = useState('')
    console.log(userToken)
    const userData = () => {
        if (typeof window !== "undefined" && window.localStorage) {
            const z = localStorage.getItem("user")
            if (z) {
                setUserToken(z)
                router.push('/')
                // window.location.reload()
            }
            else {
                return
            }
        }
    }

    useEffect(() => {
        userData()
    }, [router, userToken])


    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};


    const filter = useSelector(state => state.productFilter.filter)

    return (
        <>
            <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 sticky top-0 overflow-hidden">
                {/* <header className="sticky top-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16"> */}
                {userToken && (
                    <div className="container mx-auto flex flex-col items-center sm:flex-row justify-between">
                        <Link
                            href="/"
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 sm:mb-0"
                        >
                            My Social Media
                        </Link>
                        <nav className="space-x-4 sm:ml-4 flex flex-col sm:flex-row items-center">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={filter}
                                onChange={(e) => dispatch(setFilter(e.target.value))}
                                className="bg-white text-black border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-2 sm:mb-0"
                            />
                            <div className="flex flex-row space-x-4 items-center">
                                <Link
                                    className="text-sm sm:text-base md:text-lg lg:text-xl font-medium hover:text-purple-200"
                                    href="/explore"
                                >
                                    Explore
                                </Link>
                                <Link
                                    className="text-sm sm:text-base md:text-lg lg:text-xl font-medium hover:text-purple-200"
                                    href="/notifications"
                                >
                                    Notifications
                                </Link>
                                <Link
                                    className="text-sm sm:text-base md:text-lg lg:text-xl font-medium hover:text-purple-200"
                                    href="/profile"
                                >
                                    Profile
                                </Link>
                                {!userToken && <Link
                                    className="w-full sm:w-auto py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition duration-300"
                                    href="/login"
                                >
                                    Login
                                </Link>}
                            </div>
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;
