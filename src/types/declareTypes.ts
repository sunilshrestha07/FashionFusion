export interface BuyInterface {
   name: string;
   productId: string;
   price: number;
   size: string;
}
export interface AddToCart {
   _id: string;
   price: number;
   name: string;
   image: string;
}

export interface SignUpInterface {
   name: string;
   email: string;
   password: string;
}
export interface LoginInterface {
   email: string;
   password: string;
}
export interface VerifyInterface {
   email: string;
   verificationCode: string;
}
export interface dressInterface {
   name: string;
   description: string;
   price: number;
   discount: number;
   category: string;
   image: string;
   sale: string;
}

export interface getDressInterface {
   _id: string;
   name: string;
   description: string;
   price: number;
   discount: number;
   category: string;
   image: string;
   sale: boolean;
   rating: number;
}

export interface reviewInterface {
   postId: string;
   rating: number;
   comment: string;
   userId: string;
   userImage: string;
   userName: string;
}

export interface getReviewInterface {
   _id: string;
   postId: string;
   rating: number;
   comment: string;
   userId: string;
   userImage: string;
   userName: string;
   createdAt: string;
}

export interface userProfile {
   userName?: string;
   email?: string;
   avatar?: string;
   password?: string;
}

export interface orderInterface {
   userId: string;
   dressName: string;
   totalPrice: number;
   quantity: number;
   userName: string;
   userEmail: string;
}

export interface getOrderInterface {
   _id: string;
   userId: string;
   dressName: string;
   totalPrice: number;
   quantity: number;
   userName: string;
   userEmail: string;
   status: string;
}

export interface buyDressInterface {
   _id: string;
   name: string;
   price: number;
   image: string;
   discount: number;
}