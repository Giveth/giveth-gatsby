export function base64ToBlob(base64) {
  const binaryString = window.atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; ++i) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return new Blob([bytes], { type: 'application/pdf' })
}

export async function getEtherscanTxs(address) {
  // DO THIS
  try {
    const apiKey = process.env.ETHERSCAN_API_KEY
    const api = process.env.GATSBY_NETWORK_ID === '3' ? 'api-ropsten' : 'api'
    const balance = await fetch(
      `https://${api}.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
    )
      .then(response => response.json())
      .then(data => {
        return data?.result
      })

    return await fetch(
      `https://${api}.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
    )
      .then(response => response.json())
      .then(data => {
        const modified = data?.result.map(t => {
          return {
            ...t,
            donor: t.from,
            createdAt: t.timeStamp,
            currency: 'ETH'
          }
        })
        return {
          balance,
          txs: modified
        }
      })
  } catch (error) {
    console.log({ error })
  }
}
