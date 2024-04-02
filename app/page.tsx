import { signOut } from "next-auth/react"
import { PrismaClient } from "@prisma/client"
import styles from "./page.module.css"
import Card from "../components/Card/Card"

const prisma = new PrismaClient()

export default async function page() {
  const locations = await prisma.location.findMany()
  const today = new Date()
  let events = []
  for (const location of locations) {
    const event = await prisma.event.findFirst({
      where: {
        locationId: location.id,
        start: {
          lte: today
        },
        end: {
          gte: today
        },
      }
    })
    if (event) {
      events.push(event)
    }
  }

  return (
    <>
      <div className={styles.text}>
        <h1 className={styles.heroText}>
          Welcome to Booking@AC.
        </h1>
        <div className={styles.gallery}>
          <Card location={locations[0]} event={events[0]}/>
        </div>
      </div>
    </>
  );
}
