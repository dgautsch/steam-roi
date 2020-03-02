export async function registerUser (client, payload) {
  const url = '/api/register'
  const data = await client.post(url, payload)
  return data
}
