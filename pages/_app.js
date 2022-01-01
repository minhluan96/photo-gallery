import 'antd/dist/antd.css';
import Head from 'next/head';
import 'styles/globals.css';
import configureStore from 'config/store';
import { Provider } from 'react-redux';

const store = configureStore();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Photo Gallery</title>
        <meta name='Description' content='Photo Gallery' />
        <link
          href='https://unicons.iconscout.com/release/v3.0.0/css/line.css'
          rel='stylesheet'
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
