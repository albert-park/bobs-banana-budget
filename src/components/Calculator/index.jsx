import React, { Component } from 'react';
import { addDays, eachDay, isWeekend } from 'date-fns';
import DatePicker from 'react-date-picker';

class Calculator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: '',
      numberOfDays: 1,
      numberOfBananas: 0,
      daysRange: [],
      totalBudget: 0
    }
  }

  parsedDate = (date) => {
    return date.toString().split(' ');
  }
  
  calculateDaysRange = (startDate, numberOfDays) => {
    const endDate = numberOfDays ? numberOfDays - 1 : 1;
    const range = eachDay(
      startDate,
      addDays(startDate, endDate)
    )
    this.setState({
      daysRange: range
    })
  }

  calculateBudget = () => {
    this.setState({
      totalBudget: 0
    })
    const days = this.state.daysRange;
    let budgetTotal = 0.00;
    let numberOfBananas = 0;

    days.map((day) => {
      const dayNumber = parseInt(this.parsedDate(day)[2]);
      if (!isWeekend(day)) {
        console.log(dayNumber)
        numberOfBananas++;
        if (dayNumber <= 7) {
          budgetTotal += .05
        } else if (dayNumber > 7 && dayNumber <= 14) {
          budgetTotal += .10;
        } else if (dayNumber > 14 && dayNumber <= 21) {
          budgetTotal += .15;
        } else if (dayNumber > 21 && dayNumber <= 28) {
          budgetTotal += .20;
        } else {
          budgetTotal += .25;
        }
      }
      return true
    })
    this.setState({
      totalBudget: budgetTotal.toFixed(2),
      numberOfBananas: numberOfBananas
    });
  }

  handleDateSelect = (date) => {
    this.setState({
      startDate: date,
    })
    this.calculateDaysRange(date, this.state.numberOfDays)
  }

  handleNumberOfDays = (numberOfDays) => {
    this.setState({
      numberOfDays: numberOfDays
    })
    this.calculateDaysRange(this.state.startDate, numberOfDays)
  }

  handleClick = () => {
    this.setState({ totalBudget: 0 })
    this.calculateDaysRange(this.state.startDate, this.state.numberOfDays)
    this.calculateBudget();
  }
  
  render() {
    return (
      <div>
        <h1>Bob's Banana Budget</h1>
        <p className="center-text bottom-margin">
          Hi Bob! Welcome to your banana budgeting tool. Here, we will
          calculate how much you'll need to budget for bananas, starting at
          the selected date, and for the span of the selected number of
          days. Please complete the form below:
        </p>
        <h3>When is your starting date?</h3>
        <DatePicker className="bottom-margin" value={this.state.startDate} onChange={this.handleDateSelect} />
        <h3>How many days?</h3>
        <input className="bottom-margin" type="number" onChange={event => this.handleNumberOfDays(event.target.value)} />
        <br />
        <button className="bottom-margin" onClick={this.handleClick}>
          Calculate Budget
        </button>
        {this.state.totalBudget ? <div>
            <h1>Total Cost:</h1>
        <h1>${this.state.totalBudget} for {this.state.numberOfBananas} {this.state.numberOfBananas === 1 ? 'banana' : 'bananas' }!</h1>
            <img src="https://media.giphy.com/media/IB9foBA4PVkKA/giphy.gif" alt="" />
          </div> : null}
      </div>
    )
  }
}

export default Calculator;