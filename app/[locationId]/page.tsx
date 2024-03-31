import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { PrismaClient } from "@prisma/client"
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



  return (
    <>
      <div className={styles.header}>Usage of the {location.name} for the Next Week</div>
      <div className={styles.calendar}>
        <div className={styles.day}>
          <div className={styles.dayHeader}>Monday</div>
          <div id="ex3" className={styles.dayEvent}>
            <div className={styles.dayEventTitle}>Event 1</div>
            <div className={styles.dayEventTime}>10:00 - 12:00</div>
          </div>
          <div className={styles.dayEvent}>
            <div className={styles.dayEventTitle}>Event 1</div>
            <div className={styles.dayEventTime}>10:00 - 12:00</div>
          </div>
          <div className={styles.dayEvent}>
            <div className={styles.dayEventTitle}>Event 1</div>
            <div className={styles.dayEventTime}>10:00 - 12:00</div>
          </div>
          <div className={styles.dayEvent}>
            <div className={styles.dayEventTitle}>Event 1</div>
            <div className={styles.dayEventTime}>10:00 - 12:00</div>
          </div>
          <div className={styles.dayEvent}>
            <div className={styles.dayEventTitle}>Event 1</div>
            <div className={styles.dayEventTime}>10:00 - 12:00</div>
          </div>
          <div className={styles.dayEvent}>
            <div className={styles.dayEventTitle}>Event 1</div>
            <div className={styles.dayEventTime}>10:00 - 12:00</div>
          </div>
          <div className={styles.dayEvent}>
            <div className={styles.dayEventTitle}>Event 1</div>
            <div className={styles.dayEventTime}>10:00 - 12:00</div>
          </div>
        </div>
        <div className={styles.day}>
          <div className={styles.dayHeader}>Tuesday</div>
          <div className={styles.dayContent}>...</div>
        </div>
        <div className={styles.day}>
          <div className={styles.dayHeader}>Wednesday</div>
          <div className={styles.dayContent}>...</div>
        </div>
        <div className={styles.day}>
          <div className={styles.dayHeader}>Thursday</div>
          <div className={styles.dayContent}>...</div>
        </div>
        <div className={styles.day}>
          <div className={styles.dayHeader}>Friday</div>
          <div className={styles.dayContent}>...</div>
        </div>
        <div className={styles.day}>
          <div className={styles.dayHeader}>Saturday</div>
          <div className={styles.dayContent}>...</div>
        </div>
        <div className={styles.day}>
          <div className={styles.dayHeader}>Sunday</div>
          <div className={styles.dayContent}>...</div>
        </div>
      </div>
    </>
  );
}
