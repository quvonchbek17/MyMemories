import PG from "../../utils/postgres.js"

class uploadModel extends PG{
    async postFile(userId, name, type, size, url){
        return await this.fetchData(
            `Insert into files(user_id, file_name, file_type, file_size, file_url) values($1,$2,$3,$4,$5)`,
            userId, name, type, size, url
        )
    }
}

export default new uploadModel;
