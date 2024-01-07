import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonBlog = ({ cards }) => {
    return (
        <div className="grid grid-cols-1 gap-8 overflow-hidden">
            {
                Array(cards).fill(0).map((item, idx) => {
                    return (
                        <div className="rounded-lg overflow-hidden" key={idx}>
                            <div className="flex items-center p-4 ">
                                <Skeleton width={50} height={50} style={{ borderRadius: "30px" }} />
                                <div className="flex justify-between items-center w-full ml-2">
                                    <Skeleton width={70} height={20} />
                                    <Skeleton width={70} height={20} />
                                </div>
                            </div>
                            <Skeleton width={700} height={450} />
                            <div className="p-4">
                                <Skeleton width={70} height={20} />
                                <div className="flex flex-wrap items-center space-x-2 mt-4">
                                    <Skeleton width={50} height={25} style={{ borderRadius: "30px" }} />
                                    <Skeleton width={50} height={25} style={{ borderRadius: "30px" }} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SkeletonBlog
