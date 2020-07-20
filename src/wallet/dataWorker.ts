// import wallet from "./Wallet"

// const doStuff = () => {
//     wallet.balance = utxos.reduce(prev, cur => prev + cur.value)
//     if(addresses.receive.latest.transactions.length > 0) {
//         wallet.receiveAddress = wallet.deriveAddress()
//     }
//     if(addresses.change.latest.transactions.length > 0) {
//         wallet.changeAddress = wallet.deriveChangeAddress()
//     }
// }

// const sendTx = () => {
//     utxos: {id: string, utxo: bitcore.Transaction.UnspentOutput}[] = wallet.selectUtxos
//     sendTx
//     utxoSet.markSpent(id, id, id)
// }

// const markSpent(...utxoIds) => {
//     utxoIds.forEach(id => {
//         utxos[id] = {
//             spent: true,
//             txId,
//             ...utxos[id]
//         }
//     })
// }
