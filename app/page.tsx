import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
// import utilStyles from '/styles/utils.module.css';
import CopyButton from '../components/copyButton';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section >
        <h2 >Upcoming Meeting: Wednesday, June 21st <CopyButton/></h2> 
        <h2 >Location: Santropol Roulant</h2>
        <ul >
          <li><p>Facilitator:Johanna</p></li>
          <li><p>Jockey: Nicola</p></li>
          <li><p>Scribe: Elliot</p></li>
        </ul>
        <h2 >Following Meeting: Thursday, June 29th</h2>
        <h3 >Location: Online</h3>
        <ul >
          <li><p>Facilitator:Marie-Anne</p></li>
          <li><p>Jockey: Audrey</p></li>
          <li><p>Scribe: Elyse</p></li>
        </ul>
      </section>
    </Layout>
  );
}
