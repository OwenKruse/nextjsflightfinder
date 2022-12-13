import Head from "next/head";
import styles from "../styles/Home.module.css";
import background from "../asset/BackGround.png";
import Navbar from "../../nextjsflightfinder/pages/navbar";
import { Autocomplete, TextField } from "@mui/material";
import * as React from "react";

import Script from 'next/script'
import {useState} from "react";
import quickSearch from "./quickSearch";

const items = [
  "ATLANTA GA, US (ATL) Airport",
  "BEIJING, CN (PEK) Airport",
  "LONDON, GB (LHR) Airport",
  "CHICAGO IL, US (ORD) Airport",
  "TOKYO, JP (HND) Airport",
  "LOS ANGELES CA, US (LAX) Airport",
  "PARIS, FR (CDG) Airport",
  "DALLAS/FORT WORTH TX, US (DFW) Airport",
  "FRANKFURT, DE (FRA) Airport",
  "HONG KONG, HK (HKG) Airport",
  "DENVER CO, US (DEN) Airport",
  "DUBAI, AE (DXB) Airport",
  "JAKARTA, ID (CGK) Airport",
  "AMSTERDAM, NL (AMS) Airport",
  "MADRID, ES (MAD) Airport",
  "BANGKOK, TH (BKK) Airport",
  "NEW YORK NY, US (JFK) Airport",
  "SINGAPORE, SG (SIN) Airport",
  "GUANGZHOU, CN (CAN) Airport",
  "LAS VEGAS NV, US (LAS) Airport",
  "SHANGHAI, CN (PVG) Airport",
  "SAN FRANCISCO CA, US (SFO) Airport",
  "PHOENIX AZ, US (PHX) Airport",
  "HOUSTON TX, US (IAH) Airport",
  "CHARLOTTE NC, US (CLT) Airport",
  "MIAMI FL, US (MIA) Airport",
  "MUNICH, DE (MUC) Airport",
  "KUALA LUMPUR, MY (KUL) Airport",
  "ROME, IT (FCO) Airport",
  "ISTANBUL, TR (IST) Airport",
  "SYDNEY, AU (SYD) Airport",
  "ORLANDO FL, US (MCO) Airport",
  "INCHEON, KR (ICN) Airport",
  "NEW DELHI, IN (DEL) Airport",
  "BARCELONA, ES (BCN) Airport",
  "LONDON, GB (LGW) Airport",
  "NEWARK NJ, US (EWR) Airport",
  "TORONTO ON, CA (YYZ) Airport",
  "SHANGHAI, CN (SHA) Airport",
  "MINNEAPOLIS MN, US (MSP) Airport",
  "SEATTLE WA, US (SEA) Airport",
  "DETROIT MI, US (DTW) Airport",
  "PHILADELPHIA PA, US (PHL) Airport",
  "MUMBAI, IN (BOM) Airport",
  "SÃO PAULO, BR (GRU) Airport",
  "MANILA, PH (MNL) Airport",
  "CHENGDU, CN (CTU) Airport",
  "BOSTON MA, US (BOS) Airport",
  "SHENZHEN, CN (SZX) Airport",
  "MELBOURNE, AU (MEL) Airport",
  "TOKYO, JP (NRT) Airport",
  "PARIS, FR (ORY) Airport",
  "MEXICO CITY, MX (MEX) Airport",
  "MOSCOW, RU (DME) Airport",
  "ANTALYA, TR (AYT) Airport",
  "TAIPEI, TW (TPE) Airport",
  "ZURICH, CH (ZRH) Airport",
  "NEW YORK NY, US (LGA) Airport",
  "FORT LAUDERDALE, FL, US (FLL) Airport",
  "WASHINGTON, DC, US (IAD) Airport",
  "PALMA DE MALLORCA, ES (PMI) Airport",
  "COPENHAGEN, DK (CPH) Airport",
  "MOSCOW, RU (SVO) Airport",
  "BALTIMORE MD, US (BWI) Airport",
  "KUNMING, CN (KMG) Airport",
  "VIENNA, AT (VIE) Airport",
  "OSLO, NO (OSL) Airport",
  "JEDDAH, SA (JED) Airport",
  "BRISBANE, AU (BNE) Airport",
  "SALT LAKE CITY UT, US (SLC) Airport",
  "DÜSSELDORF, DE (DUS) Airport",
  "BOGOTA, CO (BOG) Airport",
  "MILAN, IT (MXP) Airport",
  "JOHANNESBURG, ZA (JNB) Airport",
  "STOCKHOLM, SE (ARN) Airport",
  "MANCHESTER, GB (MAN) Airport",
  "CHICAGO IL, US (MDW) Airport",
  "WASHINGTON DC, US (DCA) Airport",
  "BRUSSELS, BE (BRU) Airport",
  "DUBLIN, IE (DUB) Airport",
  "SEOUL, KR (GMP) Airport",
  "DOHA, QA (DOH) Airport",
  "LONDON, GB (STN) Airport",
  "HANGZHOU, CN (HGH) Airport",
  "JEJU, KR (CJU) Airport",
  "VANCOUVER BC, CA (YVR) Airport",
  "BERLIN, DE (TXL) Airport",
  "SAN DIEGO CA, US (SAN) Airport",
  "TAMPA FL, US (TPA) Airport",
  "SÃO PAULO, BR (CGH) Airport",
  "BRASILIA, BR (BSB) Airport",
  "SAPPORO, JP (CTS) Airport",
  "XIAMEN, CN (XMN) Airport",
  "RIYADH, SA (RUH) Airport",
  "FUKUOKA, JP (FUK) Airport",
  "RIO DE JANEIRO, BR (GIG) Airport",
  "HELSINKI, FI (HEL) Airport",
  "LISBON, PT (LIS) Airport",
  "ATHENS, GR (ATH) Airport",
  "AUCKLAND, NZ (AKL) Airport",
];

export default function Home() {

  const importedElement = React.createElement(quickSearch, {}, null);
  return (
      <div className={styles.container}>
        <Head>
          <title>Flight Cheaply</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Flight Cheaply!</a>
          </h1>

          {importedElement}
        </main>

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
