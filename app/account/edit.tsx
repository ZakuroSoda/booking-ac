"use client"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import styles from "./edit.module.css"
import Field from "@/components/formField/Field"
import Button from "@/components/formButton/Button"
import { signOut } from "next-auth/react"

export default function Edit({ username }: { username?: string | null }) {
  const [name, setName] = useState(username ?? '')
  const [saved, setSaved] = useState(true)

  // Changes that you made may not be saved.
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (name !== username && !saved) {
        e.preventDefault()
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => { window.removeEventListener("beforeunload", handleBeforeUnload) }
  }, [name])

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setName(e?.target?.value)

    if (name?.length < 3 || name?.length > 16) {
      toast.error("Name must be between 3 and 16 characters!")
    } else {
      const result = await fetch("/api/edit-name", {
        method: "POST",
        body: JSON.stringify({ name }),
      })
      if (result.status !== 200) {
        toast.dismiss()
        const text = await result.json()
        toast.error(text.response)
      }
      else if (result.status === 200) {
        toast.dismiss()
        toast.success("Name successfully updated!")
        setSaved(true)
        setName(name)
      }
    }
  }

  return (
    <>
      <div className={styles.edit}>
        <div className={styles.editHeader}>Account</div>
        <div className={styles.editDesc}>Edit your public display name here.</div>
        <form className={styles.editForm} onSubmit={(e) => handleLogin(e)}>
          <div className={styles.editFormRow}>
            <Field
              label="Name"
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(target: any) => {
                setSaved(false)
                setName(target.value)
              }}
              required={true}
            />
          </div>
          {!saved && (
            <div className={styles.saveButton}>
              <Button type="default" text="Save" />
            </div>
          )}
        </form>
        <div className={styles.editForm}>
          <Button type="danger" text="Logout" onClick={() => signOut({ callbackUrl: '/' })}/>
        </div>
      </div>
    </>
  )
}