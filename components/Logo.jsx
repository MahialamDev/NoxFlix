import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-1.5 ">
            <span className="text-red-500 text-2xl font-black tracking-tight">NOX </span>
            <span className="text-white text-2xl font-black tracking-tight">STREAM</span>
            <span className="bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded ml-1">BD</span>
          </Link>
    );
};

export default Logo;