import React from 'react'
import { Text, Button, Flex, Image, Grid, Box } from 'theme-ui'
import { animated } from 'react-spring'

import ProjectImageGallery1 from '../../images/svg/create/projectImageGallery1.svg'
import ProjectImageGallery2 from '../../images/svg/create/projectImageGallery2.svg'
import ProjectImageGallery3 from '../../images/svg/create/projectImageGallery3.svg'
import ProjectImageGallery4 from '../../images/svg/create/projectImageGallery4.svg'

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
          ?.value
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
            mt: '9px',
            width: '500px',
            wordWrap: 'break-word'
          }}
        >
          {formData.projectDescription.length > 200
            ? formData.projectDescription.slice(0, 200) + '...'
            : formData.projectDescription}
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
        <Flex>
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              fontWeight: 'bold',
              color: 'bodyLight',
              mt: '18px'
            }}
          >
            ETH Address
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
            onClick={() => setStep(6)}
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
          {formData.projectWalletAddress}
        </Text>
      </>
      <>
        {formData.projectImage.startsWith('data:') ? (
          <Image
            src={formData.projectImage}
            sx={{
              objectFit: 'cover',
              maxHeight: '200px',
              maxWidth: '600px',
              mt: '20px'
            }}
          />
        ) : (
          <Box sx={{ mt: '20px' }}>
            {formData.projectImage === '1' && (
              <ProjectImageGallery1 style={{ width: '40%', height: '40%' }} />
            )}
            {formData.projectImage === '2' && (
              <ProjectImageGallery2 style={{ width: '40%', height: '40%' }} />
            )}
            {formData.projectImage === '3' && (
              <ProjectImageGallery3 style={{ width: '40%', height: '40%' }} />
            )}
            {formData.projectImage === '4' && (
              <ProjectImageGallery4 style={{ width: '40%', height: '40%' }} />
            )}
          </Box>
        )}
        <br />
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
            borderRadius: '48px',
            cursor: 'pointer'
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
              textAlign: 'center',
              color: 'background'
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
