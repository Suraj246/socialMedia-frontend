"use client"
import UserSection from "./components/home/UserSection";
import BlogSection from "./components/home/BlogSection";
import FriendsList from "./components/home/FriendsLIst";
import "./components/home/home.css"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
      useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const z = JSON.parse(localStorage.getItem("user"))
            if (!z) {
                router.push('/login')
            }
        }
    }, [router])

  return (
    <main className="flex flex-wrap gap-4 justify-center mx-auto py-8 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 bg-white md:flex-wrap">
      <div className=" page-user sticky">
      {/* <div className=" page-user sticky"> */}
        <UserSection />
      </div>

      <BlogSection />
      <div className="page-friend-list sticky">
      {/* <div className="page-friend-list sticky"> */}
        <FriendsList />
      </div>
    </main>


  )
}
