import "./Toggle.css"

export default function Toggle({
  header, onChange, data
}:
  {
    header: string,
    onChange: any,
    data: {
      label: string,
      id: string,
      name: string,
      value: string,
    }[]
  }) {
  return (
    <>
      <div className="toggleParent">
        <label className="toggleParentLabel">
          {header}
        </label>
        {data.map((item, index) => {
          return (
            <div className="toggleSection" key={index}>
              <div className="title">{item.label}</div>
              <label className="switch">
                <input
                  type="checkbox"
                  id={item.id}
                  name={item.name}
                  onChange={(e) => {
                    e.target.value = e.target.checked ? "y" : "n"
                    onChange(e.target)
                  }}
                />
                <div className="slider"></div>
                <div className="slider-card">
                  <div className="slider-card-face slider-card-front"></div>
                  <div className="slider-card-face slider-card-back"></div>
                </div>
              </label>
            </div>
          )
        })}
      </div>
    </>
  )
}