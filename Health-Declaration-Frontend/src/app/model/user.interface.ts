import { Gender } from "./enum/gender.enum";
import { UserStatus } from "./enum/user-status.enum";
import { Role } from "./role";

export interface User {
    id?: number;
    fullName?: string;
    phone?: string;
    email?: string;
    password?: string;
    dateOfBirth?: Date;
    gender?: Gender;
    avatar?: string;
    address?: string;
    healthInsuranceNumber?: string;
    idCard?: string;
    status?: UserStatus;
    uniqueId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    roles?: Role[];
}
