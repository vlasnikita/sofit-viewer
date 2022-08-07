export const getTraces = async () => {
    const result = await fetch('http://localhost:3001/traces');
      const data = await result.json()
    return data
}

export const getTraceData = async () => {
    const result = await fetch('http://localhost:3001/traces');
      const data = await result.json()
    return data
}