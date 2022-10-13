const parseUsers = (usersSchema) =>
  usersSchema.map((userSchema) => {
    return {
      username: userSchema.username ?? '',
      password: userSchema.password ?? '',
      isAdmin: userSchema.isAdmin ?? '',
    }
  })

export default parseUsers
