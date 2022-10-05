import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

/*
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react';

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default MyApp

export default function MyApp({Component, pageProps} : AppProps) {
    return (
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    )
}
*/
