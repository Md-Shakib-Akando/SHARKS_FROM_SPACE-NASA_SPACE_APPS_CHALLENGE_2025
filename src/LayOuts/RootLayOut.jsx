import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';


const RootLayOut = () => {
    return (
        <>

            <Navbar></Navbar>
            <div className=' lg:max-w-11/12 lg:mx-auto px-4 py-6'>
                <Outlet></Outlet>
            </div>



        </>
    );
};

export default RootLayOut;