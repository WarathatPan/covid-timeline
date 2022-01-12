import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Covid Timeline Generator</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
