/**
 * Typescript types problems, we're going with plain JS (allowJS in tsconfig)
 */

 const anchor = require("@project-serum/anchor");
 import { Program, Provider} from '@project-serum/anchor';
 const { PublicKey, Transaction, SystemProgram } = anchor.web3;
 const { TOKEN_PROGRAM_ID, Token } = require("@solana/spl-token");
 const idl = require('./idl/money_stream_program.json');

const baseAccount = null;
let tokenAccount = null;
let _tokenAccount = null;
const provider = null;
const programID = null;
const program = null;
const streamAccount = null;
let vault_account_pda = null;
let vault_account_bump = null;
let vault_authority_pda = null;

// async?
export async function init(connection, wallet){
  baseAccount = anchor.web3.Keypair.generate();
  streamAccount = anchor.web3.Keypair.generate();
  provider =  await new Provider(connection, wallet, opts);
  anchor.setProvider(provider);
  programID = new PublicKey(idl.metadata.address);
  program = new Program(idl, programID, provider);
  const [_vault_account_pda, _vault_account_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(anchor.utils.bytes.utf8.encode("token-seed"))],
    program.programId
  );
  vault_account_pda = _vault_account_pda;
  vault_account_bump = _vault_account_bump;
  mintTokens();
}

/*
const initializerMainAccount = anchor.web3.Keypair.generate();
const takerMainAccount = anchor.web3.Keypair.generate();
const streamAccount = anchor.web3.Keypair.generate();
*/

async function mintTokens(){
  let mint = null;

  const payer = anchor.web3.Keypair.generate();
  const mintAuthority = anchor.web3.Keypair.generate();

  let mintAmount = 100; // mint new tokens
  // Airdropping tokens to a payer.
  await provider.connection.confirmTransaction(
    await provider.connection.requestAirdrop(payer.publicKey, 5000000000), //Devnet limit
    "confirmed"
  );

  mint = await Token.createMint(
    provider.connection,
    payer,
    mintAuthority.publicKey,
    null,
    0,
    TOKEN_PROGRAM_ID
  );

  tokenAccount = await mint.createAccount(initializerMainAccount.publicKey);

  await mint.mintTo(
    tokenAccount,
    mintAuthority.publicKey,
    [mintAuthority],
    mintAmount
  );
  _tokenAccount = await mint.getAccountInfo(tokenAccount);
}


export async function initalizeStream(){
  await program.rpc.initializeStream(
    vault_account_bump,
    new anchor.BN(60),
    new anchor.BN(1),
    new anchor.BN(10),
    {
      accounts: {
        initializer: baseAccount.publicKey,
        vaultAccount: vault_account_pda,
        mint: mint.publicKey,
        initializerTokenAccount: tokenAccount,
        streamAccount: streamAccount.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      instructions: [
        await program.account.streamAccount.createInstruction(streamAccount),
      ],
      signers: [streamAccount, initializerMainAccount],
    }
  );
}

async function tick(){
  await program.rpc.tick({
    accounts: {
      initializer: baseAccount.publicKey,
      streamAccount: streamAccount.publicKey,
    },
    signers: [initializerMainAccount]
  });
}

async function balance(){
  await program.rpc.balance({
    accounts: {
      taker: baseAccount.publicKey,
      initializer: initializerMainAccount.publicKey,
      takerTokenAccount: takerTokenAccount,
      streamAccount: streamAccount.publicKey,
    },
    signers: [takerMainAccount]
  });
}

async function withdraw() {
  await program.rpc.withdraw({
    accounts: {
      taker: baseAccount.publicKey,
      initializer: initializerMainAccount.publicKey,
      takerTokenAccount: takerTokenAccount,
      initializerTokenAccount: initializerTokenAccount,
      streamAccount: streamAccount.publicKey,
      vaultAccount: vault_account_pda,
      vaultAuthority: vault_authority_pda,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
    signers: [takerMainAccount]
  });
}

async function cancel(){
  await program.rpc.cancelStream({
    accounts: {
      initializer: initializerMainAccount.publicKey,
      takerTokenAccount: takerTokenAccount,
      initializerTokenAccount: initializerTokenAccount,
      vaultAccount: vault_account_pda,
      vaultAuthority: vault_authority_pda,
      streamAccount: streamAccount.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
    signers: [initializerMainAccount]
  });
}
