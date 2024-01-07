"use client"
import { api } from '@/app/api'
import { allPostApi, createCommentApi, createPostApi, postCommentApi, postLikeApi } from '@/app/redux/actions/postsActions'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./home.css"
import Link from 'next/link'
import { storeUserPostApi } from '@/app/redux/actions/UserActions'
import Image from 'next/image'
import LikeButton from './LikeButton'
import MessageButton from './MessageButton'
import axios, * as others from 'axios';
import SkeletonBlog from './skeletons/skeletonBlog'

const BlogSection = () => {
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [selectedPostIndex, setSelectedPostIndex] = useState(-1);
    const [comment, setComment] = useState('')
    const [postId, setPostId] = useState('')
    const [postData, setPostData] = useState([])

    const dispatch = useDispatch()
    // get posts
    const selector = useSelector(state => state.posts)
    const { posts, loading, error } = selector

    const filter = useSelector(state => state.productFilter.filter)


    useEffect(() => {
        const d = async () => {
            const { data } = await axios.get(`${api}/user/posts/posts`,
                { headers: { "authorization": `${user?.token}` } })
            localStorage.setItem("updatedPost", JSON.stringify(data))
            if (typeof window !== "undefined" && window.localStorage) {
                const z = JSON.parse(localStorage.getItem("updatedPost"))
                setPostData(z)
            }
        }
        d()
    }, [postData, updatedPosts])

    if (posts?.length >= 0) {
        var updatedPosts = [...postData]; // Create a copy of the original array
        const lastPost = updatedPosts?.pop(); // Remove the last element from the array
        updatedPosts?.unshift(lastPost); // Add the last element at the beginning of the array
    } else {
        console.log(posts);
    }

    console.log(postData)


    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}

    // create comment
    const c = useSelector(state => state.createComment)
    const { createdComment } = c

    //get new post id
    const post = useSelector(state => state.createdPosts)
    const { newPost } = post


    const createPost = () => {
        const formData = new FormData()
        formData.append("image", image)
        formData.append("content", content)
        formData.append("userId", user?.userId)
        if (!image || !content) {
            return false
        }
        dispatch(createPostApi(formData))
        setContent("")
        setImage("")
        // handleRefreshClick()
    }

    useEffect(() => {
        dispatch(allPostApi())
        dispatch(storeUserPostApi(newPost?.new_post?._id))
        dispatch(postCommentApi(postId, createdComment?.newComment?._id))
    }, [dispatch, createdComment?.newComment?._id, newPost?.new_post?._id,])
    // }, [dispatch, postId, createdComment?.newComment?._id, newPost?.new_post?._id,])



    const like = (postId) => {
        dispatch(postLikeApi(postId))
    }


    const sendComment = () => {
        if (!comment) {
            return false
        }
        dispatch(createCommentApi(comment))
        setComment("")

    }

    return (
        <div className="fullscreen grid grid-cols-1  gap-8 ">
            <div className=" bg-white shadow-md rounded-lg overflow-hidden">
                {user &&
                    <div className="p-4">
                        <textarea className="w-full h-32 text-gray-800 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Write your post..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <div className="flex items-center mt-4">
                            <input type="file" className="hidden" id="postImage"
                                onChange={(e) => setImage(e.target.files[0])}

                            />
                            <label htmlFor="postImage" className="bg-indigo-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-600 transition duration-300 cursor-pointer">
                                Upload Image
                            </label>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button className="bg-indigo-500 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-indigo-600 transition duration-300"
                                onClick={createPost}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                }
            </div>

            {loading || postData?.length === 0 ?
                // <SkeletonBlog cards={2} />
                <button
                    type="submit"
                    className="w-full flex items-center justify-center py-2 px-4 text-white font-medium rounded-md transition duration-300">
                    <svg className="mr-3 h-10 w-10 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </button>
                : error ? <span className="text-xl font-semibold text-red-800">{error}</span>
                    // : error ? <span className="text-xl font-semibold text-red-800">{error}</span>
                    :
                    <>
                        {/* {postData?.map((post, idx) => { */}
                        {updatedPosts?.filter((product) => filter ? product?.user?.username.includes(filter) : true)
                            .map((post, idx) => {
                                const isMessageOpen = selectedPostIndex === idx;
                                return (
                                    <div className="bg-white shadow-md rounded-lg overflow-hidden" key={idx}>
                                        <Link href={`/userpersonalscreen/${post?.user?._id}`} className="flex items-center p-4">
                                            <Image src={`${api}/uploads/${post?.user?.image}`} alt="User" width={100} height={100} className="w-8 h-8 rounded-full" loading="lazy" />
                                            <div className="flex justify-between items-center w-full ml-2">
                                                <span className="text-gray-800 font-semibold">{post?.user?.username}</span>
                                                <span className="text-gray-500 text-sm">{post?.user?.createdAt.slice(0, 10)}</span>
                                            </div>
                                        </Link>
                                        <div className="p-4">
                                            <p className="text-gray-600 p-1">{post?.content}</p>
                                            <Image src={`${api}/uploads/${post?.image}`} alt="Post" className="w-full h-50 object-cover" loading="lazy" width={700} height={700} />
                                            <div className="flex items-center space-x-2 mt-4">
                                                <LikeButton post={post} user={user} like={like} />
                                                <MessageButton post={post} setSelectedPostIndex={setSelectedPostIndex} setPostId={setPostId} isMessageOpen={isMessageOpen} idx={idx} comment={comment} setComment={setComment} sendComment={sendComment} />
                                            </div>
                                            {isMessageOpen &&
                                                <div className="mt-4">
                                                    <div className='flex'>
                                                        <input
                                                            type="text"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                            placeholder="Write a comment..."
                                                            className="w-full text-gray-800 sm:w-5/6 flex-grow-0 flex-shrink-0 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        />
                                                        <button
                                                            onClick={sendComment}
                                                            type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-600 transition duration-300 mt-2 sm:mt-0 sm:ml-2">
                                                            Submit
                                                        </button>

                                                    </div>
                                                    {
                                                        post?.comments?.map((elem, id) => {
                                                            return (
                                                                <div className="flex flex-col space-y-2  mt-4" key={id}>
                                                                    <Link href={`/userpersonalscreen/${post?.user?._id}`} className="flex items-center">
                                                                        <Image src={`${api}/uploads/${elem?.users?.image}`} width={100} height={100} alt="User" className="w-8 h-8 rounded-full" />
                                                                        <span className="ml-2 text-gray-800">{elem?.users?.username}</span>
                                                                    </Link>
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="ml-9 text-gray-500">{elem?.title}</span>
                                                                        <span className="text-gray-800">{elem?.createdAt.slice(0, 10)}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </div>

                                )
                            })}
                    </>
            }
        </div>
    )
}

export default BlogSection
