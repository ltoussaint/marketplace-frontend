import { FC, PropsWithChildren, ReactElement, useEffect, useTransition } from "react";
import { AccountInterface } from "starknet";
import { useConnectors, useStarknet, useStarknetBlock } from "@starknet-react/core";

import { useRecoilState, useSetRecoilState } from "recoil";
import {
  accountAddressAtom,
  accountAtom,
  blockNumberAtom,
  providerAtom,
  starknetChainIdAtom,
  walletAtom,
} from "src/state";

const StarknetSyncState: FC<PropsWithChildren> = ({ children }) => {
  const setAccount = useSetRecoilState(accountAtom);
  const setAccountAddress = useSetRecoilState(accountAddressAtom);
  const [wallet, setWallet] = useRecoilState(walletAtom);
  const setStarknetChainId = useSetRecoilState(starknetChainIdAtom);
  const setProvider = useSetRecoilState(providerAtom);
  const setBlockNumber = useSetRecoilState(blockNumberAtom);
  const { data: blockData } = useStarknetBlock();
  const [, startTransition] = useTransition();

  const { account: accountAddress, library: provider } = useStarknet();

  const { connectors } = useConnectors();

  useEffect(() => {
    if (blockData?.block_number) {
      startTransition(() => {
        setBlockNumber(blockData.block_number.toString());
      });
    }
  }, [blockData]);

  useEffect(() => {
    startTransition(() => {
      setProvider(provider);
    });
  }, [provider]);

  useEffect(() => {
    if (!wallet) {
      return;
    }

    const handleAccountsChanged = (newAccounts: string[] | string | undefined) => {
      const changedAccounts = Array.isArray(newAccounts) ? newAccounts : [newAccounts];

      if (changedAccounts.length === 0 || changedAccounts[0] === undefined) {
        setAccountAddress(undefined);

        // @todo try auto connect
        return;
      }

      (async () => {
        const addresses = await wallet.enable();
        console.log({ addresses });
        const newWalletAddress = changedAccounts[0];
        console.log("change account", newWalletAddress);

        setAccountAddress(newWalletAddress);
      })();
    };

    console.log("ADD event accountsChanged");
    wallet.on("accountsChanged", handleAccountsChanged);

    return () => {
      console.log("REMOVE event accountsChanged");
      wallet.off("accountsChanged", handleAccountsChanged);
    };
  }, [connectors, wallet]);

  useEffect(() => {
    (async () => {
      for (const connector of connectors) {
        const account: AccountInterface = await connector.account();
        if (accountAddress !== undefined && account?.address === accountAddress) {
          startTransition(() => {
            setAccount(account);
            setAccountAddress(account.address);
            setStarknetChainId(account.chainId);
            setWallet(connector._wallet);
          });
          return;
        }
      }
      startTransition(() => {
        setAccount(undefined);
      });
    })();
  }, [accountAddress, connectors]);

  return children as ReactElement;
};

export default StarknetSyncState;
