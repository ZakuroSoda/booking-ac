"use client"
import { useState } from "react"
import { toast } from "react-toastify"
import { signIn } from "next-auth/react"
import styles from "./LoginForm.module.css"
import Field from "@/components/formField/Field"
import Button from "@/components/formButton/Button"

export default function LoginForm() {
  const [email, setEmail] = useState('')

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setEmail(e?.target?.value)

    if (!validateEmail(email)) {
      toast.error("Invalid email")
    } else {
      toast.loading("Sending magic link to your email...")
      const result = await signIn("email", {
        email: email,
        redirect: false,
      })

      if (result && !result.error) {
        toast.dismiss();
        toast.success(
          "Check your inbox for the magic link to login!",
        );
      } else {
        toast.dismiss();
        toast.error((result?.error == "AccessDenied") ? "Email not in whitelist!" : result?.error ?? "An error occurred")
      }
    }
  }
  return (
    <>
      <div className={styles.login}>
        <div className={styles.loginHeader}>Login</div>
        <div className={styles.loginDesc}>A magic login link will be sent to your inbox, if your email is in our whitelist.</div>
        <form className={styles.loginForm} onSubmit={(e) => handleLogin(e)}>
          <div className={styles.loginFormRow}>
            <Field
              label="Email"
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(target: any) => setEmail(target.value)}
              required={true}
            />
          </div>
          <div className={styles.loginFormRow}>
            <Button text="Submit" />
          </div>
        </form>
      </div>
    </>
  )
}

function validateEmail(email: string) {
  return email?.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  );
}