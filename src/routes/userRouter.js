import RouterMain from "./routerMain.js";
import userManager from "../controllers/userManagers.js";
import { HashPassword, isValidPassword } from "../utils.js";
import userModel from "../models/userModel.js";
const manager = new userManager
export default class userRouter extends RouterMain{

    init(){
        this.get("create/:page?/:limit?", this.getUsers)
        this.get("/showFormUpdate", this.getUpgrade)
        this.delete("/:id", this.deleteUsers)
        this.post("/update", this.updateUser)
        this.get("/password", this.password)
        this.post("/password-catch", this.passwordCatch)
    }

    getUpgrade(req,res){
        res.render("restoreUser")
    }

    async getUsers(req,res){

        let {page, limit} = req.params

        if(page === null || page === undefined){
            page = 1
        }

        if(limit === null || limit === undefined){
            limit = 10
        }

        manager.getUsers(parseInt(page), parseInt(limit))
        
        res.json({succes: "Usuarios traidos"})
    }



    async deleteUsers(req,res){

        const params = req.params.id

        const exists = await userModel.findById(params)

        if(!exists) return res.json({error: "El usuario no existe"})

        manager.deleteUser(params)

        res.json({Succes: "Usuario eliminado"})
    }

    async updateUser(req,res){


        const {email} = req.query

        const exists = await userModel.find({email: email})

        if(!exists) return res.json({error: "El usuario no existe"})

        const data = req.query

        if(data.password){
            data.password = HashPassword(data.password)
        }

        manager.updateUser(exists._id,data)

        res.redirect("/api/login")

    }

    password(req,res) {

        res.render("passwordCatch")
    }

    async passwordCatch(req,res){

        const {email, password} = req.body

        const user = await userModel.findOne({email: email})

        if(!user) return res.json({error: "Usuario no encontrado"})

        const valid = isValidPassword(user,password)

        if(valid) return res.json({error: "Esta contraseña ya esta en uso"})
        const data = req.body


        data.password = HashPassword(data.password)

        manager.updateUser(user._id, data)

        
        console.log("Contraseña modificada")

        res.redirect("/api/login")

    }
}