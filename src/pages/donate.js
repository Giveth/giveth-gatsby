/** @jsx jsx */
import { Grid, jsx } from 'theme-ui'
import styled from '@emotion/styled'

import Layout from '../components/layout'
import ProjectListing from '../components/projectListing'

const Content = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

const ProjectContainer = styled.div`
  width: 25rem;

  @media (max-width: 800px) {
    width: 100%;
  }
`

const Payment = styled.div`
  width: 50%;
`

const Donate = () => {
  return (
    <Layout asDialog>
      <Content p={4} columns={[1, 2, 3]} style={{ justifyItems: 'center' }}>
        <ProjectContainer>
          <ProjectListing
            name='Giveth DAC'
            image='https://feathers.beta.giveth.io/uploads/368b8ef30b9326adc4a490c4506189f905cdacef63b999f9b042a853ab12a5bb.png'
            raised={1223}
            category='Blockchain 4 Good'
            listingId='key1'
            key='key1'
          />
        </ProjectContainer>
        <Payment>Payment Form</Payment>
      </Content>
    </Layout>
  )
}

export default Donate
