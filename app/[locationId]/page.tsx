import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { PrismaClient } from "@prisma/client"
import Column from "@/app/[locationId]/Column"
import styles from "./page.module.css"

const prisma = new PrismaClient()

export default async function page({
  params
}: {
  params: {
    locationId: string
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

  const dates = dayMapper()
  const events = await eventMapper(locationId)

  return (
    <>
      <div className={styles.top}>
        <div className={styles.header}>Usage of the {location.name} for the Next Week</div>
        <Link href={`${locationId}/book`}>
          <button className={styles.button}>Book an Event</button>
        </Link>
      </div>
      <div className={styles.calendar}>
        {dates.map((date, key) => (
          <Column locationId={locationId} date={date} key={key} events={events[key]} />
        ))
        }
      </div>
    </>
  )
}

/**
 * Function to format the dates for the next week as Day Date Month
 * @returns {string[]} 7 strings representing the dates for the next week
 */

function dayMapper() {
  function formatDate(date: Date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const day = days[date.getDay()]
    const dayOfMonth = date.getDate()
    const month = months[date.getMonth()]

    return `${day} ${dayOfMonth} ${month}`
  }
  const today = new Date()
  const datesArray = []
  datesArray.push(formatDate(today))
  for (let i = 1; i <= 6; i++) {
    const nextDate = new Date()
    nextDate.setDate(today.getDate() + i)
    datesArray.push(formatDate(nextDate))
  }
  return datesArray
}


/**
 * 
 * @param locationId {number} The id of the location
 * @returns {[][]} A 2D array of events for the next week
 */

async function eventMapper(locationId: number) {
  const today = new Date()
  const nextWeek = new Date(new Date().setDate(today.getDate() + 7))

  const events = await prisma.event.findMany({
    where: {
      locationId: locationId,
      start: {
        gte: today,
        lte: nextWeek
      }
    }
  })

  const eventsArray = []
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(today.getDate() + i)
    const dateEvents = events.filter((event) => {
      return event.start.getDate() === date.getDate()
    })
    eventsArray.push(dateEvents)
  }

  for (let i = 0; i < 7; i++) {
    eventsArray[i].sort((a, b) => {
      return a.start.getTime() - b.start.getTime()
    })
  }

  return eventsArray
}