import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Heading, Link } from 'theme-ui'
var util = require('util')

const TypeForm = props => {
  const [current, setCurrent] = useState(0)
  const [fields, setFields] = useState([])
  const currentRef = useRef(null)

  const styles = {
    tfShow: {
      display: 'block'
    },
    tfHide: {
      display: 'none'
    }
  }

  const setClass = (element, tfStyle) => {
    if (!element) {
      return null
    }
    const Element = element.type

    return (
      <div style={tfStyle}>
        <Element ref={React.createRef()} {...element.props} />
      </div>
    )
  }

  // const getCurrentView = children => {
  //   let allChildren = []
  //   allChildren = React.Children.map(children, (child, index) => {
  //     let currentChild = setClass(child, styles.tfHide)
  //     if (index === current) {
  //       currentChild = setClass(child, styles.tfShow)
  //     }
  //     console.log(`currentChild ---> : ${currentChild}`)

  //     return currentChild
  //   })
  //   /** If all elements are shown then conditionally show a review screen */
  //   if (isLastComponent() && props.showReviewView) {
  //     React.Children.map(children, child =>
  //       allChildren.push(setClass(child, styles.tfShow))
  //     )
  //     if (props.completionText) {
  //       allChildren.push(
  //         <div className='form-completion-text'>{props.completionText}</div>
  //       )
  //     }
  //   }
  //   return allChildren
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
    return props.showReviewView
      ? current === props.fields.length
      : current === props.fields.length - 1
  }

  const editField = name => {
    console.log(`edit name ---> : ${name}`)
  }
  const showFinalDetails = data => {
    //console.log(`data : ${JSON.stringify(data, null, 2)}`)

    return data.map(o => {
      console.log(`o.name ---> : ${o.name}`)
      console.log(`o.type ---> : ${o.type}`)
      console.log(`o.value ---> : ${o.value}`)
      console.log(`o.headStyle ---> : ${o.headStyle}`)

      return (
        <>
          <Heading pb={2} as='h3' color='muted'>
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
          <Heading pb={4} as={o.headStyle} color='secondary'>
            {o.value}
          </Heading>
        </>
      )
    })
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
    <div className='form-container'>
      {/* {getCurrentView(props.children)} */}
      {!isLastComponent() &&
        React.createElement(props.fields[current].component, { currentRef })}
      {isLastComponent() && showFinalDetails(fields)}
      {!isFirstComponent() && (
        <Button
          sx={{ variant: 'buttons.default' }}
          onClick={goBackward}
          className={props.backBtnClass}
        >
          {props.backBtnText}
        </Button>
      )}
      {isLastComponent() ? (
        <Button
          sx={{ variant: 'buttons.default' }}
          type='submit'
          onClick={props.onSubmit}
          className={props.submitBtnClass}
        >
          {props.submitBtnText}
        </Button>
      ) : (
        <Button
          sx={{ variant: 'buttons.default' }}
          onClick={goForward.bind(this)}
          className={props.nextBtnClass}
        >
          {props.nextBtnText}
        </Button>
      )}
    </div>
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
