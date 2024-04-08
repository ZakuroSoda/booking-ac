import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { PrismaClient } from "@prisma/client"
import { timeFormatter } from '@/components/Card/Card'
import styles from "./page.module.css"

const prisma = new PrismaClient()

export default async function page({
  params
}: {
  params: {
    locationId: string
    eventId: string
  }
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/login")
  }
  const locationId = parseInt(params.locationId)
  if (isNaN(locationId)) {
    redirect("/")
  }
  const location = await prisma.location.findUnique({
    where: {
      id: locationId
    }
  })
  if (!location) {
    redirect("/")
  }
  const event = await prisma.event.findUnique({
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
    },
    where: {
      uid: params.eventId
    }
  })
  if (!event) {
    redirect("/")
  }

  return (
    <>
      <div className={styles.item}>
        <div className={styles.itemHeader}>
          {event.Locations.name}: {event.title}
        </div>
        <div className={styles.itemTime}>
          {timeFormatter(event.start)} - {timeFormatter(event.end)}
        </div>
        <ul>
          <li>{event.spectators === "y" ? "Spectators welcome" : "No spectators welcome"}</li>
          <li>{event.sharing === "y" ? "Sharing of venue possible" : "No sharing of venue"}</li>
          <li>
            {{
              "il": "Internal Lesson",
              "ic": "Internal CCA",
              "ie": "Internal Event",
              "ec": "External Competition",
              "ee": "External Event",
            }[event.type]}
          </li>
          <li>
            {
              event.recurrence === "n" ? "Once-Off" :
                `Recurs every ${{
                  "d": "day",
                  "w": "week",
                  "m": "month",
                }[event.recurrence]
                }`
            }
          </li>
        </ul>
        <blockquote>{event.description}</blockquote>
        <ul>
          <li>Booked by {event.User.email}</li>
        </ul>
      </div>
    </>
  );
}
