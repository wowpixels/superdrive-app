import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center lg:flex-row bg-slate-200 dark:bg-slate-800">
        <div className="px-10 py-20 flex flex-col space-y-10 w-full">
          <div>
            <h1 className="text-5xl mb-2 font-bold">Welcome to Superdrive.</h1>
            <h2 className="text-5xl max-w-5xl xl:max-w-4xl text-balance">
              Store your files in the cloud. All in one place.
            </h2>
          </div>
          <p className="max-w-5xl xl:max-w-4xl text-balance">
            Work together smoothly and accelerate your productivity from any
            location using Superdrive. Safely keep your data, modify PDFs,
            distribute videos, authenticate documents, and monitor file
            interactions - all within the confines of Dropbox.
          </p>
          <Link
            className="flex bg-darkblue-500 w-fit text-white py-3 px-5 group transition-all hover:bg-darkblue-600"
            href="/dashboard"
          >
            Try it for free!{' '}
            <ArrowRight className="ml-3 transition-all group-hover:ml-5" />
          </Link>
        </div>
        <div className="w-full p-0 lg:p-20">
          <video
            autoPlay
            loop
            muted
            className="shadow-lg shadow-blue-900/10 rounded-non lg:rounded-lg"
          >
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div>
        <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
        <p className="text-center font-light p-4">
          The Superdrive app is intended for educational purposes only. It is
          not designed for storing sensitive or personal information. Use at
          your own risk.
        </p>
      </div>
    </main>
  );
}
