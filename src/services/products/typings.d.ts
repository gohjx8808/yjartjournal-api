export interface rawProductData {
    name: string
    productImage: import('contentful').Asset[]
    price: number
    contentDescription: import('@contentful/rich-text-types').Document
    category: string
}

export interface productData extends Omit<rawProductData, 'contentDescription' | 'productImage'> {
    contentDescription: string
    productImage: pickedProductImageData[]
}

export interface pickedProductImageData {
    title: string;
    description: string;
    file: {
        url: string;
        details: {
            size: number;
            image?: {
                width: number;
                height: number;
            };
        };
        fileName: string;
        contentType: string;
    };
}