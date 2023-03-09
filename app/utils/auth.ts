import { Jwt } from "jsonwebtoken"
import config from "../config/config"

function sign(data) {
    return Jwt.sign(data, config.jwt.jwt_expire, {
        expiresIn: config.jwt.jwt_expire
    })
}


function vertify(token: string) {
    try {
        var decoded = Jwt.vertify(token, config.jwt.jwt_secret)
        return {
            admin: decoded,
            error: null
        }
    } catch (err) {
        return {
            admin: null
        }
    }
}