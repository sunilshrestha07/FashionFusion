
export interface BuyInterface{
    name:string,
    productId:string,
    price:number,
    size:string,
    color:string,
}
export interface AddToCart{id: string;
    price: number;
    quantity: number;
    totalPrice: number;
    name: string;
}


export interface SignUpInterface{
    name:string,
    email:string,
    password:string
}
export interface LoginInterface{
    email:string,
    password:string
}
export interface VerifyInterface{
    email:string
    verificationCode:string
}