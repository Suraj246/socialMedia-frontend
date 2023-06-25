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
import SkeletonBlog from './skeletons/skeletonBlog'

const BlogSection = () => {
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [selectedPostIndex, setSelectedPostIndex] = useState(-1);
    const [comment, setComment] = useState('')
    const [postId, setPostId] = useState('')

    const dispatch = useDispatch()
    // get posts
    const selector = useSelector(state => state.posts)
    const { posts, loading, error } = selector
    // const updatedPostsData = []
    if (posts?.length >= 0) {
        var updatedPosts = [...posts]; // Create a copy of the original array
        const lastPost = updatedPosts?.pop(); // Remove the last element from the array
        updatedPosts?.unshift(lastPost); // Add the last element at the beginning of the array
        // updatedPostsData.push(updatedPosts)
    } else {
        console.log(posts);
    }


    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}

    // create comment
    const c = useSelector(state => state.createComment)
    const { createdComment } = c

    //get new post id
    const post = useSelector(state => state.createdPosts)
    const { newPost } = post

    const [refreshCount, setRefreshCount] = useState(0);

    const handleRefreshClick = () => {
        setRefreshCount(prevCount => prevCount + 1);
    };

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
        handleRefreshClick()
    }


    useEffect(() => {
        dispatch(allPostApi())
        dispatch(storeUserPostApi(newPost?.new_post?._id))
        dispatch(postCommentApi(postId, createdComment?.newComment?._id))
    }, [dispatch, postId, createdComment?.newComment?._id, newPost?.new_post?._id, refreshCount])

    const like = (postId) => {
        dispatch(postLikeApi(postId))
        handleRefreshClick()
    }


    const sendComment = () => {
        if (!comment) {
            return false
        }
        dispatch(createCommentApi(comment))
        setComment("")
        handleRefreshClick()
    }

    return (
        <div className="fullscreen grid grid-cols-1  gap-8">
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

            {loading ? <SkeletonBlog cards={2} /> : error ? <span className="text-xl font-semibold text-red-800">{error}</span> :
                <>
                    {updatedPosts?.map((post, idx) => {
                        const isMessageOpen = selectedPostIndex === idx;
                        // console.log(post)
                        return (
                            <div className="bg-white shadow-md rounded-lg overflow-hidden" key={idx}>
                                <Link href={`/userpersonalscreen/${post?.user?._id}`} className="flex items-center p-4">
                                    <Image src={`${api}/uploads/${post?.user?.image}`} alt="User" width={100} height={100} className="w-8 h-8 rounded-full" loading="lazy" />
                                    <div className="flex justify-between items-center w-full ml-2">
                                        <span className="text-gray-800 font-semibold">{post?.user?.username}</span>
                                        <span className="text-gray-500 text-sm">{post?.user?.createdAt.slice(0, 10)}</span>
                                    </div>
                                </Link>
                                <Image src={`${api}/uploads/${post?.image}`} alt="Post" className="w-full h-50 object-cover" loading="lazy" width={700} height={700} />
                                <div className="p-4">
                                    <p className="text-gray-600">{post?.content}</p>
                                    <div className="flex flex-wrap items-center space-x-2 mt-4">
                                        <button className="flex items-center gap-2 bg-indigo-500 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-indigo-600 transition duration-300"
                                            onClick={() => like(post?._id)}
                                        >
                                            {post?.likes?.includes(user?.userId) ?
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-800">
                                                    <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                                </svg>

                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ">
                                                    <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                                </svg>

                                            }

                                            {post?.likes?.length}
                                        </button>
                                        <button className="flex items-center gap-2 bg-indigo-500 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-indigo-600 transition duration-300"
                                            onClick={() => {
                                                setSelectedPostIndex(isMessageOpen ? -1 : idx)
                                                setPostId(post?._id)
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                            </svg>

                                            {post?.comments?.length}
                                        </button>
                                    </div>
                                    {isMessageOpen &&

                                        <div className="mt-4">
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
                                            {
                                                post?.comments?.map((elem, id) => {
                                                    return (
                                                        <div className="flex flex-col space-y-2  mt-4" key={id}>
                                                            <Link href={`/userpersonalscreen/${post?.user?._id}`} className="flex items-center">
                                                                <Image src={`${api}/uploads/${elem?.users?.image}`} width={100} height={100} alt="User" className="w-8 h-8 rounded-full" />
                                                                <span className="ml-2 text-gray-800">{elem?.users?.username}</span>
                                                            </Link>
                                                            <div className="flex items-center justify-between">
                                                                <span className="ml-5 text-gray-800">{elem?.title}</span>
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
