"use client"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import styles from "./Navbar.module.css"
import Link from "next/link"
import classNames from "classnames"
import { Location } from "@prisma/client"
import Image from "next/image"
import settingsIcon from "./settings.svg"

export default function NavBar({
  locations,
  session
}: {
  locations: Location[],
  session: any | null
}) {
  const active = usePathname()

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <Link
          href="/"
          className={classNames(
            styles.navlink,
            active === "/" ? styles.selected : "",
          )}
        >
          Home
        </Link>
        {locations.map((location) => (
          <Link
            href={`/${location.id}`}
            className={classNames(
              styles.navlink,
              active?.match(`^/${location.id}`) !== null ? styles.selected : "",
            )}
            key={location.id}
          >
            {location.name}
          </Link>
        ))}
      </div>

      <div className={styles.right}>
        {session?.user?.admin && (
          <Link
            href="/admin"
            className={classNames(
              styles.navlink,
              active?.match("^/admin") ? styles.selected : "",
            )}
          >
            Admin
          </Link>
        )}

        {session?.user?.email ? (
          <div
            className={styles.navlinkIcon}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <Image className={styles.icon} src={settingsIcon} alt="Settings" />
          </div>
        ) : (
          <Link
            href="/login"
            className={classNames(
              styles.navlink,
              active?.match("^/login") ? styles.selected : "",
            )}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  )
}