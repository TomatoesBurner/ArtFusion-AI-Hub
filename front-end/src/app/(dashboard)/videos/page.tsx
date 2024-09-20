import { redirect } from 'next/navigation';
import React from 'react';

const Page = () => {
    redirect("videos/create")

    return (
        <div>
            video page
        </div>
    );
}

export default Page;
