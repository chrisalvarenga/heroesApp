export class Register {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    roles: string;

    constructor(name: string, lastName: string ,email: string, password: string, confirmPassword: string, roles: string) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.roles = roles;
    }
}