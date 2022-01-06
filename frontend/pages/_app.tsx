import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache(),
});

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Countries GraphQL</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
