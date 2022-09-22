import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="index">
      <div className="index-main-section1">
        <div className="index-section2"></div>
      </div>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
      <div style={{ height: "700px" }}>
        <div className="index-image-main">
          <Image src="/images/landing.jpg" layout="fill" objectFit="fill" />
        </div>
        <div className="index-floats">
          <div className="index-text">
            {/* <div className="index-text1">
              Get An Unforgetable Trip on Travel Chain
            </div> */}
            {/* <Image src="/images/downArrow.jpg" width="20px" height="80px" /> */}
          </div>
        </div>
        <div className="index-packages">
          <div className="package-list">
            <div className="package">
              {/* <Image src="/images/img1.jpg" width="260px" height="200px" /> */}
            </div>
            <div className="package">
              {/* <Image src="/images/img2.jpg" width="260px" height="200px" /> */}
            </div>
            <div className="package">
              {/* <Image src="/images/img3.jpg" width="260px" height="200px" /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="levels-left-top">TIERS & BENEFITS</div>
      <div className="index-levels">
        <div className="index-levels-left">
          <div className="levels-left-content">
            <Image src="/images/Artboard47.jpg" width={2390} height={514} />
          </div>
        </div>
        <div className="index-levels-right">
          <div className="index-levels-right-sub">
            <div className="index-right-heads">
              {/* <div className="index-head">TIERS & BENEFITS</div> */}
            </div>
            <div className="index-right-content">
              <div className="tier-box">
                <div className="sub-tiers">
                  <div className="tier-title">TIER 1</div>
                  <div className="tier-detail">
                    Lorem ipsum dolor sit amet, consectetuer adip- iscing elit,
                    sed diam nonummy nibh euismod tin
                  </div>
                </div>
                <div className="sub-tiers">
                  <div className="tier-title">TIER 2</div>
                  <div className="tier-detail">
                    Lorem ipsum dolor sit amet, consectetuer adip- iscing elit,
                    sed diam nonummy nibh euismod tin
                  </div>
                </div>
                <div className="sub-tiers">
                  <div className="tier-title">TIER 3</div>
                  <div className="tier-detail">
                    Lorem ipsum dolor sit amet, consectetuer adip- iscing elit,
                    sed diam nonummy nibh euismod tin
                  </div>
                </div>
                <div className="sub-tiers">
                  <div className="tier-title">TIER 4</div>
                  <div className="tier-detail">
                    Lorem ipsum dolor sit amet, consectetuer adip- iscing elit,
                    sed diam nonummy nibh euismod tin
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="index-standings">
        <div className="standing-holder">
          <div className="standing-align">
            <div className="standing-left">
              <div className="standing-left-box">
                <div className="standing-box-align">
                  <div className="standing-box-header">YOUR LEVEL</div>
                  <div className="inner-box">
                    <div className="standing-images">
                      <Image
                        src="/images/Artboard20.jpg"
                        width="100px"
                        height="100px"
                      />
                      <Image
                        src="/images/Artboard21.jpg"
                        width="100px"
                        height="100px"
                      />
                      <Image
                        src="/images/Artboard22.jpg"
                        width="100px"
                        height="100px"
                      />
                      <Image
                        src="/images/Artboard23.jpg"
                        width="100px"
                        height="100px"
                      />
                    </div>
                    <div className="standing-description">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh euismod tincidunt ut laoreet 3
                      dolore magna aliquam erat volutpat. Ut wisi enim ad minim
                      veniam, quis nostrud exerci tation ul- 4 suscipit lobortis
                      nisl ut aliquip ex ea com-
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="standing-right">Right</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
