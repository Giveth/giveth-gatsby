/** @jsx jsx */
import { jsx, Box, Label, Input, Textarea, Heading } from 'theme-ui'
import TypeForm from './TypeForm'
import { useForm } from 'react-hook-form'

const AddProject = props => {
  // reconsider later const { handleSubmit, register } = useForm()
  const { handleSubmit } = useForm()
  const TitleComponent = props => (
    <Box>
      <br />
      <br />
      <Label htmlFor='title'>
        <Heading as='h5' style={{ fontSize: '2em', fontWeight: 'light' }}>
          What's the name of your project?
        </Heading>
      </Label>
      <br />
      <br />

      <Input
        // ref={register({
        //   validate: value => value !== 'admin' || 'Nice try!'
        // })}
        ref={props.currentRef}
        sx={{
          variant: 'borderless',
          '&.active': {
            color: 'primary'
          }
        }}
        name='title'
        mb={3}
        placeholder='Project Name'
        style={{ fontSize: '1.5em' }}
      />
    </Box>
  )

  const DescriptionComponent = props => (
    <Box>
      <Label htmlFor='description'>
        <Heading as='h3'>What is your project about?</Heading>
      </Label>
      <br />
      <br />
      <Textarea
        name='description'
        rows='6'
        mb={3}
        // ref={register({
        //   validate: value => value !== 'admin' || 'Nice try!'
        // })}
        ref={props.currentRef}
      />
    </Box>
  )
  // if (loading || !data) {
  //   return <h1>loading...</h1>
  // }
  return (
    <Box>
      <Heading as='h5'>CREATE A NEW PROJECT</Heading>
      <br />
      <br />
      <br />

      <TypeForm
        addProject={props.addProject}
        submitBtnText={'Start raising funds'}
        onSubmit={props.onSubmit}
        fields={[
          {
            name: 'title',
            label: 'PROJECT NAME',
            value: '',
            headStyle: 'h2',
            component: TitleComponent
          },
          {
            name: 'description',
            label: 'DESCRIPTION',
            value: '',
            headStyle: 'h3',
            component: DescriptionComponent
          }
        ]}
      >
        {/* <TitleComponent />
        <DescriptionComponent /> */}
      </TypeForm>
    </Box>
  )
}
export default AddProject
