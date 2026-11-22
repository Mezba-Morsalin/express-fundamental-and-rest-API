import { pool } from "../../db";
import type { IProfile } from "./profile.interface";

const createProfileIntoDB = async (payload : IProfile) => {
    const {user_id, address, date_of_birth, bio, city, country, phone, gender} = payload;

    const user = await pool.query(`
            SELECT * FROM users WHERE id=$1
            `,[user_id]
    );

    if(user.rowCount === 0) {
        throw new Error("User Doesn't Exist")
    }

    const result = pool.query( `
        INSERT INTO profiles(user_id, address, date_of_birth, bio, city, country, phone, gender) VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
        `,[user_id, address, date_of_birth, bio, city, country, phone, gender])

        return result
}

const getProfileFromDB = async () => {
    const result = await pool.query(`
            SELECT * FROM profiles
            `)

    return result

}

const getSingleProfileFromDB = async (id : string) => {
    const result = await pool.query(`
            SELECT * FROM profiles WHERE user_id=$1
            `, [id])

    return result

}

export const profileService = {
    createProfileIntoDB,
    getProfileFromDB,
    getSingleProfileFromDB
}