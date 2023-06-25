import UserSection from "./components/home/UserSection";
import BlogSection from "./components/home/BlogSection";
import FriendsList from "./components/home/FriendsLIst";
import "./components/home/home.css"

export default function Home() {

  return (
    <main className="flex flex-wrap gap-4 justify-center mx-auto py-8 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 bg-white md:flex-wrap">
      <div className=" page-user sticky">
        <UserSection />
      </div>

      <BlogSection />
      <div className="page-friend-list sticky ">
        <FriendsList />
      </div>
    </main>


  )
}
