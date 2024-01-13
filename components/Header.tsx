'use client';
import { SignIn, SignInButton, SignedOut } from '@clerk/clerk-react';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200">
      <Link className="flex items-center space-x-4" href="/">
        <div className="bg-indigo-700">
          <Image
            src="/superdrive-logo.svg"
            width={50}
            height={50}
            className="invert"
            alt="SuperDrive logo"
          />
        </div>
        <h1 className="font-bold text-xl">SuperDrive</h1>
      </Link>
      <div className="px-5 flex space-x-2 items-center">
        {/* Theme toggler */}
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
