import { DefaultProvider, bsv } from 'scrypt-ts'
import { Multiply } from './src/contracts/multiply'
import { NeucronSigner } from 'neucron-signer'

async function main() {
    const provider = new DefaultProvider({ network: bsv.Networks.mainnet })
    const signer = new NeucronSigner(provider)
    const amount = 2

    await signer.login('sales@timechainlabs.io', 'string')
    await Multiply.loadArtifact()

    const product = BigInt(15)
    const instance = new Multiply(product)
    await instance.connect(signer)

    const deployTx = await instance.deploy(amount)
    console.log(
        'smart lock deployed : https://whatsonchain.com/tx/' + deployTx.id
    )

    const numA = 3
    const numB = 5
    await new Promise((f) => setTimeout(f, 5000))
    const { tx: callTx } = await instance.methods.unlock(numA, numB)
    console.log(
        'contract unlocked successfully : https://whatsonchain.com/tx/' +
            callTx.id
    )
}

main()
