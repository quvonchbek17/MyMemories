import PG from "../../utils/postgres.js"

class uploadModel extends PG{

    async getFileByID(id){
        return await this.fetchData(
            `select * from files where file_id = $1 and playlist = $2`,
            id, false
        )
    }

    async getAllFileByID(id, user_id){
        return await this.fetchData(
            `select * from files where file_id = $1 and user_id = $2`,
            id, user_id
        )
    }

    async getPlaylist(userId){
        return await this.fetchData(
            `select * from files where user_id = $1 and playlist = $2`,
            userId, true
        )
    }

    async getPlaylistById(id, userId){
        return await this.fetchData(
            `select * from files where user_id = $1 and playlist = $2 and file_id = $3`,
            userId, false, id
        )
    }

    async postFile(userId, name, type, size, upload_name, url, playlist){
        return await this.fetchData(
            `Insert into files(user_id, file_name, file_type, file_size, upload_name, file_url, playlist) values($1,$2,$3,$4,$5,$6,$7)  RETURNING *`,
            userId, name, type, size, upload_name, url, playlist
        )
    }

    async deleteFile(id){
        return await this.fetchData(
            `Delete from files where file_id = $1`,
            id
        )
    }
}

export default new uploadModel;
