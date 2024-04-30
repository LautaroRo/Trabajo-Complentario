import express from "express"
import MongoStore from "connect-mongo"
import mongoose from "mongoose"
import session from "express-session"
import handlebars from "express-handlebars"
import passport from "passport"
import initalizePassport from "./config/passportConfig.js"
import __dirname from "./utils.js"
import userRouter from "./routes/userRouter.js"
import routerLogin from "./routes/loginRouter.js"
import routerRegister from "./routes/registerRouer.js"

const app = express()
const PORT = 4000
const MongoUrl = "mongodb+srv://Lautaro:Ors6E5ixvF0N1pVh@cluster0.beeo5kk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const users = new userRouter
const login = new routerLogin
const register = new routerRegister

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))


mongoose.connect(MongoUrl)

app.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MongoUrl,
        ttl: 3600
    })
}))


initalizePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname  + "/views")
app.set("view engine", "handlebars")

app.use("/api/users", users.getRouter())
app.use("/api/login", login.getRouter())
app.use("/api/register", register.getRouter())
app.listen(PORT, () => console.log("corriendo"))

