import DashBoardLayout from '@/layouts/DashBoardLayout/DashBoardLayout';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <DashBoardLayout>
            {children}
        </DashBoardLayout>
    );
}

export default Layout;
