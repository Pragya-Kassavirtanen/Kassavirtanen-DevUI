import React from 'react'
import { TextField, Checkbox, SelectField, DatePicker, TimePicker, RadioButtonGroup, Slider } from 'material-ui'
import DateTimeFormat from './DateTimeFormat'

export const renderTextField = ({ input, label, disabled, hintText, style, meta: { touched, error }, ...custom, autoFocus }) => (
  <TextField hintText={hintText}
             style={!style ? { textAlign: 'left' } : style}
             className="dashboard-input-wrapper"
             floatingLabelText={label}
             errorText={ touched && error }
             {...input}
             autoFocus={autoFocus}
             onFocus={ e => e.target.select()  }
             disabled={disabled}
             {...custom}/>
)

// Warning: Failed prop type: Invalid prop `value` of type `string` supplied to `DatePicker`, expected `object`.
export const renderDatePicker = ({ input, hintText, container, mode, meta: { touched, error }, minDate, maxDate, onChangeCallback, floatingLabelText, textFieldStyle, ...custom}) => (
  <DatePicker hintText={hintText}
              mode={mode}
              errorText={ touched && error }
              {...input}
              onChange={ (e, val) => {
                input.onChange(val)
                onChangeCallback(val)
              } }
              onDismiss={ (e, val) => {
                input.onChange(val)
                onChangeCallback(val)
              }}
              {...custom}
              formatDate={new DateTimeFormat('fi', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
              }).format
              }
              container={container}
              value={typeof input.value === 'string' ? null : input.value}
              minDate={minDate}
              maxDate={maxDate}
              textFieldStyle={textFieldStyle}
              floatingLabelText={floatingLabelText}/>
)

export const renderTimePicker = ({ input, meta: { touched, error }, onChangeCallback, floatingLabelText, textFieldStyle, ...custom}) => (
  <TimePicker errorText={ touched && error }
              {...input}
              onChange={ (e, val) => {
                input.onChange(val)
                onChangeCallback(val)
              } }
              onDismiss={ (e, val) => {
                input.onChange(val)
                onChangeCallback(val)
              }}
              {...custom}
              format="24hr"
              value={typeof input.value === 'string' ? null : input.value}
              textFieldStyle={textFieldStyle}
              floatingLabelText={floatingLabelText}/>
)

export const renderCheckbox = ({ input, label, disabled }) => (
  <Checkbox label={label}
            checked={!!input.value}
            onCheck={input.onChange}
            disabled={disabled}/>
)

export const renderRadioButtonGroup = ({ input, name, children, defaultSelected }) => (
  <RadioButtonGroup
    defaultSelected={defaultSelected}
    name={name}
    children={children}
    {...input}
  />
)

export const renderSlider = ({ input, min, max, step }) => (
  <Slider
    {...input}
    onChange={ (e, val) => {
      input.onChange(val)
    }}
    min={min}
    max={max}
    step={step}
  />
)

export const renderSelectField = ({ input, maxHeight, fullWidth, label, style, meta: { touched, error }, children }) => (
  <SelectField floatingLabelText={label}
               fullWidth={fullWidth}
               style={!style ? { width: '100%', margin: 0 } : style}
               errorText={ touched && error }
               {...input}
               children={children}
               maxHeight={maxHeight}
               onChange={(event, index, value) => input.onChange(value)}
               />
)

export const renderInputFile = ({ input, id }) => (
  <input type="file"
         id={id}
         onChange={input.onChange} />
)

export const renderExpenseTextField = ({ input, label, disabled, hintText, textareaStyle, meta: { touched, error }, ...custom }) => (
  <TextField hintText={hintText} style={{ textAlign: 'left' }}
             className="dashboard-expense"
             floatingLabelText={label}
             errorText={ touched && error }
             {...input}
             onFocus={ e => e.target.select()  }
             disabled={disabled}
             textareaStyle={textareaStyle}
             {...custom}/>
)
