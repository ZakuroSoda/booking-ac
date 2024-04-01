"use client"

import { signOut } from "next-auth/react"
import styles from "./page.module.css"
import classNames from "classnames"
import Card from "../components/Card/Card"

export default function page() {
  return (
    <>
      <div className={styles.text}>
        <h1 className={styles.heroText}>
          Welcome to Booking@AC.
        </h1>
        <div className={styles.gallery}>
          <Card />
        </div>
        
        <a onClick={() => signOut()}>Sign out by link</a>
      </div>
    </>
  );
}
