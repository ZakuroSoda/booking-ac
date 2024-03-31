"use client"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify"
import styles from "./BookingForm.module.css"
import Field from "@/components/formField/Field"
import Button from "@/components/formButton/Button"

export default function BookingForm({ location }: { location: { id: number, name: string } }) {
  const router = useRouter()

  const reset = {
    title: "",
    type: "il",
    description: "",
    spectators: "y",
    sharing: "y",
    recurrence: "n",
    start: "",
    end: "",
  }
  const [data, setData] = useState(reset)

  const handleChange = (target: any) => {
    const { name, value } = target
    setData({
      ...data,
      [name]: value,
    })
    console.log(value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    toast.loading("Creating event...")
    const result = await fetch("/api/book", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        locationId: location.id,
      }),
    })
    if (result.status === 400) {
      toast.dismiss()
      const text = await result.text()
      toast.error(text)
    }
    if (result.status === 200) {
      toast.dismiss()
      toast.success("Event created successfully.")

      const { eventId } = await result.json()
      router.push(`/${location.id}/${eventId}`)
    }

    setData(reset)
  }

  return (
    <>
      <div className={styles.edit}>
        <div className={styles.editHeader}>Book Usage of the {location.name}</div>
        <div className={styles.editDesc}>Since you are a student, you'll require a teacher's approval.</div>
        <form className={styles.editForm} onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.editFormRow}>
            <Field
              label="Event Title"
              id="title"
              name="title"
              type="text"
              value={data.title}
              onChange={handleChange}
              required={false}
            />
          </div>
          <div className={styles.editFormRow}>
            <Field
              label="Event Type"
              id="type"
              name="type"
              type="dropdown"
              value={data.type}
              onChange={handleChange}
              required={false}
              options={{
                "il": "Internal Lesson",
                "ic": "Internal CCA",
                "ie": "Internal Event",
                "ec": "External Competition",
                "ee": "External Event",
              }}
            />
          </div>
          <div className={styles.editFormRow}>
            <Field
              label="Event Description"
              id="description"
              name="description"
              type="textarea"
              value={data.description}
              onChange={handleChange}
              required={false}
            />
          </div> 
          <div className={styles.editFormRow}>
            <Field
              label="Spectators Welcome"
              id="spectators"
              name="spectators"
              type="dropdown"
              value={data.spectators}
              onChange={handleChange}
              required={false}
              options={{
                "y": "Yes",
                "n": "No"
              }}
            />
          </div> 
          <div className={styles.editFormRow}>
            <Field
              label="Open to Sharing"
              id="sharing"
              name="sharing"
              type="dropdown"
              value={data.sharing}
              onChange={handleChange}
              required={false}
              options={{
                "y": "Yes",
                "n": "No"
              }}
            />
          </div> 
          <div className={styles.editFormRow}>
            <Field
              label="Recurrence"
              id="recurrence"
              name="recurrence"
              type="dropdown"
              value={data.recurrence}
              onChange={handleChange}
              required={false}
              options={{
                "n": "Once-Off",
                "d": "Day",
                "w": "Week",
                "m": "Month",
              }}
            />
          </div> 
          <div className={styles.editFormRow}>
            <Field
              label="Start Datetime"
              id="start"
              name="start"
              type="datetime-local"
              value={data.start}
              onChange={handleChange}
              required={false}
            />
          </div>
          <div className={styles.editFormRow}>
            <Field
              label="End Datetime"
              id="end"
              name="end"
              type="datetime-local"
              value={data.end}
              onChange={handleChange}
              required={false}
            />
          </div>
          <div className={styles.editFormRow}>
            <Button text="Submit" />
          </div>
        </form>
      </div>
    </>
  )
}