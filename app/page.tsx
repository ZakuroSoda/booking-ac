import { PrismaClient } from "@prisma/client"
import styles from "./page.module.css"
import Gallery from "./Gallery"

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
    name: string | null
  }
}

export default async function page() {
  let rawlocations = await prisma.location.findMany()
  const today = new Date()
  let locations = []
  for (const location of rawlocations) {
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
            email: true,
            name: true
          }
        }
      }
    })
    locations.push({
      ...location,
      event: event || null
    });
  }

  console.log(locations)

  return (
    <>
      <div className={styles.text}>
        <h1 className={styles.heroText}>
          Welcome to Booking@AC.
        </h1>
        <Gallery locations={locations} />
      </div>
    </>
  )
}
