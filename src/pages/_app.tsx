import { Space_Mono } from "next/font/google";
import { type AppType } from "next/app";

import "~/styles/globals.css";

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={space_mono.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
