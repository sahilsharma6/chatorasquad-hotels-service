import React from 'react'
import { FaBowlFood } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='px-10'>
            <div className='p-4 flex items-center justify-center'>
                <Link to="/" className="flex items-center space-x-2">
                    <FaBowlFood className="text-3xl text-orange-500" />
                    <span className="text-xl font-semibold text-gray-800">
                        CHATORA SQUAD
                    </span>
                </Link>
            </div>
            <div className='border-b' />
        </div>
    )
}

export default Navbar