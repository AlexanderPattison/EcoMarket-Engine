// src/types/user.ts

export enum UserRole {
    User = 'user',
    Admin = 'admin',
    ContentCreator = 'contentCreator'
}

export interface User {
    _id: string;
    username: string;
    role: UserRole;
}