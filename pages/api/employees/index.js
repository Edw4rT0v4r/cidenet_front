export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await saveEmployee(req, res)
    default:
      return res.status(400).send('Method not allowed')
  }
}

const saveEmployee = async (req, res) => {
  const { body } = req

  const register = await fetch(`${process.env.API}/employees`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const response = await register.json()

  res.status(register.status).json(response)
}