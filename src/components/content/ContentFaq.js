/** @jsx jsx */
import { jsx, Flex, Image, Grid, Text, Box, Button, Heading } from 'theme-ui'
import theme from '../../gatsby-plugin-theme-ui/index'
import React, { useState, useEffect } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'

import styled from '@emotion/styled'
import Collapsible from 'react-collapsible'

import { AiOutlineDown } from 'react-icons/ai'

const ContentContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  padding: 0.5rem 0;
  max-width: 960px;
  margin: 0 auto;
  justify-content: center;
  color: ${theme.colors.primary};
  @media (max-width: 512px) {
    max-width: 80vw;
  }
`

const ContentItem = styled.div`
  display: grid;
  max-width: 960px;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  align-self: center;
  background-position: center;
  background-color: ${theme.colors.background};
  color: ${theme.colors.secondary};
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  border: 5px solid ${theme.colors.background};
  border-radius: 10px 10px 0px 0px;
  @media (max-width: 990px) {
    justify-items: center;
    justify-self: center;
    max-width: 80vw;
    grid-gap: 0;
  }

  h2 {
    margin: 0;
    padding: 0.5rem;
    color: ${theme.colors.secondary};
  }
  .Collapsible__trigger {
    :hover {
      cursor: pointer;
    }
  }

  .Collapsible__contentInner {
    background: ${theme.colors.background};
    color: ${theme.colors.secondary};
  }
`

const LongDescription = styled(Text)`
  justify-self: center;
  margin: 0;
  padding: 2rem;
  color: ${theme.colors.secondary};
  @media (max-width: 990px) {
    max-width: 1fr;
  }
`

const Category = styled(Heading)`
  color: ${theme.colors.primary};
  cursor: pointer;

  :hover {
    color: #${theme.colors.hover};
  }
`

const Question = styled(Heading)`
  font-size: 1.2rem;

  :hover {
    color: #${theme.colors.hover};
  }
`
const QuestionSpan = styled.span`
  display: grid;
  grid-template-columns: auto 1fr;
  cursor: pointer;
  align-items: center;
`

const ArrowDown = styled(AiOutlineDown)`
  justify-self: end;
  height: 15px;
  margin: 0.5rem;
  padding: 0.1rem;
`

const ArrowUp = styled(AiOutlineDown)`
  justify-self: end;
  transform: rotate(180deg);
  height: 15px;
  margin: 0.5rem;
  padding: 0.1rem;
`

const ContentFaq = ({ data, isopen }) => {
  const [hash, setHash] = useState('')

  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { title, description, file } = node.data.target.fields
        const mimeType = file['en-US'].contentType
        const mimeGroup = mimeType.split('/')[0]

        switch (mimeGroup) {
          case 'image':
            return (
              <img
                title={title ? title['en-US'] : null}
                alt={description ? description['en-US'] : null}
                src={file['en-US'].url}
              />
            )
          case 'application':
            return (
              <a
                alt={description ? description['en-US'] : null}
                href={file['en-US'].url}
              >
                {title ? title['en-US'] : file['en-US'].details.fileName}
              </a>
            )
          default:
            return (
              <span style={{ backgroundColor: 'black', color: 'white' }}>
                {' '}
                {mimeType} embedded asset{' '}
              </span>
            )
        }
      }
    }
  }

  useEffect(() => {
    setHash((typeof window !== 'undefined' && window.location.hash) || '')
    console.log(hash)
  }, [hash])

  return (
    <ContentContainer>
      <Collapsible
        trigger={
          <QuestionSpan>
            <Category>{data[0].node.category.category}</Category>
            <ArrowDown />
          </QuestionSpan>
        }
        triggerWhenOpen={
          <QuestionSpan>
            <Category>{data[0].node.category.category}</Category>
            <ArrowUp />
          </QuestionSpan>
        }
        open={isopen}
      >
        {data.map(edges => (
          <ContentItem id={edges.node.linkId} key={edges.node.id}>
            {hash === `#${edges.node.linkId}` ? (
              <Collapsible
                trigger={
                  <QuestionSpan>
                    <Question>{edges.node.question}</Question>
                    <ArrowDown />
                  </QuestionSpan>
                }
                triggerWhenOpen={
                  <QuestionSpan>
                    <Question>{edges.node.question}</Question>
                    <ArrowUp />
                  </QuestionSpan>
                }
                open={true}
              >
                <LongDescription
                  sx={{ variant: 'text.default', color: 'colors.secondary' }}
                >
                  {documentToReactComponents(edges.node.answer.json)}
                </LongDescription>
              </Collapsible>
            ) : (
              <Collapsible
                trigger={
                  <QuestionSpan>
                    <Question>{edges.node.question}</Question>
                    <ArrowDown />
                  </QuestionSpan>
                }
                triggerWhenOpen={
                  <QuestionSpan>
                    <Question>{edges.node.question}</Question>
                    <ArrowUp />
                  </QuestionSpan>
                }
                open={false}
              >
                <LongDescription
                  sx={{ variant: 'text.default', color: 'colors.secondary' }}
                >
                  {documentToReactComponents(
                    edges.node.answer.json,
                    richTextOptions
                  )}
                </LongDescription>
              </Collapsible>
            )}
          </ContentItem>
        ))}
      </Collapsible>
    </ContentContainer>
  )
}

export default ContentFaq
