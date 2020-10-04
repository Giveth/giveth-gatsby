/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { Box, Button, Checkbox, Label, Text, jsx } from 'theme-ui'
import { useApolloClient } from '@apollo/react-hooks'
import Tooltip from '../../components/tooltip'
import styled from '@emotion/styled'
import { loadStripe } from '@stripe/stripe-js'
import { GET_DONATION_SESSION } from '../../apollo/gql/projects'

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

const AmountContainer = styled.div`
  margin: 2rem 0;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

const AmountItem = styled.div`
  flex: 0.2;
  padding: 1.5rem 0;
  text-align: center;
  cursor: pointer;
  border: 1px white solid;
  border-radius: 6px;
  @media (max-width: 800px) {
    margin: 0.5rem 0;
  }
`

const Input = styled.input`
  background: transparent;
  border: none;
  padding: 1rem 0.4rem;
  outline: none;
  color: white;
`

const CheckboxLabel = styled(Label)`
  @media (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`

const OnlyFiat = props => {
  const { project } = props
  const [amountSelect, setAmountSelect] = useState(null)
  const client = useApolloClient()
  // const [getDonationSession, { called, loading, data, error }] = useLazyQuery(
  //   GET_DONATION_SESSION,
  //   {
  //     variables: {
  //       projectId: 1,
  //       amount: data.amount,
  //       anonymous: true,
  //       donateToGiveth: true,
  //       successUrl: `http://localhost:8000/donate/${1}?success=true`,
  //       cancelUrl: `http://localhost:8000/donate/${1}?success=false`
  //     }
  //   }
  // )
  const amounts = [500, 100, 50, 30]

  useEffect(() => {}, [])

  const goCheckout = async event => {
    try {
      if (!amountSelect) return alert('Please set an amount before donating')
      // await getDonationSession({ variables: { amount: amountSelect } })
      const { data } = await client.query({
        query: GET_DONATION_SESSION,
        variables: {
          projectId: 1,
          amount: parseInt(amountSelect),
          anonymous: true,
          donateToGiveth: true,
          successUrl: `http://localhost:8000/donate/${1}?success=true`,
          cancelUrl: `http://localhost:8000/donate/${1}?success=false`
        }
      })
      console.log({ data })
      goStripe(data)
    } catch (error) {
      console.log({ error })
    }
  }

  const goStripe = async data => {
    // Get Stripe.js instance
    const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY, {
      stripeAccount: data?.getStripeProjectDonationSession?.accountId
    })
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: data?.getStripeProjectDonationSession?.sessionId
    })

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }

  // if (called && !loading) {
  //   goStripe()
  // }

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
        <AmountContainer>
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
              type='number'
              onChange={e => {
                e.preventDefault()
                setAmountSelect(e.target.value)
              }}
            />
          </OpenAmount>
        </AmountContainer>
        <div>
          <CheckboxLabel sx={{ mb: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Checkbox defaultChecked={false} />
              <Text sx={{ variant: 'text.medium', textAlign: 'left' }}>
                Be a hero, add <strong> $5</strong> to help sustain Giveth
              </Text>
            </div>
            <Tooltip content='When you donate to Giveth you put a smile on our face because we can continue to provide support and further develop the platform.' />
          </CheckboxLabel>
          <CheckboxLabel
            sx={{ mb: '12px', alignItems: 'center', color: 'white' }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Checkbox defaultChecked={false} />
              <Text sx={{ variant: 'text.medium', textAlign: 'left' }}>
                Donate anonymously
              </Text>
            </div>
            <Tooltip content='When you donate anonymously, your name will never appear in public as a donor. But, your name will be recorded so that we can send a tax donation receipt.' />
          </CheckboxLabel>
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
