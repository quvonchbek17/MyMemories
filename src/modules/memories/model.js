import PG from "../../utils/postgres.js"

class memoriesModel extends PG{

    async getAllMemory(userId){
        return await this.fetchData(
            `Select * from memories where user_id = $1`,
            userId
        )
    }

    async getAllLikes(userId){
        return await this.fetchData(
            `Select * from memories where user_id = $1 and memory_like = $2`,
            userId, true
        )
    }

    async getAllDislikes(userId){
        return await this.fetchData(
            `Select * from memories where user_id = $1 and memory_dislike = $2`,
            userId, true
        )
    }

    async getMemoryById(id, userId){
        return await this.fetchData(
            `Select * from memories where memory_id = $1 and user_id = $2`,
            id, userId
        )
    }

    async postMemory(userId, title, desc, media){

        const created = await this.fetchData(
            `Select * from memories where user_id = $1 and memory_title = $2 and memory_desc = $3 and memory_media = $4`,
            userId, title, desc, media
        );

      if (created.length > 0) {
        return null;
      } else {
        return this.fetchData(
            `Insert into memories(user_id, memory_title, memory_desc, memory_media) values($1, $2, $3, $4)`,
            userId, title, desc, media
        )
      }
    }

    async updateMemory(title, desc, media, like, dislike, id){
        return this.fetchData(
            `Update memories set updated_at = NOW(), memory_title = $1, memory_desc = $2, memory_media = $3, memory_like = $4, memory_dislike = $5 where memory_id = $6`,
            title, desc, media, like, dislike, id
        )
    }

    async deleteMemory(id){
        return this.fetchData(
            `Delete from memories where memory_id = $1`,
            id
        )
    }
}

export default new memoriesModel;
