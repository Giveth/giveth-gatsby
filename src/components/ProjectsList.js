/** @jsx jsx */
import { Box, Button, Grid, Flex, jsx, Select, Text, Input } from 'theme-ui'
import ProjectCard from './projectCard'
import NoImage from '../images/no-image-available.jpg'
import SearchIcon from '../images/svg/general/search-icon.svg'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import DropdownInput from '../components/dropdownInput'
import theme from '../gatsby-plugin-theme-ui'
import React from 'react'

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
  text-decoration: none;
  font-family: 'Red Hat Display', sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  color: ${theme.colors.primary};
  align-self: center;
  :hover {
    color: ${theme.colors.accent};
  }
`
const IconSearch = styled(SearchIcon)`
  margin-left: -2.5rem;
`

const SelectMenu = props => {
  const { caption, options = {}, onChange = () => {}, defaultValue } = props
  return (
    <div
      style={{
        flexGrow: 1,
        margin: '10px'
      }}
    >
      <Text
        pl={3}
        sx={{
          variant: 'text.default',
          color: 'secondary',
          fontSize: 3,
          fontWeight: 'medium',
          textDecoration: 'none',
          textTransform: 'uppercase'
        }}
      >
        {caption}
      </Text>
      <Select
        pl={3}
        sx={{
          variant: 'text.default',
          color: 'secondary',
          fontSize: 3,
          fontWeight: 'medium',
          textDecoration: 'none',
          width: '100%'
        }}
        defaultValue={defaultValue}
        onChange={e => onChange(e.target.value)}
        mb={3}
        name='cars'
        id='cars'
      >
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Select>
    </div>
  )
}

const orderBySelectOptions = {}
orderBySelectOptions[OrderByField.Balance] = 'Amount Raised'
orderBySelectOptions[OrderByField.CreationDate] = 'Recent'

const ProjectsList = props => {
  const { projects, totalCount, loadMore, hasMore, selectOrderByField } = props
  return (
    <ProjectSection pt={4} sx={{ variant: 'grayBox' }}>
      <div
        style={{
          margin: '0 auto',
          maxWidth: '1440px',
          padding: '0 1.0875rem 1.45rem'
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
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
                fontWeight: 'regular',
                fontSize: ['8', '11', '11'],
                color: 'secondaryDark'
              }}
            >
              Projects
            </span>{' '}
            <span
              sx={{
                variant: 'headings.h4',
                color: 'bodyDark'
              }}
            >{`(${totalCount})`}</span>
          </Text>
          <CreateLink to='/create'>Create a project</CreateLink>
        </div>

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

        <div
          style={{
            width: '100%'
          }}
        >
          <Grid p={4} columns={[1, 2, 3]} style={{ justifyItems: 'center' }}>
            <ProjectCard
              name='Giveth DAC'
              image='https://feathers.beta.giveth.io/uploads/368b8ef30b9326adc4a490c4506189f905cdacef63b999f9b042a853ab12a5bb.png'
              raised={1223}
              category='Blockchain 4 Good'
              listingId='key1'
              key='key1'
            />
            <ProjectCard
              name='Aragon DAC'
              image='https://feathers.beta.giveth.io/uploads/3aa88b6ed3a6e0f54542086886194696a21c06b756864b97a1c1a0dcf58d4e17.png'
              raised={423}
              category='Blockchain 4 Good'
              listingId='key2'
              key='key2'
            />
            <ProjectCard
              name='Fairdata Society'
              image='https://ipfs.giveth.io/ipfs/QmUCepVMUhCHhZ5mSEXqWgL3taxPU5gaUhczTZgA4JLyPk'
              raised={0}
              category='Social Technology'
              listingId='key3'
              key='key3'
            />
            <ProjectCard
              name='Unicorn DAC'
              image='https://feathers.beta.giveth.io/uploads/5906e1be14c47c0a18b44a29fe8873ddfb6440a8a212cf42bacb84b7e2e1c0c1.png'
              raised={10004}
              category='All the things'
              listingId='key4'
              key='key4'
            />
            {projects &&
              projects.map((project, index) => (
                <ProjectCard
                  id={project.id}
                  listingId={project.title + '-' + index}
                  key={project.title + '-' + index}
                  name={project.title}
                  slug={project.slug}
                  donateAddress={project.donateAddress}
                  image={project.image || NoImage}
                  raised={project.balance}
                />
              ))}
          </Grid>
        </div>
        {hasMore && (
          <div sx={{ justifySelf: 'center', textAlign: 'center' }}>
            <Button
              sx={{
                variant: 'buttons.tiny'
              }}
              onClick={() => loadMore()}
            >
              Show more Projects
            </Button>
          </div>
        )}
      </div>
    </ProjectSection>
  )
}

ProjectsList.propTypes = {
  projects: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  selectOrderByField: PropTypes.func.isRequired
}
export default ProjectsList
