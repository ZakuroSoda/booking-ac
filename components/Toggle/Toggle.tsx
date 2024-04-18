import "./Toggle.css"

export default function Toggle() {
  return (
    <>
      <div className="toggleParent">
        <label className="toggleParentLabel">
          Preferences
        </label>
        <div className="toggleSection">
          <div className="title">Open to Sharing</div>
          <label className="switch">
            <input type="checkbox" />
            <div className="slider"></div>
            <div className="slider-card">
              <div className="slider-card-face slider-card-front"></div>
              <div className="slider-card-face slider-card-back"></div>
            </div>
          </label>
        </div>
        <div className="toggleSection">
          <div className="title">Spectators Welcome</div>
          <label className="switch">
            <input type="checkbox" />
            <div className="slider"></div>
            <div className="slider-card">
              <div className="slider-card-face slider-card-front"></div>
              <div className="slider-card-face slider-card-back"></div>
            </div>
          </label>
        </div>
      </div>
    </>
  )
}