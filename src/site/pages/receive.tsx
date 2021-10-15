import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import * as React from 'react';
import{ FC, Component, useCallback } from 'react';
const bridge = require('../bridge');



export const StartStreaming: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const wallet = useWallet();

    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();
        await bridge.init(connection, wallet);
        await bridge.initalizeStream();
      
    }, [publicKey, wallet, connection]);

    return (
        <button onClick={onClick} disabled={!publicKey}>
            Send money
        </button>
    );
};