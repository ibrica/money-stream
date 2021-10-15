/**
 * Typescript types problems, we're going with plain JS (allowJS in tsconfig)
 */


import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as React from 'react';
import{ useCallback } from 'react';
let opts = { preflightCommitment: "processed"};


export const SendOneLamportToRandomAddress = () => {


    return (
        <button  >
            Send money
        </button>
    );
};