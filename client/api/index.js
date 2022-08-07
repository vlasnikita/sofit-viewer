export const getTraces = async () => {
    const result = await fetch(
        'https://hn.algolia.com/api/v1/search?query=redux',
      );
    return result
}