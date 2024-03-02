import Link from 'next/link';
import Image from 'next/image';
import logo from '.././assets/images/logo.png';
import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs';
import { ThemeToggler } from './ThemeToggler';
function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-[#0160FE] w-fit p-2">
          <Image src={logo} alt="Dropbox" width={30} height={30} />
        </div>
        <h1 className="font-bold text-xl">Dropbox</h1>
      </Link>

      <div className="px-5 flex space-x-2 items-center">
        <ThemeToggler />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal"></SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
