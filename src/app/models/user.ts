export interface User{
    uid?:string;
    email?:string;
    emailVerified?:boolean;
    fechaAcceso?:Date;
    sexo?:string;
    nombre?:string;
    apellido?:string;
    tipo?:string;
    password?:string;
    especialidad?:string[];
}
