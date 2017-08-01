
export interface IStyle {
  icon: string;
  backgroundColor: string;
  titleColor: string;
  textColor:string;
  fontFamily: string;
}

export interface IItem {
  name: string;
  description: string;
  price: number;
  style: IStyle;
  isSelected: boolean;
}

export class Item implements IItem {
  name: string;
  description: string;
  price: number;
  style: IStyle;
  isSelected: boolean;

  constructor( _item: any) {
    this.name = _item.name;
    this.description = _item.description;
    this.price = _item.price;
    this.style = _item.style;
    this.isSelected = false;
  }
}



