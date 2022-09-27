import { IStarknetWindowObject } from "get-starknet";
import { atom } from "recoil";
import { AccountInterface, ProviderInterface } from "starknet";
import { StarknetChainId } from "starknet/dist/constants";

export const walletAtom = atom<IStarknetWindowObject | undefined>({
  key: "Wallet",
  default: undefined,
});

export const accountAtom = atom<AccountInterface | undefined>({
  key: "Account",
  default: undefined,
});

export const starknetChainIdAtom = atom<StarknetChainId | undefined>({
  key: "StarknetChainId",
  default: undefined,
});

export const providerAtom = atom<ProviderInterface | undefined>({
  key: "StarknetProvider",
  default: undefined,
});

export const accountAddressAtom = atom<string | undefined>({
  key: "AccountAddress",
  default: undefined,
});

export const blockNumberAtom = atom<string>({
  key: "starknet_blockNumber",
  default: "0",
});
