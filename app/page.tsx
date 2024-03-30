"use client"

import { signOut } from "next-auth/react"
import styles from "./page.module.css"
import classNames from "classnames"

export default function page() {
  return (
    <>
      <div className={styles.text}>
        <h1 className={styles.heroText}>
          Welcome to Booking@AC.
        </h1>
        <div className={styles.gallery}>
          <div className={classNames(styles.galleryItem, styles.galleryItemGreen)}>
            <div className={styles.galleryItemHeader}>
              AstroTurf: OPEN
            </div>
            <blockquote>Feel free to use it if you're a student! If you're not from ACSI, you may book it through...</blockquote>
          </div>
          <div className={classNames(styles.galleryItem, styles.galleryItemYellow)}>
            <div className={styles.galleryItemHeader}>
              AstroTurf: Frisbee Training
            </div>
            <ul>
              <li>No spectators welcome</li>
              <li>Open for sharing</li>
              <li>Internal CCA</li>
              <li>Recurring every week</li>
            </ul>
            <blockquote>Frisbee Training for our Y5s and Y6s</blockquote>
          </div>
          <div className={classNames(styles.galleryItem, styles.galleryItemRed)}>
            <div className={styles.galleryItemHeader}>
              AstroTurf: Football NSG
            </div>
            <ul>
              <li>Spectators welcome</li>
              <li>Not open for sharing</li>
              <li>External Competition</li>
              <li>Once-Off</li>
            </ul>
            <blockquote>Football NSG match between ACSI and ACSJ. Come down to support the primary school children fighting against the U16s!</blockquote>
          </div>
        </div>
        <a onClick={() => signOut()}>Sign out by link</a>
      </div>
    </>
  );
}
