import React from "react"
import PostLink from '../components/post-link'

import Layout from "../components/layout"
import Filter from '../components/filter'

const IndexPage = ({data}) => {
 


  const Posts = data.all.edges
    .filter(edge => !!edge.node.frontmatter.title) // You can filter your posts based on some criteria
    .map((edge, key) => <PostLink key={key} post={edge.node} />)
  return(
    <Layout>
      <Filter tags={data.filters.tags} levels={data.filters.levels} types={data.filters.types}/>
      <div id="posts">{Posts}</div>
    </Layout>)
}

export default IndexPage

export const pageQuery = graphql`
  query {
    filters: allMarkdownRemark {
      types: distinct(field: frontmatter___types)
      tags: distinct(field: frontmatter___tags)
      levels: distinct(field: frontmatter___levels)
    }
    all: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            slug
            title
            types
            tags
            levels
            sublevels
          }
        }
      }
    }
  }     
`
    // allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___title] }) {
    //   edges {
    //     node {
    //       id
    //       excerpt(pruneLength: 250)
    //       frontmatter {
    //         slug
    //         title
    //         frameworks
    //         tags
    //       }
    //     }
    //   }
    // }