export class User{
    active:	boolean
    activeAccountToken:	string
    addresse: any
    birthDate:	string
    childUser:	any
    cni:	string
    currency:	string
    email:	string
    id:	number
    location:	string
    name:	string
    parentUser:	any
    password:	string
    repassword:	string
    pays:	string
    profilePicture:	string
    refferedUser:	string
    resetToken:	string
    roles:	Role[]
    tel:	string
    username:	string
    ville:	string
    solde: number
    companySize: string
    companyAddress: string
    isCompagny: boolean
}


export class Role {
    id:	number
    role:	string
}

export class ResetPassword{
    password!: string;
    token!: string
}


