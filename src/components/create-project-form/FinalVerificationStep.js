import React from 'react'
import { Text, Button, Flex, Image, Grid } from 'theme-ui'
import { animated } from 'react-spring'

const FinalVerificationStep = ({
  formData,
  setStep,
  animationStyle,
  categoryList
}) => {
  const chosenCategories = []
  for (const category in formData.projectCategory) {
    if (formData.projectCategory[category].length !== 0) {
      chosenCategories.push(
        categoryList.filter(categoryItem => categoryItem.name === category)[0]
          .value
      )
    }
  }
  return (
    <animated.section style={{ ...animationStyle, marginTop: '35px' }}>
      <>
        <Flex>
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              fontWeight: 'bold',
              color: 'bodyLight'
            }}
          >
            Project Name
          </Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2
            }}
            onClick={() => setStep(0)}
          >
            <Text>Edit</Text>
          </Button>
        </Flex>
        <Text
          sx={{
            fontSize: 4,
            fontFamily: 'heading',
            color: 'secondary',
            mt: '9px'
          }}
        >
          {formData.projectName}
        </Text>
      </>
      <>
        <Flex>
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              color: 'bodyLight',
              mt: '18px'
            }}
          >
            Admin
          </Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2,
              mt: '18px'
            }}
            onClick={() => setStep(1)}
          >
            <Text>Edit</Text>
          </Button>
        </Flex>
        <Text
          sx={{
            fontSize: 4,
            fontFamily: 'heading',
            color: 'secondary',
            mt: '9px'
          }}
        >
          {formData.projectAdmin}
        </Text>
      </>
      <>
        <Flex>
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              color: 'bodyLight',
              mt: '16px'
            }}
          >
            Description
          </Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2,
              mt: '16px'
            }}
            onClick={() => setStep(2)}
          >
            Edit
          </Button>
        </Flex>
        <Text
          sx={{
            fontSize: 3,
            fontFamily: 'body',
            color: 'secondary',
            mt: '9px'
          }}
        >
          {formData.projectDescription}
        </Text>
      </>
      <>
        <Flex>
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              color: 'bodyLight',
              mt: '18px'
            }}
          >
            Category
          </Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2,
              mt: '18px'
            }}
            onClick={() => setStep(3)}
          >
            Edit
          </Button>
        </Flex>
        <Grid
          sx={{
            gridTemplateColumns: '75px 75px 75px 75px',
            gap: '5px'
          }}
        >
          {chosenCategories.map(category => {
            return (
              <Text
                sx={{
                  color: 'white',
                  display: 'inline',
                  fontSize: 1,
                  fontFamily: 'body',
                  mt: '9px',
                  backgroundColor: 'primary',
                  borderRadius: '18px',
                  paddingY: 1,
                  paddingX: 2,
                  textAlign: 'center'
                }}
                key={category}
              >
                {`${category}`}
              </Text>
            )
          })}
        </Grid>
      </>
      <>
        <Flex>
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              color: 'bodyLight',
              mt: '18px'
            }}
          >
            Impact
          </Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2,
              mt: '18px'
            }}
            onClick={() => setStep(4)}
          >
            Edit
          </Button>
        </Flex>
        <Text
          sx={{
            fontSize: 3,
            fontFamily: 'body',
            color: 'secondary',
            mt: '9px'
          }}
        >
          {formData.projectImpactLocation}
        </Text>
      </>
      <>
        <Image
          src={window.localStorage.getItem('projectImage')}
          sx={{
            objectFit: 'cover',
            maxHeight: '200px',
            maxWidth: '600px',
            mt: '20px'
          }}
        />
        <br />
        <Button
          type='button'
          sx={{
            color: 'primary',
            border: 0,
            background: 'unset',
            fontSize: 1,
            p: 0,
            pl: 2,
            mt: '18px'
          }}
          onClick={() => setStep(5)}
        >
          Replace
        </Button>
        <br />
        <Button
          aria-label='Next'
          sx={{
            mt: '39px',
            width: '240px',
            height: '52px',
            borderRadius: '48px'
          }}
          type='submit'
        >
          <Text
            sx={{
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: 2,
              letterSpacing: '4%',
              textTransform: 'uppercase',
              textAlign: 'center'
            }}
          >
            Start raising funds
          </Text>
        </Button>
      </>
    </animated.section>
  )
}

export default FinalVerificationStep
