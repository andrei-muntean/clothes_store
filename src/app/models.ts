// Non definion means that those are the models you will receive from the server
export interface IProduct extends IEditable {
    productId?: number;
	category: ICategory;
	sex: string;	
    name: string;
    images: IImageFile[];
    stocks: IStock[];
    discount: number;
	isAvailableOnCommand?: boolean;
	isFavourite: boolean;
    description: string[];
    care: string[];
	price: number;
	addedAt: Date;
}

// Definition means the models you want to add on server
export interface IProducttDefinition {
	categoryId: number;
    name: string;
    images: IImageFile[];
    stocks: IStock[];
    price: number;
    discount: number;
    isAvailableOnCommand: boolean;
	isFavourite: boolean;
    description: string[];
    care: string[];
}

export interface ICategory {
    categoryId?: number;
	name: string;
	sex?: string;
}

export interface IImageFile {
    name?: string;
	content?: string;
	format?: string; 
	isBase64Encoded?: boolean;
	hasThumbnail?: boolean;
}

export interface IStock {
    size: string;
    count?: number;
}

export interface OrderDefinition {
	buyer: Buyer;
	orderedProducts: OrderedProductDefinition[];
	shippingMethodId: number;
	billingFirstName: string;
	billingLastName: string;
	billingAddress: string;
	billingCity: string;
	billingCountry: string;
	billingPostalCode: number;
	billingPhoneNumber: number;
}

export interface OrderedProductDefinition {
	productId: number;
	size: ProductSize;
	count: number;
}

export interface Order {
	orderId: number;
	buyer: Buyer;
	orderedProducts: OrderedProduct[];
	placedAt: string;
	shippingMethod: string;
	billingFirstName: string;
	billingLastName: string;
	billingAddress: string;
	billingCity: string;
	billingCounty: string;
	billingCountry: string;
	billingPostalCode: number;
	billingPhoneNumber: number;
}

export interface OrderedProduct {
	productId: number;
	category: string;
	name: string;
	size: ProductSize;
	count: number;
	price: number;
	discount: number;
}

export interface Buyer {
	email: string;
	isSubscribed: boolean;
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	county: string;
	country: string;
	postalCode: number;
	phoneNumber: number;
}

export interface OrderCategory {
	categoryId: number;
	name: string;
	sex: string;
}

export enum ProductSize {
	XS = 'XS', 
	S = 'S', 
	M = 'M', 
	L = 'L', 
	XL = 'XL', 
	XXL = 'XXL', 
	XXXL = 'XXXL'
}

export interface IPromotion {
	promotionId: number;
	name: string;
	price: number;
	discount: number;
	image: IImageFile[];
}

export interface IEditable {
	editable?: boolean;
}