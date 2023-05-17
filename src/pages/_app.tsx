import { AppProps } from 'next/app';
import '../styles/main.css';
import Head from 'next/head';

import { AppConfig } from '../utils/AppConfig';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>{AppConfig.title}</title>
      <meta property="og:title" content={AppConfig.title} key="title" />
      <meta
        property="og:description"
        content={AppConfig.description}
        key="description"
      />
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
