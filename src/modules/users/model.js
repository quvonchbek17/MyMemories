import PG from "../../utils/postgres.js"

class usersModel extends PG{
    async getUserById(id){
        return await this.fetchData(
            `Select * from users where user_id = $1`,
            id
        )
    }

    // async getUserByName(username){
    //     return await this.fetchData(
    //         `Select * from users where user_username = $1`,
    //         username
    //     )
    // }

    async DeleteUserMemories(id){
        return await this.fetchData(
            `Delete from memories where user_id = $1`,
            id
        )
    }

    async getUserFiles(id){
        return await this.fetchData(
            `Select * from files where user_id = $1`,
            id
        )
    }

    async DeleteUserFiles(id){
        return await this.fetchData(
            `Delete from files where user_id = $1`,
            id
        )
    }

    async selectedUser(username, password){
        return await this.fetchData(
            `Select * from users where user_username = $1 and user_password = $2`,
            username, password
        )
    }

    async registerUser(name, username, password, email){

        const created = await this.fetchData(
            `Select * from users where user_username = $1 or user_email = $2 `,
            username, email
        );

      if (created.length > 0) {
        return null;
      } else {
        return this.fetchData(
            `Insert into users(user_name, user_username, user_password, user_email) values($1, $2, $3, $4) RETURNING *`,
            name, username, password, email
        )
      }
    }

    async updateUser(name, username, password, email, id){
        return this.fetchData(
            `Update users set updated_at = NOW(), user_name = $1, user_username = $2, user_password = $3, user_email = $4 where user_id = $5`,
            name, username, password, email, id
        )
    }

    async deleteUser(id){
        return this.fetchData(
            `Delete from users where user_id = $1`,
            id
        )
    }
}

export default new usersModel;
