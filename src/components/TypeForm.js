import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Heading, Link, Input, Textarea } from 'theme-ui'
import { useForm, errors, setValue } from 'react-hook-form'

const TypeForm = props => {
  const [current, setCurrent] = useState(0)
  const [fields, setFields] = useState([])
  const currentRef = useRef(null)

  const { handleSubmit, register } = useForm()
  // const onSubmit = values => {
  //   console.log(`form submit values ---> : ${JSON.stringify(values, null, 2)}`)

  //   props.addProject(values)
  //   console.log('HI FIVE')
  //   return false
  // }

  const goForward = evt => {
    if (current < props.fields.length) {
      console.log(`goForward current : ${JSON.stringify(current, null, 2)}`)

      console.log(`props.fields[i] ---> : ${props.fields[current]}`)
      const { value, type, name } = currentRef.current
      const { label, headStyle } = props.fields.filter(o => o.name === name)[0]

      setCurrent(current + 1)
      addFormValue(value, type, name, label, headStyle)
    }
    props.nextBtnOnClick()
  }

  /** Decrement State counter */
  const goBackward = () => {
    if (current > 0) {
      console.log(
        `goBackward current : ${JSON.stringify(current - 1, null, 2)}`
      )

      setCurrent(current - 1)
    }
    props.backBtnOnClick()
  }

  /** Check if last component */
  const isFirstComponent = () => {
    return current === 0
  }

  /** Check if last component */
  const isLastComponent = () => {
    console.log(`props.showReviewView ---> : ${props.showReviewView}`)
    console.log(`props.fields.length ---> : ${props.fields.length}`)
    console.log(`current ---> : ${current}`)
    return props.showReviewView
      ? current === props.fields.length
      : current === props.fields.length - 1
  }

  const editField = name => {
    console.log(`edit name ---> : ${name}`)
  }
  const handleChange = e => {
    setValue('AntdInput', e.target.value)
  }
  const getFormField = (type, name, value) => {
    if (type === 'text') {
      return (
        <Input
          name={name}
          id={name}
          ref={register}
          mb={3}
          value={value}
          onChange={handleChange}
        />
      )
    } else if (type === 'textarea') {
      return (
        <Textarea
          name={name}
          id={name}
          ref={register}
          rows='6'
          mb={3}
          value={value}
          onChange={handleChange}
        />
      )
    }
  }
  const showFinalDetails = data => {
    //console.log(`data : ${JSON.stringify(data, null, 2)}`)

    return (
      <Box as='form' onSubmit={handleSubmit(props.onSubmit)}>
        {data.map((o, key) => {
          const { name, type, value, headStyle } = o
          console.log(`o.name ---> : ${name}`)
          console.log(`o.type ---> : ${type}`)
          console.log(`o.value ---> : ${value}`)
          console.log(`o.headStyle ---> : ${headStyle}`)

          return (
            <Box key={'box ' + key}>
              {getFormField(type, name, value)}
              <Heading key={'heading-' + key} pb={2} as='h3' color='muted'>
                {o.label}
                {'  '}
                <Link
                  sx={{
                    color: 'primary'
                  }}
                  to={editField(o.name)}
                >
                  Edit
                </Link>
              </Heading>
              <Heading
                key={'heading2-' + key}
                pb={4}
                as={o.headStyle}
                color='secondary'
              >
                {o.value}
              </Heading>
            </Box>
          )
        })}
        <Button
          sx={{ variant: 'buttons.default' }}
          type='submit'
          className={props.submitBtnClass}
        >
          {props.submitBtnText}
        </Button>
      </Box>
    )
  }

  const updateFormValue = (value, type, name, label, headStyle) => {
    setFields(
      fields.concat({
        value,
        type,
        name,
        label,
        headStyle
      })
    )
  }

  const addFormValue = (value, type, name, label, headStyle) => {
    setFields(
      fields.concat({
        value,
        type,
        name,
        label,
        headStyle
      })
    )
  }
  //const Component = React.createElement(props.fields[current].component)

  console.log(`fields : ${JSON.stringify(fields, null, 2)}`)

  /** render the typeform */
  return (
    <Box>
      {/* {getCurrentView(props.children)} */}

      {!isLastComponent() &&
        React.createElement(props.fields[current].component, { currentRef })}
      {isLastComponent() && showFinalDetails(fields)}
      {/* {!isFirstComponent() && (
        <Button
          sx={{ variant: 'buttons.default' }}
          onClick={goBackward}
          className={props.backBtnClass}
        >
          {props.backBtnText}
        </Button>
      )} */}
      {!isLastComponent() && (
        <Button
          sx={{ variant: 'buttons.default' }}
          type='button'
          onClick={goForward.bind(this)}
          className={props.nextBtnClass}
        >
          {props.nextBtnText}
        </Button>
      )}
    </Box>
  )
}

/** Validating propTypes */
TypeForm.propTypes = {
  backBtnClass: PropTypes.string,
  backBtnOnClick: PropTypes.func,
  backBtnText: PropTypes.string,
  fields: PropTypes.array.isRequired,
  completionText: PropTypes.string,
  nextBtnClass: PropTypes.string,
  nextBtnOnClick: PropTypes.func,
  nextBtnText: PropTypes.string,
  onSubmit: PropTypes.func,
  showReviewView: PropTypes.bool,
  submitBtnClass: PropTypes.string,
  submitBtnText: PropTypes.string
}

/** Default Props */
TypeForm.defaultProps = {
  backBtnOnClick: () => {},
  backBtnText: 'Back',
  nextBtnOnClick: () => {},
  nextBtnText: 'Next',
  onSubmit: () => {},
  showReviewView: true,
  submitBtnText: 'Save'
}

/** export the typeform component */
export default TypeForm
