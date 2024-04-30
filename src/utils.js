import {fileURLToPath} from "url"
import { dirname } from "path";
import bcrypt from "bcrypt"


const __filname = fileURLToPath(import.meta.url)
const __dirname = dirname(__filname)

export const HashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}
export default __dirname