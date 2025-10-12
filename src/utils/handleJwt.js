const bcrypt = require("bcryptjs")

const encrypt = async (stringText)=>{
    const hash =  await bcrypt.hash(
        stringText,
        Number(process.env.BCRYPT_SALT_ROUNDS)
    )
    return hash
}

const compare = async(stringPassword, hashPassword)=>{
return await bcrypt.compare(
    stringPassword,
    hashPassword
)
}

module.exports={
    encrypt,
    compare
}