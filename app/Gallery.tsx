"use client"

import { useState, useEffect } from "react"
import Card from "@/components/Card/Card"
import styles from "./Gallery.module.css"
import Field from "@/components/formField/Field"

export default function Gallery({ locations }:
  {
    locations: {
      id: number,
      name: string,
      event: {
        title: string,
        type: string,
        description: string,
        spectators: string,
        sharing: string,
        recurrence: string,
        start: Date,
        end: Date,
        Locations: { id: number, name: string, },
        User: { name: string | null, email: string, },
      } | null
    }[],
  }
) {
  const [search, setSearch] = useState("")
  const [_locations, setLocations] = useState(locations)

  useEffect(() => {
    if (search.trim() === "") {
      setLocations(locations)
      return
    }

    const filteredLocations = locations.filter(location =>
      location.name.toLowerCase().includes(search.toLowerCase())
    )
    setLocations(filteredLocations)
  }, [search, locations])

  return (
    <>
      <div className={styles.search}>
        <Field
          label="Search"
          id="search"
          name="search"
          type="text"
          value={search}
          onChange={(target: any) => setSearch(target.value)}
          required={false}
        />
      </div>
      <div className={styles.gallery}>

        {_locations.map((location, index) => (
          <Card location={location} event={location.event} key={index} />
        ))}
      </div>
    </>
  )
}