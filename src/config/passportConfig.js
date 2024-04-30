import passport from "passport";
import local from "passport-local"
import userModel from "../models/userModel.js";
import { isValidPassword, HashPassword } from "../utils.js";
import userManager from "../controllers/userManagers.js";

const manager = new userManager

const LocalStrategy = local.Strategy

const initalizePassport = () => {

    passport.use(
        "login",
        new LocalStrategy({usernameField: "email"}, async (username, password, done) => {
            try {
                console.log("test")
                const user = await userModel.findOne({email: username});

                if (!user) return done(null, false);
    
                const valid = isValidPassword(user, password);

                if (!valid) return done(null, false);

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );

    passport.use(
        "register",
        new LocalStrategy({usernameField:"email", passReqToCallback: true},
            async (req, username, password, done) => {
                try {

                    console.log("test")
                    const {first_name,last_name,email,age,number,role} =  req.body
    
                    const exists = await userModel.findOne({email:username})
    
                    if(exists) return done(null,false)
        
                    const object = {
                        first_name,
                        last_name,
                        email,
                        age,
                        number,
                        role,
                        password: HashPassword(password)
                    }
        
                    const result = await manager.createUser(object);
    
                    if (result) {
                        req.session.user = {
                            first_name: result.first_name,
                            last_name: result.last_name,
                            email: result.email,
                            age: result.age,
                            number: result.number,
                            role: result.role,
                        }
        
                        return done(null, username)
                    }
        
                    return done(null,false)
                } catch (error) {
                    console.error(error);
                }
            })
    );

    passport.serializeUser((user,done) => {

        done(null, user._id)

    })

    passport.deserializeUser(async(id,done) => {

        try{

            let user = await userModel.findById(id)

            done(null,user)

        }catch(error){

            done(error)

        }
    })
}

export default initalizePassport