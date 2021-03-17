/** @jsx jsx */
import { Flex, Text, Grid, jsx } from 'theme-ui'
import styled from '@emotion/styled'
import Seo from '../components/seo'
import Layout from '../components/layout'
import DonationView from '../components/donate'
import { useWallet } from '../contextProvider/WalletProvider'

const Content = styled(Grid)`
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`

const ShowComponents = props => {
  const { pageContext } = props
  const { user } = useWallet()
  const isAdmin = pageContext?.project?.admin === user?.id
  const projectStatus = pageContext?.project?.status

  return (
    <Content style={{ justifyItems: 'center' }}>
      {projectStatus && projectStatus?.id !== '5' && !isAdmin ? (
        <Flex sx={{ justifyContent: 'center', pt: 5 }}>
          <Text variant='headings.h4' sx={{ color: 'background' }}>
            Project Not available
          </Text>
        </Flex>
      ) : (
        <DonationView {...props} project={pageContext?.project} />
      )}
    </Content>
  )
}

const Donate = props => {
  const { pageContext } = props
  return (
    <Layout asDialog>
      <Seo
        title={
          pageContext?.project?.title
            ? `Check out ${pageContext?.project?.title}`
            : 'Check out this project!'
        }
        image={pageContext?.project?.image}
      />
      <ShowComponents pageContext={pageContext} {...props} />
    </Layout>
  )
}

export default Donate
