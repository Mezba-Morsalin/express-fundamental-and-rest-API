export type TypeByRole = "admin" | "moderator" | "user"

export const roles = {
    admin : "admin",
    moderator : "moderator",
    user : "user"
} as const