import { PrismaClient } from "@prisma/client"
import styles from "./page.module.css"
import Card from "../components/Card/Card"

const prisma = new PrismaClient()

export interface event {
  title: string
  type: string
  description: string
  spectators: string
  sharing: string
  recurrence: string
  start: Date
  end: Date
  Locations: {
    name: string
  }
  User: {
    email: string
  }
}

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
      },
      select: {
        title: true,
        type: true,
        description: true,
        spectators: true,
        sharing: true,
        recurrence: true,
        start: true,
        end: true,
        Locations: true,
        User: {
          select: {
            email: true
          }
        }
      }
    })
    if (event) {
      events.push(event)
    } else {
      events.push(null)
    }
  }

  return (
    <>
      <div className={styles.text}>
        <h1 className={styles.heroText}>
          Welcome to Booking@AC.
        </h1>
        <div className={styles.gallery}>
          {events.map((event, index) => (
            <Card location={locations[index]} event={event} key={index}/>
          ))}
        </div>
      </div>
    </>
  );
}
