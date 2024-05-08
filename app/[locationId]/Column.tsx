"use client"

import styles from './column.module.css'
import { Event } from '@prisma/client'
import { timeFormatter } from '@/components/Card/Card'
import Link from 'next/link'
import classNames from 'classnames'

export default function Column({ locationId, date, events }: {
  locationId: number,
  date: string,
  events: Event[]
}) {
  return (
    <>
      <div className={ events.length === 0 ? classNames(styles.day, styles.noEvent) : styles.day }>
        <div className={ styles.dayHeader }>{date}</div>
        <div className={styles.dayEvents}>
          {events.map((event, key) => (
            <>
              <Link href={`${locationId}/${event.uid}`} key={key}>
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

function titleFormatter(title: string) {
  if (title.length > 14 && !isMobile()) {
    return title.substring(0, 11) + '...'
  } else {
    return title
  }
}

function isMobile() {
  const mobileBreakpoint = 768;
  if (typeof window === 'undefined') {
    return false;
  }
  return window.innerWidth <= mobileBreakpoint;
}
