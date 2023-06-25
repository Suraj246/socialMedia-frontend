import React from 'react'
import Skeleton from 'react-loading-skeleton'

const UserSkeleton = ({ cards }) => {
    return (
        <>
            {
                Array(cards).fill(0).map((item, idx) => {
                    return (
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 ">
                                <Skeleton width={50} height={50} style={{ borderRadius: "50px" }} />
                                <Skeleton width={100} height={20} />
                            </div>
                            <Skeleton width={100} height={20} />

                        </div>
                    )
                })
            }
        </>
    )
}

export default UserSkeleton
