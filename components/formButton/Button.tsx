import styles from "./Button.module.css"

export default function Button({
  text, type, onClick
}: {
  text: string,
  type: "default" | "danger"
  onClick?: any
}) {
  return (
    <button
      type="submit"
      className={
        type === "default" ? 
        styles.defaultButton : 
        styles.dangerButton}
      onClick={onClick}
    >
      {text}
    </button>
  )
}