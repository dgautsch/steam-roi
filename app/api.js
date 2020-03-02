export async function registerUser (client, payload) {
  const url = '/api/register'
  const data = await client.post(url, payload)
  return data
}

export async function loginUser (client, payload) {
  const url = '/api/login'
  const data = await client.post(url, payload)
  return data
}
