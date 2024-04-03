import styles from './column.module.css'
import { Event } from '@prisma/client'
import Link from 'next/link'
import classNames from 'classnames'

export default function Column({ locationId, date, events }: {
  locationId: number,
  date: string,
  events: Event[]
}) {
  return (
    <>
      <div className={styles.day}>
        <div className={styles.dayHeader}>{date}</div>
        <div className={styles.dayEvents}>
          {events.map((event, key) => (
            <>
              <Link href={`${locationId}/${event.uid}`}>
              <div className={
                ongoing(event) ? classNames(styles.dayEvent, styles.ongoing) :
                  over(event) ? classNames(styles.dayEvent, styles.over) :
                    styles.dayEvent
                } key={key}>
                <div className={styles.dayEventTitle}>{titleFormatter(event.title)}</div>
                <div className={styles.dayEventTime}>{timeFormatter(event.start)} - {timeFormatter(event.end)}</div>
              </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

function over(event: Event) {
  const now = new Date()
  return now > event.end
}

function ongoing(event: Event) {
  const now = new Date()
  return now >= event.start && now <= event.end
}

function timeFormatter(date: Date) {
  var h = date.getHours();
  var m = date.getMinutes();

  // Format hours, minutes, and seconds to ensure they have leading zeros if needed
  const hours = (h < 10 ? "0" : "") + h;
  const minutes = (m < 10 ? "0" : "") + m;

  // Concatenate to form the 24-hour time string
  var time24 = hours + ":" + minutes;
  return time24;
}

function titleFormatter(title: string) {
  if (title.length > 14) {
    return title.substring(0, 11) + '...'
  } else {
    return title
  }
}