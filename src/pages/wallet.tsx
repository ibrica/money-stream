import * as React from 'react';
import { FC, useMemo, useCallback  } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import {
    getLedgerWallet,
    getPhantomWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolletExtensionWallet,
    getSolletWallet
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import toast, { Toaster } from 'react-hot-toast';
import Navigation from './navigation';
import Notification from './notification';

const Wallet: FC = () => {
    
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you configure here will be compiled into your application

    const wallets = useMemo(() => [
        getPhantomWallet(),
        getLedgerWallet(),
        getSolflareWallet(),
        getSlopeWallet(),
        getSolletWallet({ network }),
        getSolletExtensionWallet({ network })
    ], [network]); 

    const onError = useCallback(
        (error: WalletError) =>
            toast.custom(
                <Notification
                    message={error.message ? `${error.name}: ${error.message}` : error.name}
                    variant="error"
                />
            ),
        []
    );
    
    return (      
        <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} onError={onError} autoConnect>
            <WalletModalProvider>
                <Navigation />
            </WalletModalProvider>
            <Toaster position="bottom-left" reverseOrder={false} />
        </WalletProvider>
    </ConnectionProvider>
    );
};

export default Wallet;