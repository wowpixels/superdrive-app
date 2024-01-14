import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-center mt-20 px-4">
      <div className="pb-6 text-sm">
        Copyright &copy; {new Date().getFullYear()} &middot;{' '}
        <Link
          className="font-bold hover:text-darkblue-500"
          target="_blank"
          href="https://wowpixels.dev"
        >
          wowpixels.dev
        </Link>
        <div className="text-xs text-slate-500">
          Developed using Next.js, Tailwind CSS, ShadCn, Zustand, FireBase and
          Clerk Auth
        </div>
      </div>
    </footer>
  );
};

export default Footer;
