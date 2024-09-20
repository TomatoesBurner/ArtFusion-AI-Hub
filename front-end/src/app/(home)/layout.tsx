import HomeLayout from '@/layouts/HomeLayout/HomeLayout';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <HomeLayout>
            {children}
        </HomeLayout>
    );
}

export default Layout;
