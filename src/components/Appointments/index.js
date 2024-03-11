// Write your code here
import {format} from 'date-fns'
import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
    appointmentList: [],
  }
  onSubmittingForm = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    console.log('Submitting Form:', titleInput, dateInput)
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }
  onClickTitle = event => {
    this.setState({titleInput: event.target.value})
  }
  onClickDate = event => {
    this.setState({dateInput: event.target.value})
  }
  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }
  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }
  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }
  renderAppointmentsList() {
    const filterAppointmentList = this.getFilteredAppointmentList()
    return (
      <div className="appointments-block-container">
        <div className="appointments-heading-part">
          <h1>Appointments</h1>
          <button
            className="button-starred"
            type="button"
            onClick={this.onFilter}
          >
            Starred
          </button>
        </div>
        <div className="appointments-content-part">
          <ul>
            {filterAppointmentList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
  render() {
    const {titleInput, dateInput} = this.state
    return (
      <div className="app-container">
        <div className="appointments-container">
          <h1>Add Appointment</h1>
          <form className="form-element" onSubmit={this.onSubmittingForm}>
            <div className="inputs">
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                placeholder="TEXT"
                onChange={this.onClickTitle}
                value={titleInput}
              />
              <label htmlFor="calendar">DATE</label>
              <input
                type="date"
                onChange={this.onClickDate}
                value={dateInput}
              />
              <button className="button" type="submit">
                Add
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image-container"
            />
          </form>
          <hr className="line" />
          {this.renderAppointmentsList()}
        </div>
      </div>
    )
  }
}
export default Appointments
