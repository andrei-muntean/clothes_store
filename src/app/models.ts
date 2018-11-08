export interface IProduct {
    productId: number;
    category: ICategory;
    name: string;
    images: IImageFile[];
    stocks: IStock[];
    discount: number;
    isAvailableOnCommand: boolean;
    description: string[];
    care: string[];
    price: number;
}

export interface ICategory {
    categoryId: number;
    name: string;
}

export interface IImageFile {
    name: string;
	content: any;
	format: string;
}

export interface IStock {
    size: string;
    count: number;
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
	category: ProductSex;
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
	sex: ProductSex;
}

enum ProductSex {
    Male, Female, Unisex
}

enum ProductSize {
    XS, S, M, L, XL, XXL, XXXL
}

export interface IPromotion {
	promotionId: number;
	title: string;
	description: string;
	promotedProductId: number;
	image: IImageFile;
	expiresAt: Date;
}