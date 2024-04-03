import classNames from "classnames"
import Link from "next/link"
import { Location, Event } from "@prisma/client"
import styles from "./Card.module.css"

export default function Card({ location, event }: { location: Location, event: Event | null }) {
  if (!event) {
    return (
      <>
        <div className={classNames(styles.galleryItem, styles.galleryItemGreen)}>
          <div className={styles.galleryItemHeader}>
            <Link href={`/${location.id}`}>
              {location.name}: No Events Ongoing
            </Link>
          </div>
          <blockquote>
            There are no events happening at {location.name} right now.
            <br /><br />
            Students may feel free to use the venue for free play. Students are reminded to wear PE attire and hydrate regularly.
            <br /><br />
            For external users, please book the facility through other platforms.
          </blockquote>
        </div>
      </>
    )
  }

  return (
    <>
      <Link href={`/${location.id}`}>
        <div className={classNames(styles.galleryItem, styles.galleryItemYellow)}>
          <div className={styles.galleryItemHeader}>
            {location.name}: {event.title}
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
        </div>
      </Link>
    </>
  )
}