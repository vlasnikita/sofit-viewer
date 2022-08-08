const root = 'http://localhost:3001'

export const fetchKeys = async () => {
    const result = await fetch(`${root}/traces`);
      const data = await result.json()
    return data
}

export const fetchTraces = async keys => {
    const tracePromises = keys.map(async key => {
        const res = await fetch(`${root}/traces/${key}/json`)
        return await res.json()
    });
    return Promise.all(tracePromises)
}

export const getTraceData = async () => {
    const result = await fetch('http://localhost:3001/traces');
      const data = await result.json()
    return data
}