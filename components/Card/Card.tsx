import classNames from "classnames"
import Link from "next/link"
import { Location } from "@prisma/client"
import styles from "./Card.module.css"
import { event } from "@/app/page"

export default function Card({ location, event }: { location: Location, event: event | null }) {
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
      <div className={classNames(styles.galleryItem, styles.galleryItemYellow)}>
        <div className={styles.galleryItemHeader}>
          <Link href={`/${location.id}`}>
            {location.name}: {event.title}
          </Link>
        </div>
        <div className={styles.galleryItemTime}>
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
          <li>Booked by { event.User.name ?? event.User.email }</li>
        </ul>
      </div>
    </>
  )
}

export function timeFormatter(date: Date) {
  var h = date.getHours();
  var m = date.getMinutes();

  // Format hours, minutes, and seconds to ensure they have leading zeros if needed
  const hours = (h < 10 ? "0" : "") + h;
  const minutes = (m < 10 ? "0" : "") + m;

  // Concatenate to form the 24-hour time string
  var time24 = hours + ":" + minutes;
  return time24;
}