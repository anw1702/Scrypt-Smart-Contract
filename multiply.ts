import { SmartContract, assert, method, prop } from 'scrypt-ts'

export class Multiply extends SmartContract {
    @prop()
    product: bigint

    constructor(p: bigint) {
        super(...arguments)
        this.product = p
    }

    @method()
    public unlock(numA: bigint, numB: bigint) {
        assert(numA * numB == this.product, 'incorrect product')
    }
}
