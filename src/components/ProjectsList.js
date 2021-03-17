/** @jsx jsx */
import { Box, Button, Grid, Flex, jsx, Text, Input } from 'theme-ui'
import React from 'react'
import ProjectCard from './projectCard'
import NoImage from '../images/no-image-available.jpg'
import SearchIcon from '../images/svg/general/search-icon.svg'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import DropdownInput from '../components/dropdownInput'
import theme from '../gatsby-plugin-theme-ui'

const ProjectSection = styled(Box)``

export const OrderByField = {
  Balance: 'Balance',
  CreationDate: 'CreationDate'
}

export const OrderByDirection = {
  ASC: 'ASC',
  DESC: 'DESC'
}

const CreateLink = styled(Link)`
  text-align: right;
  text-decoration: none;
  font-family: 'Red Hat Display', sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  color: ${theme.colors.primary};
  align-self: center;
  :hover {
    color: ${theme.colors.hover};
  }
`
const IconSearch = styled(SearchIcon)`
  margin-left: -2.5rem;
`

// const SelectMenu = props => {
//   const { caption, options = {}, onChange = () => {}, defaultValue } = props
//   return (
//     <div
//       style={{
//         flexGrow: 1,
//         margin: '10px'
//       }}
//     >
//       <Text
//         pl={3}
//         sx={{
//           variant: 'text.default',
//           color: 'secondary',
//           fontSize: 3,
//           fontWeight: 'medium',
//           textDecoration: 'none',
//           textTransform: 'uppercase'
//         }}
//       >
//         {caption}
//       </Text>
//       <Select
//         pl={3}
//         sx={{
//           variant: 'text.default',
//           color: 'secondary',
//           fontSize: 3,
//           fontWeight: 'medium',
//           textDecoration: 'none',
//           width: '100%'
//         }}
//         defaultValue={defaultValue}
//         onChange={e => onChange(e.target.value)}
//         mb={3}
//         name='cars'
//         id='cars'
//       >
//         {Object.entries(options).map(([key, value]) => (
//           <option key={key} value={key}>
//             {value}
//           </option>
//         ))}
//       </Select>
//     </div>
//   )
// }

const orderBySelectOptions = {}
orderBySelectOptions[OrderByField.Balance] = 'Amount Raised'
orderBySelectOptions[OrderByField.CreationDate] = 'Recent'
const projectSearch = process.env.PROJECT_SEARCH
const ProjectsList = props => {
  const { projects, totalCount, loadMore, hasMore } = props
  return (
    <>
      <Flex
        sx={{
          p: ['0 1em', '0 5em', '0 5em'],
          justifyContent: 'space-between',
          margin: '1.5em 0'
        }}
      >
        <Text
          style={{
            width: '50%'
          }}
        >
          <span
            sx={{
              variant: 'headings.h1',
              width: ['100%', null, null],
              fontWeight: '500',
              fontSize: ['8', '3.25rem', '3.25rem'],
              color: 'secondary'
            }}
          >
            Projects{' '}
          </span>
          {totalCount && (
            <span
              sx={{
                variant: 'headings.h5',
                color: 'bodyLight'
              }}
            >{`(${totalCount})`}</span>
          )}
        </Text>
        <CreateLink to='/create'>Create a project</CreateLink>
      </Flex>
      <ProjectSection pt={4} sx={{ variant: 'grayBox' }}>
        <div
          style={{
            margin: '0 auto',
            maxWidth: '1440px',
            padding: '0 1.0875rem 1.45rem'
          }}
        >
          {projectSearch === 'true' ? (
            <Flex
              sx={{
                width: '100%',
                flexDirection: ['column-reverse', null, 'row'],
                mt: 2
              }}
            >
              <Flex
                sx={{
                  width: '100%',
                  flexDirection: ['row', null, 'row'],
                  justifyContent: ['space-around', null, null]
                }}
              >
                <Flex
                  sx={{
                    width: ['30%'],
                    alignItems: 'center',
                    mt: [4, 0, 0]
                  }}
                >
                  <DropdownInput
                    options={['COVID-19']}
                    current={0}
                    // setCurrent={i => setFilter(i)}
                  />
                </Flex>
                <Flex
                  sx={{
                    width: ['30%'],
                    alignItems: 'center',
                    mt: [4, 0, 0]
                  }}
                >
                  <DropdownInput
                    options={['World Wide']}
                    current={0}
                    // setCurrent={i => setFilter(i)}
                  />
                </Flex>
                <Flex
                  sx={{
                    width: ['30%'],
                    alignItems: 'center',
                    mt: [4, 0, 0]
                  }}
                >
                  <DropdownInput
                    options={['Amount Raised']}
                    current={0}
                    // setCurrent={i => setFilter(i)}
                  />
                </Flex>
                {/* <SelectMenu
            caption='sort by'
            options={orderBySelectOptions}
            onChange={selectOrderByField}
          /> */}
              </Flex>
              <Flex
                sx={{
                  flexGrow: 3,
                  alignItems: 'center',
                  display: 'flex',
                  width: ['100%', '100%', '50%'],
                  padding: '0 3% 0 0',
                  mt: [4, 0, 0],
                  mb: [0, 4, 0]
                }}
              >
                <Input
                  placeholder='Search Projects'
                  variant='forms.search'
                  style={{
                    width: '100%',
                    margin: 'auto'
                  }}
                />
                <IconSearch />
              </Flex>
            </Flex>
          ) : null}
          <div
            style={{
              width: '100%',
              margin: 0
            }}
          >
            <Grid
              p={4}
              columns={[1, 2, 3]}
              style={{
                margin: 0,
                columnGap: '2.375em',
                justifyItems: 'center'
              }}
            >
              {projects
                ? projects
                    ?.slice()
                    .sort(
                      (a, b) =>
                        new Date(a.creationDate) - new Date(b.creationDate)
                    )
                    .map((project, index) => (
                      <ProjectCard
                        shadowed
                        id={project.id}
                        listingId={project.title + '-' + index}
                        key={project.title + '-' + index}
                        name={project.title}
                        slug={project.slug}
                        donateAddress={project.donateAddress}
                        image={project.image || NoImage}
                        raised={project.balance}
                        project={project}
                      />
                    ))
                : null}
            </Grid>
          </div>
          {hasMore && (
            <div sx={{ justifySelf: 'center', textAlign: 'center' }}>
              <Button
                sx={{
                  variant: 'buttons.nofillGray',
                  color: 'bodyLight',
                  fontSize: 14,
                  mb: '3rem'
                }}
                onClick={() => loadMore()}
              >
                Show more Projects
              </Button>
            </div>
          )}
        </div>
      </ProjectSection>
    </>
  )
}

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired
  // selectOrderByField: PropTypes.func.isRequired
}
export default ProjectsList
