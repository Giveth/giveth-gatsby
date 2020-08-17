import React from 'react'
import { Grid, Text, Button } from 'theme-ui'

const EditButtonSection = ({ formData, setStep }) => {
  return (
    <Grid
      sx={{
        width: '120px',
        mt: '49px'
      }}
      columns={[2, '3fr 1fr']}
    >
      {formData.projectName ? (
        <>
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              color: 'bodyLight'
            }}
          >
            Project Name
          </Text>
          <Button
            type='button'
            aria-label='edit project name'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0
            }}
            onClick={() => setStep(0)}
          >
            <Text>Edit</Text>
          </Button>
        </>
      ) : (
        <div />
      )}
      {formData.projectAdmin ? (
        <>
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              color: 'bodyLight'
            }}
          >
            Admin
          </Text>
          <Button
            type='button'
            aria-label='edit project name'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0
            }}
            onClick={() => setStep(1)}
          >
            <Text>Edit</Text>
          </Button>
        </>
      ) : (
        <div />
      )}
    </Grid>
  )
}

export default EditButtonSection
