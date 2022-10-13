const parseAuctions = (auctionsSchema) =>
  auctionsSchema.map((auctionSchema) => {
    return {
      username: auctionSchema.username ?? '',
      password: auctionSchema.password ?? '',
      isAdmin: auctionSchema.isAdmin ?? '',
    }
  })

export default parseAuctions
