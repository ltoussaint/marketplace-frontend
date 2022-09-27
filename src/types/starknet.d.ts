import {  IStarknetWindowObject } from "get-starknet";

export {};

declare global {
  interface Window {
    starknet: {
      id: string;
    };
  }
}
     
declare module "@starknet-react/core" {

  interface Connector {
    _wallet: IStarknetWindowObject
  }
}