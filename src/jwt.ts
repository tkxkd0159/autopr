import fs from "fs"
import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const pem = process.env.GHAPP_PEM_PATH!
const privKey = fs.readFileSync(pem)
const appID = "309530"
const jwtPayload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 10),
    iss: appID
}
const token = jwt.sign(jwtPayload, privKey, { algorithm: 'RS256'})
console.log(`JWT: ${token}`)