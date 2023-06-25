import React from 'react'
import UserProfilePage from '../../components/userscreen/UserProfilePage'

const page = ({ params }) => {
    return (
        <div>
            <UserProfilePage params={params} />
        </div>
    )
}

export default page
