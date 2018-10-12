import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

const IndexPage = ({ data }) => {
  console.log(data);
  return(
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: data.allFile.edges[0].node.childMarkdownRemark.html }}></div>
    </Layout>
  )
}

export default IndexPage

export const homeQuery = graphql`
    query {
      allFile(
          filter: {
            internal: {mediaType: {eq: "text/markdown"}},
            # sourceInstanceName: {eq: "reference"},
            name: {eq: "home"},
            # relativePath: {regex: "/en\//"}
          }
        ){
          edges {
            node {
              name
              relativePath
              childMarkdownRemark {
                html

              }
            }
          }
        }
    }
`
