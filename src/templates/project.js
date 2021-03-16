/** @jsx jsx */
import { Flex, Text, jsx } from 'theme-ui'
import Seo from '../components/seo'
import Layout from '../components/layout'
import { ProjectDonatorView } from '../components/project'

const Project = ({ pageContext }) => {
  return (
    <Layout>
      <Seo
        title={
          pageContext?.project?.title
            ? `Check out ${pageContext?.project?.title}`
            : 'Check out this project!'
        }
        image={pageContext?.project?.image}
      />
      {pageContext?.project?.status?.id !== '5' ? (
        <Flex sx={{ justifyContent: 'center', pt: 5 }}>
          <Text variant='headings.h4' sx={{ color: 'secondary' }}>
            Project Not available
          </Text>
        </Flex>
      ) : (
        <ProjectDonatorView pageContext={{ project: pageContext?.project }} />
      )}
    </Layout>
  )
}

export default Project
