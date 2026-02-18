import axios, { AxiosError } from 'axios'

export type CatFact = {
  fact: string
  length: number
}

type CatFactsResponse = {
  current_page: number
  data: CatFact[]
}

export async function fetchCatFacts(limit = 5): Promise<CatFact[]> {
  try {
    const response = await axios.get<CatFactsResponse>('https://catfact.ninja/facts', {
      params: { limit },
      validateStatus: () => true,
    })

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP ${response.status}: ${response.statusText || 'Request failed'}`)
    }

    return response.data.data
  } catch (e) {
    if (e instanceof AxiosError) {
      const status = e.response?.status
      const statusText = e.response?.statusText
      if (status) throw new Error(`HTTP ${status}: ${statusText || 'Request failed'}`)
      throw new Error(e.message || 'Network error')
    }
    throw e
  }
}
