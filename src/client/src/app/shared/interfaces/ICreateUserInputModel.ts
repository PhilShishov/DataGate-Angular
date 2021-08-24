export interface ICreateUserInputModel {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    roleType: string;
    recaptchaValue: string;
}

export const userColumns = ['username','role','lastLogin','actions'];