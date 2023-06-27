import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import DisplayList from '../components/displayList';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <DisplayList/>
    </Layout>
  );
}
