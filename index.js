// Your code here

function createEmployeeRecord(data) {
    return {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(data) {
    return data.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee, dateStamp) {
    let timeIn = employee.timeInEvents.find(event => event.date === dateStamp)
    let timeOut = employee.timeOutEvents.find(event => event.date === dateStamp)
    let result = (timeOut.hour - timeIn.hour) / 100
    return parseInt(result)
}

function wagesEarnedOnDate(employee, dateStamp) {
    let hoursWorked = hoursWorkedOnDate(employee, dateStamp)
    return hoursWorked * employee.payPerHour
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => event.date)
    let wages = dates.map(date => wagesEarnedOnDate(employee, date))
    let result = wages.reduce((total, wage) => total + wage)
    return result
}

function calculatePayroll(employeeRecords){
    const res = employeeRecords.map(employee => allWagesFor(employee))
    return res.reduce((total, wagePerEmployee) => total + wagePerEmployee)
}







