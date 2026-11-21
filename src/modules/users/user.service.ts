import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserDB = async (payload : IUser) => {
    const { name, email, password, age } = payload

        const result = await pool.query(`
            INSERT INTO users (name, email, password, age) VALUES
            ($1, $2, $3, $4) RETURNING *
        `, [name, email, password, age]);

        return result
};

const getUserFromDB = async () => {
    const result = await pool.query(`
        SELECT * FROM users
        `)
        return result
}

const getSingleUserFromDB = async (id : string) => {
    const result = await pool.query(`
            SELECT * FROM users WHERE id=$1
            `,[id]);

        return result
}

const updateUserFromDB = async (payload : Partial <IUser>, id : string) => {
    const {name, password, is_Active, age} = payload

        const result = await pool.query(`
            UPDATE users
            SET
            name = COALESCE($1, name),
            password = COALESCE($2, password),
            is_Active = COALESCE($3, is_Active),
            age = COALESCE($4, age),
            updated_at = NOW()

            WHERE id=$5 RETURNING *

            `, [name ?? null, password ?? null, is_Active ?? null, age ?? null, id])

            return result
}

export const userService = {
    createUserDB,
    getUserFromDB,
    getSingleUserFromDB,
    updateUserFromDB
}