import React from 'react'
import { Link } from 'gatsby'
import { Button, Text } from 'theme-ui'

export const DescriptionInstructionModal = ({ showModal, setShowModal }) => (
  <div
    css={{
      display: showModal ? 'flex' : 'none',
      position: 'absolute',
      left: '25%',
      top: '-30%',
      padding: '10%',
      flexDirection: 'column',
      width: '600px',
      backgroundColor: 'white',
      boxShadow: '0px 28px 52px rgba(44, 13, 83, 0.2)',
      borderRadius: '2px'
    }}
  >
    <Button
      type='button'
      onClick={() => setShowModal(false)}
      aria-label='close'
      sx={{
        position: 'absolute',
        top: '32px',
        right: '32px',
        fontSize: '3',
        fontFamily: 'body',
        color: 'secondary',
        background: 'unset',
        cursor: 'pointer'
      }}
    >
      Close
    </Button>
    <Text
      sx={{ mt: '10px', fontSize: 7, textAlign: 'center', fontFamily: 'body' }}
    >
      How to write a great project description
    </Text>
    <Text
      sx={{ mt: '80px', fontSize: 4, textAlign: 'left', fontFamily: 'body' }}
    >
      Try to use this structure as a guide when writing the description:
    </Text>
    <ol css={{ alignItems: 'start', paddingLeft: '0.8rem' }}>
      {['who', 'what', 'why', 'where', 'how', 'when'].map(item => {
        return (
          <li key={item} css={{ marginTop: '10px', font: 'Fira Sans' }}>
            <Text
              sx={{
                fontFamily: 'body',
                textTransform: 'capitalize',
                fontWeight: 'bold'
              }}
            >
              {`${item}?`}
            </Text>
          </li>
        )
      })}
    </ol>
    <Text
      sx={{ mt: '20px', fontSize: 4, textAlign: 'left', fontFamily: 'body' }}
    >
      See how others have done it:{' '}
      <a target='_blank' href='/projects' css={{ textDecoration: 'none' }}>
        <Text sx={{ color: 'primary' }}>Browse examples.</Text>
      </a>
    </Text>
    <Text
      sx={{ mt: '20px', fontSize: 4, textAlign: 'left', fontFamily: 'body' }}
    >
      Read this blog post tutorial: <br />
      <a
        target='_blank'
        css={{ textDecoration: 'none' }}
        href='https://knowhow.ncvo.org.uk/how-to/how-to-write-an-overview-of-a-nonprofit-organization#'
      >
        <Text sx={{ color: 'primary' }}>
          "How to write a fundraising project description to increase donations"
        </Text>
      </a>
    </Text>
  </div>
)
