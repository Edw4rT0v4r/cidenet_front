export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getEmployee(req, res)
    case 'PUT':
      return await updateEmployee(req, res)
    case 'DELETE':
      return await deleteEmployee(req, res)
    default:
      return res.status(400).send('Method not allowed')
  }
}

const getEmployee = async (req, res) => {
  const id = req.query.id

  const register = await fetch(`${process.env.API}/employees/${id}`)
  const response = await register.json()

  res.status(register.status).json(response)
}

const updateEmployee = async (req, res) => {
  const id = req.query.id
  const { body } = req

  const register = await fetch(`${process.env.API}/employees/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const response = await register.json()

  res.status(register.status).json(response)
}

const deleteEmployee = async (req, res) => {
  const id = req.query.id

  const register = await fetch(`${process.env.API}/employees/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const response = await register.json()

  res.status(register.status).json(response)
}