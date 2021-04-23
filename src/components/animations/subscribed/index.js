import React from 'react'
import Lottie from 'react-lottie'
import animationData from './animation.json'

export default class LottieControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isStopped: false, isPaused: false }
  }

  render() {
    const buttonStyle = {
      display: 'block',
      margin: '10px auto'
    }

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

    return (
      <div>
        <Lottie
          options={defaultOptions}
          height={this.props?.size || 400}
          width={this.props?.size || 400}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
          isClickToPauseDisabled={true}
        />
        {/* <button
          style={buttonStyle}
          onClick={() => this.setState({ isStopped: true })}
        >
          stop
        </button>
        <button
          style={buttonStyle}
          onClick={() => this.setState({ isStopped: false })}
        >
          play
        </button>
        <button
          style={buttonStyle}
          onClick={() => this.setState({ isPaused: !this.state.isPaused })}
        >
          pause
        </button> */}
      </div>
    )
  }
}
