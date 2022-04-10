
import { SellingPrice } from './sellingPrice';

export interface Fund {
	id: number;
	name: string;
	amount: number;	
	sellingPrice: SellingPrice | null;
}

