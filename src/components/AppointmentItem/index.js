// Write your code here
const AppointmentItem = props => {
  const {inputDetails, toggleIsStarred} = props
  const {title, date, isStarred, id} = inputDetails
  const onClickStar = () => {
    toggleIsStarred(id)
  }
  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <div className="appointment-item-container">
      <li className="appointment-item">
        <div className="appointment-item-top">
          <h1 className="appointment-item-heading">{title}</h1>
          <button className="star-button" onClick={onClickStar}>
            <img src={starImageUrl} alt="star" />
          </button>
        </div>
        <p>
          Date:<span>{date}</span>
        </p>
      </li>
    </div>
  )
}
export default AppointmentItem
