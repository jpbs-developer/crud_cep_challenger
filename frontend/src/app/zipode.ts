export interface ZipCode {
  id: number;
  zipCode: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  number: string;
}

export type ZipCodeError = {
  erro: true;
};
