import passport from "passport";
import RouterMain from "./routerMain.js";

export default class routerLogin extends RouterMain {

    init() {
        this.get("/", this.getLogin)
        this.post("/", this.login)
        this.get("/delete",this.logOut)
        this.get("/profile", this.getProfile)
    }

    getProfile(req,res){
        if(!req.session.user)  res.redirect("/api/login")

        
        res.render("profile", {user:req.session.user})
    }

    getLogin(req, res) {

        if(req.session.user){
            res.redirect("/api/login/profile")
        }else{
            res.render("home")
        }
    }
    login(req, res, next) {
        passport.authenticate("login", { failureRedirect: "/FailLogin" })(req, res, () => {
            try {
                req.session.user = {
                    first_name: req.user.first_name,
                    last_name: req.user.last_name,
                    email: req.user.email,
                    age: req.user.age
                }
                if (!req.session.user) {
                    return res.status(400).send("error");
                }

                res.redirect("/api/login/profile")
            } catch (error) {
                next(error);
            }
        });
    }

    logOut(req,res){

        if (req.session.user) {
            req.session.destroy();
            res.send({ success: "Sesión eliminada" });
        }
    }
}