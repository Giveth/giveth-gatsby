/** @jsx jsx */
import { Flex, Text, Grid, jsx } from 'theme-ui'
import styled from '@emotion/styled'
import Seo from '../components/seo'
import Layout from '../components/layout'
import DonationView from '../components/donate'

const Content = styled(Grid)`
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`

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
      <Content style={{ justifyItems: 'center' }}>
        {pageContext?.project?.status?.id !== '5' ? (
          <Flex sx={{ justifyContent: 'center', pt: 5 }}>
            <Text variant='headings.h4' sx={{ color: 'background' }}>
              Project Not available
            </Text>
          </Flex>
        ) : (
          <DonationView {...props} project={pageContext?.project} />
        )}
      </Content>
    </Layout>
  )
}

export default Donate
