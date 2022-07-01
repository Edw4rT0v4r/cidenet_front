import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Input from '@components/utils/Input'
import Dropdown from '@components/utils/Dropdown'

import Swal from 'sweetalert2'
import Link from 'next/link'

const EmployeeForm = () => {
  const countries = [
    { value: 'COP', label: 'Colombia' },
    { value: 'USA', label: 'Estados unidos' },
  ]
  const idTypes = [
    { value: 'Cédula de ciudadanía', label: 'Cédula de ciudadanía' },
    { value: 'Cedula de extranjeria', label: 'Cedula de extranjeria' },
    { value: 'Pasaporte', label: 'Pasaporte' },
    { value: 'Permiso especial', label: 'Permiso especial' },
  ]
  const areas = [
    { value: 'Administración', label: 'Administración' },
    { value: 'Financiera', label: 'Financiera' },
    { value: 'Compras', label: 'Compras' },
    { value: 'Infraestructura', label: 'Infraestructura' },
    { value: 'Operación', label: 'Operación' },
    { value: 'Talento Humano', label: 'Talento Humano' },
    { value: 'Servicios Varios', label: 'Servicios Varios' },
  ]

  const [employee, setEmployee] = useState({
    first_name: '',
    other_name: '',
    first_surname: '',
    second_surname: '',
    country: '',
    id_type: '',
    identification_number: '',
    admission_date: '',
    area: '',
  })

  const [area, setArea] = useState('')
  const [country, setCountry] = useState('')
  const [idType, setIdType] = useState('')

  employee.area = employee.area ? employee.area : area
  employee.country = employee.country ? employee.country : country
  employee.id_type = employee.id_type ? employee.id_type : idType

  const router = useRouter()

  useEffect(() => {
    const fetchEmployee = async (id) => {
      fetch(`/api/employees/${id}`)
        .then(response => response.json())
        .then(data => {
          if (data.data) {
            setEmployee(data.data)
            return
          }

          Swal.fire({
            html: data.error,
            icon: 'error',
          })
        })
    }

    if (router.query?.id) {
      fetchEmployee(router.query.id)
    }
    console.log('called')
  }, [router.query.id])

  const handleChange = ({ target: { name, value } }) =>
    setEmployee({ ...employee, [name]: value.toUpperCase() })

  const handleSubmit = async (e) => {
    e.preventDefault()
    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
      method: 'POST',
    }

    let route = '/api/employees'
    if (router.query?.id) {
      options.method = 'PUT'
      route += `/${router.query.id}`
    }

    fetch(route, options)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          Swal.fire({
            showConfirmButton: false,
            html: data.message,
            icon: 'success',
            timer: 1500,
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

  return (
    <form onSubmit={handleSubmit} className={'mt-4'}>
      <Input element={'first_name'} title={'First Name'} value={employee.first_name}
             onChange={handleChange}></Input>
      <Input element={'other_name'} title={'Others Name'} value={employee.other_name ? employee.other_name : ''}
             onChange={handleChange} maxlength={50}></Input>
      <Input element={'first_surname'} title={'First Surname'} value={employee.first_surname}
             onChange={handleChange}></Input>
      <Input element={'second_surname'} title={'Second Surname'} value={employee.second_surname}
             onChange={handleChange}></Input>
      <Input element={'admission_date'} title={'Admission Date'} type={'date'}
             value={employee.admission_date}
             onChange={handleChange}></Input>

      <Dropdown options={areas} value={employee.area} name={'area'} onChange={e => setArea(e.target.value)}
                title={'Area'} />

      <Dropdown options={countries} value={employee.country} name={'country'} onChange={e => setCountry(e.target.value)}
                title={'Country'} />

      <Dropdown options={idTypes} value={employee.id_type} name={'id_type'} onChange={e => setIdType(e.target.value)}
                title={'ID Type'} />

      <Input element={'identification_number'} title={'Identification Number'}
             value={employee.identification_number}
             onChange={handleChange}></Input>

      <div className={'d-flex justify-content-end'}>
        <button className={'btn btn-outline-primary mx-2'}>
          {router.query?.id ? 'Update' : 'Save'}
        </button>
        <Link href={`/`}>
          <a className={'btn btn-outline-secondary text-decoration-none'}>Back</a>
        </Link>
      </div>
    </form>
  )
}

export default EmployeeForm