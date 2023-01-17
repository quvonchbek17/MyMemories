import PG from "../../utils/postgres.js"

class loginModel extends PG{
    async selectedUser(username, password){
        return await this.fetchData(
            `Select * from users where user_username = $1 and user_password = $2`,
            username, password
        )
    }

    async postSessions(id, username, password, remoteip, device){
        return await this.fetchData(
            `Insert into user_sessions(user_id, user_username, user_password, session_remoteip, session_device) values($1,$2,$3,$4,$5)`,
            id, username, password, remoteip, device
        )
    }
}


export default new loginModel;