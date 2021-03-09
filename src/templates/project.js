/** @jsx jsx */
import { jsx, Flex, Spinner } from 'theme-ui'
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
      <ProjectDonatorView pageContext={{ project: pageContext?.project }} />
    </Layout>
  )
}

export default Project
