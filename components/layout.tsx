import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const title = 'Welcome to Buzzhub 🐝';
export const siteTitle = 'Buzzhub Demo';

export default function Layout({ children }: { children: React.ReactNode}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Small demo site to show to value of buzzhub to stakeholders"
        />
     
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <Image
          priority
          src="/images/bee.jpg"
          height={144}
          width={144}
          alt=""
        />
        <h1 className={utilStyles.heading2Xl}>{title}</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
