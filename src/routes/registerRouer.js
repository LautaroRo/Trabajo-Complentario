import RouterMain from "./routerMain.js";
import passport from "passport";



export default class routerRegister extends RouterMain{

    init(){
        this.get("/", this.getRegister)
        this.post("/", this.CreateUser)
    }


    getRegister(req,res){
        res.render("registerUser")
    }
    async CreateUser(req, res) {
        passport.authenticate("register", { failureRedirect: "/failRegister" })(req, res, () => {

            res.redirect("/api/login")
        });
    }


}