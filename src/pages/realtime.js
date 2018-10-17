import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SideNav from "../components/side-nav";
import pageContents from "../../ref-contents.json";
import styles from "./reference.module.css";

export default ({ data }) => {
  console.log(data)
  console.log(pageContents)
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.navContainer}>
          <SideNav content={pageContents}/>
        </div>
        <div className={styles.contentContainer}>
          {
              data.allFile.edges.map(({ node }) => {
                if (node.name !== "README") {
                  return(
                    <div
                      key={node.id}
                      dangerouslySetInnerHTML={{__html: node.childMarkdownRemark.html}}>
                    </div>
                  )
                }
            })
          }
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(
      filter: {
        internal: {mediaType: {eq: "text/markdown"}},
        sourceInstanceName: {eq: "remote"},
        relativePath: {regex: "/gtfs\/spec\/en/"},
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
