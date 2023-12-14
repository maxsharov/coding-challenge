export const getTimezone = async (city = 'London') => {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/timezone?city=${city}`,
      {
        headers: {
          'X-Api-Key': import.meta.env.VITE_NINJA_API_KEY,
        },
      }
    )
    const result = await response.json()
    return result.timezone
  } catch (error) {
    console.error('Error:', error)
  }
}
