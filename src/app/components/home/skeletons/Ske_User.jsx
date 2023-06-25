import React from 'react'
import Skeleton from 'react-loading-skeleton'

const Ske_User = () => {
    return (
        <div className=" rounded-md p-4  flex flex-col items-center gap-1">
            <div className="mb-4 sm:mb-0">
                <Skeleton width={60} height={60} style={{ borderRadius: "50px" }} />
            </div>
            <div className="flex flex-col items-start text-center sm:text-left sm:ml-4">
                <Skeleton width={100} height={15} />
                <Skeleton width={100} height={15} />
                <Skeleton width={100} height={15} />
                <Skeleton width={100} height={15} />
                <Skeleton width={100} height={15} />
            </div>
        </div>
    )
}

export default Ske_User
