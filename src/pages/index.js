import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home Page of the first Gatsby Project</h1>
    <p> A simple site for the Gatsby Framework</p>

    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
