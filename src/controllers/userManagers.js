import userModel from "../models/userModel.js";


export default class userManager{

    constructor(){}

    async getUsers(page,limit){

        const options = {
            page,
            limit
        }

        const result = await userModel.paginate({}, options)

        console.log(result)
        return result
    }

    async getUserbYId(id){

        const result = await userModel.findById(id)

        return result
    }


    async deleteUser(id){

        try{
            const result = userModel.deleteOne({_id: id})

            return result

        }catch(error){

            console.log(error)
        }

    }

    async createUser(user){

        const result = userModel.create(user)

        return result
    }

    async updateUser(id,data){

        const result = await userModel.updateOne({_id:id}, {$set: data})

        return result 
    }
}