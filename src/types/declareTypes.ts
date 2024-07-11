
export interface BuyInterface{
    name:string,
    productId:string,
    price:number,
    size:string,
    color:string,
}
export interface AddToCart{
    _id: string;
    price: number;
    name: string;
    image: string;
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
export interface dressInterface{
    name:string
    description:string
    price:number
    discount:number
    category:string
    image:string
    sale:string
}

export interface getDressInterface{
    _id:string
    name:string
    description:string
    price:number
    discount:number
    category:string
    image:string
    sale:boolean
    rating:number

}