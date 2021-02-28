/** @jsx jsx */
import React, { useState } from 'react'
import { Button, Checkbox, Input, Flex, Label, Text, jsx } from 'theme-ui'
import { useApolloClient } from '@apollo/client'
import Tooltip from '../../components/tooltip'
import styled from '@emotion/styled'
import { loadStripe } from '@stripe/stripe-js'
import { GET_DONATION_SESSION } from '../../apollo/gql/projects'
import theme from '../../gatsby-plugin-theme-ui/index'

import ComingSoon1 from '../../images/coming-soon-gear.png'
import ComingSoon2 from '../../images/coming-soon.png'

const GIVETH_DONATION_AMOUNT = 5
const COMING_SOON = true

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

const InputComponent = styled(Input)`
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
  cursor: pointer;
}
`

const Summary = styled(Flex)`
  flex-direction: column;
  margin: 2rem 0;
`

const SmRow = styled(Flex)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.75rem 0;
`

const OnlyFiat = props => {
  const { project } = props
  const [amountSelect, setAmountSelect] = useState(null)
  const [amountTyped, setAmountTyped] = useState(null)
  const [donateToGiveth, setDonateToGiveth] = useState(false)
  const [anonymous, setAnonymous] = useState(false)
  const client = useApolloClient()
  const amounts = [500, 100, 50, 30]

  const donation = parseFloat(amountTyped || amountSelect)
  const donationPlusFee =
    donation + (donateToGiveth === true ? GIVETH_DONATION_AMOUNT : 0)
  const subtotal = (donationPlusFee + 0.3) / 0.971

  const goCheckout = async event => {
    try {
      if (!amountSelect && !amountTyped) {
        return alert('Please set an amount before donating')
      }
      const amount = amountTyped || amountSelect
      if (amount <= 0) return alert('Please set a valid amount')
      // await getDonationSession({ variables: { amount: amountSelect } })
      const projId = project?.id
      const slug = project?.slug
      let givethDonation = 0
      donateToGiveth === true && (givethDonation = 5)
      const { data } = await client.query({
        query: GET_DONATION_SESSION,
        variables: {
          projectId: parseFloat(projId),
          amount: parseFloat(subtotal),
          anonymous: anonymous,
          donateToGiveth: donateToGiveth,
          successUrl: `${window.location.origin}/donate/${slug}?success=true`,
          cancelUrl: `${window.location.origin}/donate/${slug}?success=false`
        }
      })
      goStripe(data)
    } catch (error) {
      alert(error?.message?.split('GraphQL error: ')[1])
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
              onClick={() => {
                setAmountTyped('')
                setAmountSelect(i)
              }}
              style={{
                backgroundColor: isSelected
                  ? theme.colors.background
                  : 'transparent',
                color: isSelected
                  ? theme.colors.secondary
                  : theme.colors.background
              }}
            >
              <Text
                sx={{
                  variant: 'text.large',
                  color: isSelected
                    ? theme.colors.secondary
                    : theme.colors.background,
                  fontWeight: '700'
                }}
              >
                ${i}
              </Text>
            </AmountItem>
          )
        })}
      </AmountItems>
    )
  }

  const SummaryRow = ({ title, amount, style }) => {
    return (
      <SmRow style={style}>
        <Text sx={{ variant: 'text.medium', color: 'background' }}>
          {title}
        </Text>
        <Text sx={{ variant: 'text.medium', color: 'background' }}>
          ${amount}
        </Text>
      </SmRow>
    )
  }

  if (COMING_SOON) {
    return (
      <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Text
          sx={{
            variant: 'headings.h5',
            color: 'background',
            mb: -4,
            mt: 4
          }}
        >
          Coming Soon
        </Text>
        <Flex>
          <img src={ComingSoon1} alt='' sx={{ ml: -6 }} />
          <img
            src={ComingSoon2}
            alt=''
            sx={{ position: 'absolute', mt: 5, ml: 4 }}
          />
        </Flex>
      </Flex>
    )
  }

  return (
    <React.Fragment>
      <Content>
        <AmountSection>
          <AmountSelection />
          <AmountContainer>
            <Text sx={{ variant: 'text.medium', color: 'background' }}>
              Or enter your amount:
            </Text>
            <OpenAmount>
              <Text sx={{ variant: 'text.large', color: 'background' }}>$</Text>
              <InputComponent
                sx={{
                  variant: 'text.large',
                  '::placeholder': {
                    color: 'anotherGrey'
                  }
                }}
                placeholder='Amount'
                type='number'
                value={amountTyped}
                onChange={e => {
                  e.preventDefault()
                  setAmountSelect(null)
                  setAmountTyped(e.target.value)
                }}
              />
            </OpenAmount>
          </AmountContainer>
          <div>
            <CheckboxLabel sx={{ mb: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Checkbox
                  defaultChecked={donateToGiveth}
                  onClick={() => setDonateToGiveth(!donateToGiveth)}
                />
                <Text
                  sx={{
                    variant: 'text.medium',
                    textAlign: 'left',
                    color: 'white'
                  }}
                >
                  Be a hero, add <strong> ${GIVETH_DONATION_AMOUNT}</strong> to
                  help sustain Giveth
                </Text>
              </div>
              <Tooltip content='When you donate to Giveth you put a smile on our face because we can continue to provide support and further develop the platform.' />
            </CheckboxLabel>
            <CheckboxLabel
              sx={{ mb: '12px', alignItems: 'center', color: 'white' }}
            >
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Checkbox
                  defaultChecked={anonymous}
                  onClick={() => setAnonymous(!anonymous)}
                />
                <Text
                  sx={{
                    variant: 'text.medium',
                    color: 'white',
                    textAlign: 'left'
                  }}
                >
                  Donate anonymously
                </Text>
              </div>
              <Tooltip content='When you donate anonymously, your name will never appear in public as a donor. But, your name will be recorded so that we can send a tax donation receipt.' />
            </CheckboxLabel>
            {/* <Label sx={{ mb: '10px', alignItems: 'center' }}>
            <Checkbox defaultChecked={false} />
            <Text sx={{ variant: 'text.medium' }}>Dedicate this donation</Text>
          </Label> */}
            {(amountSelect || amountTyped) && (
              <Summary>
                <SummaryRow
                  title={`Support ${project?.title}`}
                  amount={parseFloat(donation).toFixed(2)}
                />
                {donateToGiveth && (
                  <SummaryRow
                    title='Support Giveth'
                    amount={GIVETH_DONATION_AMOUNT}
                  />
                )}
                <SummaryRow
                  title='Coming Soon'
                  amount={parseFloat(donation * 0.029 + 0.3).toFixed(2)}
                  style={{
                    borderBottom: '1px solid #6B7087',
                    padding: '0 0 18px 0'
                  }}
                />
                <Text
                  sx={{
                    variant: 'text.medium',
                    textAlign: 'right',
                    color: 'background'
                  }}
                >
                  ${parseFloat(subtotal).toFixed(2)}
                </Text>
              </Summary>
            )}
          </div>
          <Button
            onClick={goCheckout}
            // onClick={() =>
            //   alert(
            //     `Stripe doesn't like us :( \nPlease wait until next integration`
            //   )
            // }
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
    </React.Fragment>
  )
}

export default OnlyFiat
