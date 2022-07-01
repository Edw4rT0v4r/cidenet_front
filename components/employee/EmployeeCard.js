import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import moment from 'moment'
import Swal from 'sweetalert2'

const EmployeeCard = ({ employee }) => {
  const countries = { 'COP': 'Colombia', 'USA': 'Estados unidos' }

  const router = useRouter()

  const remove = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger mx-2',
        cancelButton: 'btn btn-secondary',
      },
      buttonsStyling: false,
    })
    swalWithBootstrapButtons.fire({
      title: 'Do you want to delete employee?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/employees/${id}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(data => {
            if (data.message) {
              Swal.fire({
                html: data.message,
                icon: 'success',
              })

              router.push('/')
              return
            }

            Swal.fire({
              html: data.error,
              icon: 'error',
            })
          })
      }
    })
  }

  let full_name = `${employee.first_name}`
  if (employee.other_name) {
    full_name += ` ${employee.other_name}`
  }
  full_name += ` ${employee.first_surname} ${employee.second_surname}`

  return (
    <Card className='text-center my-2' id={employee.id}>
      <Card.Header>{full_name}</Card.Header>
      <Card.Body>
        <Card.Title>{employee.email}</Card.Title>
        <Container fluid>
          <Row>
            <Col>
              <Card.Text className={'py-5 text-start'}>
                <strong>ID Type</strong>: {employee.id_type}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text className={'py-5 text-end'}>
                <strong>Country</strong>: {countries[employee.country]}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text className={'text-start'}>
                <strong>Identification number</strong>: {employee.identification_number}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text className={'text-end'}>
                <strong>Area</strong>: {employee.area}
              </Card.Text>
            </Col>
          </Row>
        </Container>
      </Card.Body>
      <Card.Footer className='text-muted'>
        <Row className={'d-flex align-items-center'}>
          <Col sm={12} md={8} className={'align-middle text-start'}>
            Register: {moment(new Date(employee.created_at)).format('DD/MM/YYYY HH:mm:ss')}
          </Col>
          <Col sm={12} md={4} className={'d-flex justify-content-end'}>
            <Link href={`/employees/${employee.id}/edit`}>
              <a className={'btn btn-outline-primary mx-1 text-decoration-none'}>Edit</a>
            </Link>
            <Button variant='outline-danger' onClick={() => remove(employee.id)}>Delete</Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default EmployeeCard