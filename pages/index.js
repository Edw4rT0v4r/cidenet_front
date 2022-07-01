import React from 'react'
import Paging from '@components/Paging'

import Layout from '@components/Layout'
import EmployeeCard from '@components/employee/EmployeeCard'
import { Row, Col } from 'react-bootstrap'

import Swal from 'sweetalert2'

const Home = ({ employees, meta }) => {
  if (typeof employees === 'string') {
    Swal.fire({
      html: employees,
      icon: 'error',
    })
    employees = []
  }

  const { current_page, last_page } = meta

  return (
    <Layout>
      <Row className={'mt-4'}>
        <Col className={'d-flex justify-content-end'}>
          <Paging currentPage={current_page} lastPage={last_page}></Paging>
        </Col>
      </Row>
      <Row>
        {employees.map(employee => (
          <Col key={employee.id} md={6}>
            <EmployeeCard key={employee.id} employee={employee} />
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const {
    page = 1,
    limit = 10,
  } = query

  let route = `${process.env.API}/employees?page=${page}&limit=${limit}`
  Object.entries(query).forEach(([key, value]) => {
    if (key !== 'page' && key !== 'limit') {
      route += `&filter[${key}]=${value}`
    }
  })

  const res = await fetch(route)
    .then(response => response.json())
    .then(result => {
      if (result.error) {
        Swal.fire({
          html: result.error,
          icon: 'error',
        })
        return result.error
      }
      return result
    })


  let data = ''
  let meta = {
    current_page: 1,
    last_page: 1,
    total: 1,
  }

  if (typeof res === 'string') {
    data = res
  } else {
    data = res.data
    meta = res.meta
  }

  return {
    props: {
      employees: data,
      meta: {
        current_page: meta.current_page,
        last_page: meta.last_page,
        total: meta.total,
      },
    },
  }
}

export default Home