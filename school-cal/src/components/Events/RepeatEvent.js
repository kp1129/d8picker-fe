import React, { useEffect, useState } from "react"
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import { RRule } from "rrule"

const repeats = [
  { id: 1, name: "Never" },
  { id: 2, name: "Daily" },
  { id: 3, name: "Every Week" },
  { id: 4, name: "Every Month" },
  { id: 5, name: "Every Year" },
  { id: 6, name: "Every Weekday" },
  { id: 7, name: "Custom..." }
]

const RepeatEvent = ({ field, form, startTime, until }) => {
  const update = new Date(startTime)

  const [repeatSelection, setRepeatSelection] = useState({
    id: 1,
    name: "Never"
  })

  const [rule, setRule] = useState({
    freq: RRule.DAILY,
    interval: 1,
    byweekday: null,
    until: until,
    wkst: RRule.SU
  })

  const [customRule, showCustomRule] = useState(false)

  useEffect(() => {
    if (repeatSelection.name !== "Never") {
      const ruleString = new RRule(rule).toString()

      form.setFieldValue("rrule", ruleString)
    } else {
      form.setFieldValue("rrule", null)
    }
  }, [rule, repeatSelection])

  useEffect(() => {
    repeatSelection.name === "Custom..."
      ? showCustomRule(true)
      : showCustomRule(false)
  }, [repeatSelection])

  const handleRepeatSelectionChange = e => {
    setRepeatSelection(repeats.find(repeat => repeat.id === e.target.value))

    const selection = e.target.value

    if (selection === 2) {
      setRule({
        ...rule,
        freq: RRule.DAILY,
        dtstart: new Date(
          Date.UTC(
            update.getFullYear(),
            update.getMonth(),
            update.getDate(),
            update.getHours(),
            update.getMinutes()
          )
        )
      })
    } else if (selection === 3) {
      setRule({
        ...rule,
        freq: RRule.WEEKLY,
        dtstart: new Date(
          Date.UTC(
            update.getFullYear(),
            update.getMonth(),
            update.getDate(),
            update.getHours(),
            update.getMinutes()
          )
        )
      })
    } else if (selection === 4) {
      setRule({
        ...rule,
        freq: RRule.MONTHLY,
        dtstart: new Date(
          Date.UTC(
            update.getFullYear(),
            update.getMonth(),
            update.getDate(),
            update.getHours(),
            update.getMinutes()
          )
        )
      })
    } else if (selection === 5) {
      setRule({
        ...rule,
        freq: RRule.YEARLY,
        dtstart: new Date(
          Date.UTC(
            update.getFullYear(),
            update.getMonth(),
            update.getDate(),
            update.getHours(),
            update.getMinutes()
          )
        )
      })
    } else if (selection === 6) {
      setRule({
        ...rule,
        freq: RRule.DAILY,
        byweekday: [0, 1, 2, 3, 4],
        dtstart: new Date(
          Date.UTC(
            update.getFullYear(),
            update.getMonth(),
            update.getDate(),
            update.getHours(),
            update.getMinutes()
          )
        )
      })
    }
  }

  const handleCustomRuleChange = custom => {
    setRule({
      ...rule,
      freq: custom.freqRule,
      interval: custom.frequencyInterval,
      byweekday: custom.checkedDays,
      dtstart: new Date(
        Date.UTC(
          update.getFullYear(),
          update.getMonth(),
          update.getDate(),
          update.getHours(),
          update.getMinutes()
        )
      )
    })
  }

  return (
    <>
      <Select
        name="repeatSelection"
        value={repeatSelection.id}
        onChange={e => handleRepeatSelectionChange(e)}>
        {repeats.length > 0 &&
          repeats.map(repeat => (
            <MenuItem key={repeat.id} value={repeat.id}>
              {repeat.name}
            </MenuItem>
          ))}
      </Select>
      {customRule && <CustomRule handleChange={handleCustomRuleChange} />}
    </>
  )
}

const useCustomRuleStyles = makeStyles(theme => ({
  customRule: {
    margin: theme.spacing(2, 0)
  },
  frequencyInterval: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  }
}))

const CustomRule = ({ handleChange }) => {
  const classes = useCustomRuleStyles()
  const frequencies = [
    { freq: RRule.DAILY, name: "Daily" },
    { freq: RRule.WEEKLY, name: "Weekly" },
    { freq: RRule.MONTHLY, name: "Monthly" },
    { freq: RRule.YEARLY, name: "Yearly" }
  ]

  const initialDaysOfWeek = [
    { name: "Sun", value: RRule.SU, checked: false },
    { name: "Mon", value: RRule.MO, checked: false },
    { name: "Tue", value: RRule.TU, checked: false },
    { name: "Wed", value: RRule.WE, checked: false },
    { name: "Thu", value: RRule.TH, checked: false },
    { name: "Fri", value: RRule.FR, checked: false },
    { name: "Sat", value: RRule.SA, checked: false }
  ]
  const [frequency, setFrequency] = useState({
    freq: RRule.DAILY,
    name: "Daily"
  })

  const [dayOfWeek, setDayOfWeek] = useState(initialDaysOfWeek)
  const [checkedDays, setCheckedDay] = useState([])

  const [frequencyInterval, setFrequencyInterval] = useState(1)

  const [
    frequencyIntervalDescription,
    setFrequencyIntervalDescription
  ] = useState("day")

  useEffect(() => {
    handleChange({ freqRule: frequency.freq, frequencyInterval, checkedDays })
  }, [frequency, frequencyInterval, checkedDays])

  useEffect(() => {
    if (frequency.name === "Daily") {
      setFrequencyIntervalDescription("day")
    } else if (frequency.name === "Weekly") {
      setFrequencyIntervalDescription("week")
    } else if (frequency.name === "Monthly") {
      setFrequencyIntervalDescription("month")
    } else if (frequency.name === "Yearly") {
      setFrequencyIntervalDescription("year")
    }
  }, [frequency])

  const handleFrequencyChange = event => {
    setFrequency(
      frequencies.find(frequency => frequency.freq === event.target.value)
    )
  }

  const handleDayOfWeekChange = change => {
    setDayOfWeek(
      dayOfWeek.map(day => {
        if (day.name === change) {
          day.checked = !day.checked
        }
        return day
      })
    )

    const checkedDays = dayOfWeek
      .filter(day => day.checked)
      .map(day => day.value.weekday)

    setCheckedDay(checkedDays)
  }

  const handleFrequencyIntervalChange = event => {
    const interval = event.target.value
    const oldIntervalDescription = frequencyIntervalDescription
    if (interval > 1) {
      if (
        frequencyIntervalDescription.charAt(
          frequencyIntervalDescription.length - 1
        ) !== "s"
      ) {
        setFrequencyIntervalDescription(frequencyIntervalDescription + "s")
      }
    } else {
      console.log("Old ", oldIntervalDescription)
      setFrequencyIntervalDescription(
        frequencyIntervalDescription.substring(
          0,
          frequencyIntervalDescription.length - 1
        )
      )
    }
    setFrequencyInterval(event.target.value)
  }

  return (
    <div className={classes.customRule}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl style={{ minWidth: "120px" }}>
            <InputLabel>Frequency</InputLabel>
            <Select
              value={frequency.freq}
              name="frequency"
              onChange={e => handleFrequencyChange(e)}>
              {frequencies.length > 0 &&
                frequencies.map(frequency => (
                  <MenuItem key={frequency.freq} value={frequency.freq}>
                    {frequency.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.frequencyInterval}>
            <FormControl style={{ minWidth: "90px" }}>
              <TextField
                name="frequencyInterval"
                label="Every"
                type="number"
                value={frequencyInterval}
                onChange={e => handleFrequencyIntervalChange(e)}
                inputProps={{ min: "1", max: "10", step: "1" }}
              />
            </FormControl>
            <Typography>{frequencyIntervalDescription}</Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel component="legend">Repeat On</FormLabel>
            <FormGroup row>
              {dayOfWeek.length > 0 &&
                dayOfWeek.map((day, index) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={day.checked}
                        onChange={() => handleDayOfWeekChange(day.name)}
                      />
                    }
                    key={index}
                    label={day.name}
                  />
                ))}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}
export default RepeatEvent
