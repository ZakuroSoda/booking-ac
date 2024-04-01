import classNames from "classnames"
import styles from "./Card.module.css"

export default function Card() {
  return (
    <>
      <div className={classNames(styles.galleryItem, styles.galleryItemRed)}>
        <div className={styles.galleryItemHeader}>
          AstroTurf: Football NSG
        </div>
        <ul>
          <li>Spectators welcome</li>
          <li>Not open for sharing</li>
          <li>External Competition</li>
          <li>Once-Off</li>
        </ul>
        <blockquote>Football NSG match between ACSI and ACSJ. Come down to support the primary school children fighting against the U16s!</blockquote>
      </div>
    </>
  )
}