import React from 'react'
import Container from 'react-bootstrap/Container'
import Bar from '@components/Bar'

const Layout = ({ children }) => {
  return (
    <>
      <Bar />
      <Container >
        {children}
      </Container>
    </>
  )
}

export default Layout