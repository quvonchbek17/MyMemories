import PG from "../../utils/postgres.js";

class protectModel extends PG {
    selectedUser(id, username){
        return this.fetchData(
            `select * from users where user_username = $1 and user_id = $2`,
            username, id
        )
    }

    userById(id){
     return this.fetchData(
        `select * from users where user_id = $1`,
        id
     )

    }
}


export default protectModel;