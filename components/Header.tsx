'use client';
import { SignIn, SignInButton, SignedOut } from '@clerk/clerk-react';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggler } from './ThemeToggler';

function Header() {
  return (
    <header className="flex items-center justify-between shadow">
      <Link className="flex items-center space-x-4 group" href="/">
        <div className="bg-darkblue-500 transition-all group-hover:bg-darkblue-600">
          <Image
            src="/superdrive-logo.svg"
            width={50}
            height={50}
            className="invert p-1"
            alt="SuperDrive logo"
          />
        </div>
        <h1 className="font-bold text-xl group-hover:text-darkblue-600">
          Superdrive
        </h1>
      </Link>
      <div className="px-5 flex space-x-2 items-center">
        <ThemeToggler />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
