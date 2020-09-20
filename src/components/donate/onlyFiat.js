/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { Box, Button, Checkbox, Label, Text, jsx } from 'theme-ui'
import Tooltip from '../../components/tooltip'
import styled from '@emotion/styled'
import { loadStripe } from '@stripe/stripe-js'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51HEyBOEqxdqUJJCY7s5q5WPcEQKsC0w5FStn48BVFiIPiLGHoP7Oh6kojZSES8MZXYoEfQSu1LXY749LHMRF03Hy00X8SvZA8B'
)

const Content = styled.div`
  max-width: 41.25rem;
  word-wrap: break-word;
`

const AmountSection = styled.div`
  margin: 1.3rem 0 0 0;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`

const OpenAmount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const AmountItems = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`

const AmountItem = styled.div`
  flex: 0.2;
  padding: 1.5rem 0;
  text-align: center;
  cursor: pointer;
  border: 1px white solid;
  border-radius: 6px;
`

const Input = styled.input`
  background: transparent;
  border: none;
  padding: 1rem 0.4rem;
  outline: none;
  color: white;
`

const OnlyFiat = props => {
  const { project } = props
  const [amountSelect, setAmountSelect] = useState(null)

  const amounts = [500, 100, 50, 30]

  useEffect(() => {}, [])

  const goCheckout = async event => {
    // Get Stripe.js instance
    const stripe = await stripePromise

    // Call your backend to create the Checkout Session
    const response = await fetch('/create-checkout-session', { method: 'POST' })

    const session = await response.json()

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }

  const AmountSelection = () => {
    return (
      <AmountItems>
        {amounts.map((i, index) => {
          const isSelected = amountSelect === i
          return (
            <AmountItem
              key={index}
              onClick={() => setAmountSelect(i)}
              sx={{
                backgroundColor: isSelected ? 'white' : 'transparent',
                color: isSelected ? 'secondary' : 'white'
              }}
            >
              <Text sx={{ variant: 'text.large', fontWeight: '700' }}>
                ${i}
              </Text>
            </AmountItem>
          )
        })}
      </AmountItems>
    )
  }

  return (
    <Content>
      <AmountSection>
        <AmountSelection />
        <div style={{ margin: '2rem 0' }}>
          <Text sx={{ variant: 'text.medium' }}>Or enter your amount:</Text>
          <OpenAmount>
            <Text sx={{ variant: 'text.large' }}>$</Text>
            <Input
              sx={{
                variant: 'text.large',
                '::placeholder': {
                  color: 'anotherGrey'
                }
              }}
              placeholder='Amount'
              type='text'
            />
          </OpenAmount>
        </div>
        <div>
          <Label sx={{ mb: '10px', alignItems: 'center' }}>
            <Checkbox defaultChecked={false} />
            <Text sx={{ variant: 'text.medium' }}>
              Be a hero, add <strong> $5</strong> to help sustain Giveth
            </Text>
            <Tooltip content='When you donate to Giveth you put a smile on our face because we can continue to provide support and further develop the platform.' />
          </Label>
          <Label sx={{ mb: '10px', alignItems: 'center', color: 'white' }}>
            <Checkbox defaultChecked={false} sx={{ color: 'white' }} />
            <Text sx={{ variant: 'text.medium' }}>Donate anonymously</Text>
            <Tooltip content='When you donate anonymously, your name will never appear in public as a donor. But, your name will be recorded so that we can send a tax donation receipt.' />
          </Label>
          {/* <Label sx={{ mb: '10px', alignItems: 'center' }}>
            <Checkbox defaultChecked={false} />
            <Text sx={{ variant: 'text.medium' }}>Dedicate this donation</Text>
          </Label> */}
        </div>
        <Button
          onClick={goCheckout}
          sx={{
            variant: 'buttons.default',
            padding: '1.063rem 7.375rem',
            marginTop: '2rem'
          }}
        >
          Donate
        </Button>
      </AmountSection>
    </Content>
  )
}

export default OnlyFiat
