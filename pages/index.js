import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import * as React from "react";
import {Typography, Grid} from "@mui/material";
import Deals from '../components/Deals';
import quickSearch from "../components/quickSearch";
export default function Home() {

  const importedElement = React.createElement(quickSearch, {}, null);
  return (
      <div className={styles.container}>
        <Head>
          <title>MileWise</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.mainPage}>
            <Navbar />
          <h1 className={styles.title}>
            Where next?
          </h1>
          {importedElement}
        </div>

          <Grid container sx={
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }
          }>
            <Grid item xs={12}>
                <Typography variant="h4" align="center" sx={{mt: 5, mb: 5,
                fontWeight: 700}}>
                    Featured Deals
                </Typography>
                <Deals />

          </Grid>
        </Grid>

        <footer>
          <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
          >
            Powered by{" "}
            <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
          </a>
        </footer>

        <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

        <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      </div>
  );
}
