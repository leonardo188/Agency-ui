export const useMockApi = async (path: string) => {
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error("Failed to fetch mock data")
    return await res.json()
  } catch (err) {
    console.error("[Mock API Error]", err)
    return []
  }
}
