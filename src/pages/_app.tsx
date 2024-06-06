import { Space_Mono } from "next/font/google";
import { type AppType } from "next/app";

import "~/styles/globals.css";
import Link from "next/link";

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={space_mono.className}>
      <header className="flex items-center print:hidden">
        <h1 className="px-4 py-6 text-4xl">Lettering Bingo</h1>
        <nav className="px-4 py-2">
          <ul className="flex space-x-4 underline">
            <li>
              <Link href="/">Bingo Card</Link>
            </li>
            <li>
              <Link href="/letter-caller">Letter Caller</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
