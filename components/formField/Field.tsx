import classNames from "classnames"
import styles from "./Field.module.css"

/**
 * @param {onChange} onChange - Takes in event.target and handles the change in parent component
 * @param {options} options - Dropdown specific options
 * 
 */

export default function Field({
  label, id, name, type, value, onChange, required, options
}: {
  label: string,
  id: string,
  name: string,
  type: string | "dropdown" | "datetime-local",
  value: string,
  onChange: any,
  required: boolean,
  options?: { [key: string]: string }
  maxTime?: string
  //Todo: maxTime doesn't seem to work, but minTime does
}) {
  if (type === "dropdown") return (
    <>
      <div className={styles.parent}>
        <select
          className={styles.field}
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target)}
          required={required}
        >
          {options && Object.keys(options).map((key) => (
            <option key={key} value={key}>{options[key]}</option>
          ))}
        </select>
        <label className={styles.fieldLabel} htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  )
  else if (type === "datetime-local") return (
    <>
    <div className={styles.parent}>
      <input
        className={styles.field}
        type="datetime-local"
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target)}
        required={required}
        min={getCurrentTimeISOString()}
        max={options?.maxTime}
      />
      <label className={styles.fieldLabel} htmlFor={id}>
        {label}
      </label>
    </div>
    </>
  )
  else if (type === "textarea") return (
    <>
    <div className={styles.parent}>
      <textarea
        className={classNames(styles.field, styles.textArea)}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target)}
        required={required}
        // DO NOT SET PLACEHOLDER - this will cause label to be IN textarea 
      />
      <label className={styles.fieldLabel} htmlFor={id}>
        {label}
      </label>
    </div>
    </>
  )
  else return (
    <>
      <div className={styles.parent}>
        <input
          className={styles.field}
          type={type}
          id={id}
          name={name}
          placeholder=" "
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target)}
          required={required}
        />
        <label className={styles.fieldLabel} htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  )
}

function getCurrentTimeISOString() {
  const now = new Date();
  return now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
}