import { toNano } from '@ton/core';
import { Ulw } from '../wrappers/Ulw';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const ulw = provider.open(Ulw.createFromConfig({}, await compile('Ulw')));

    await ulw.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(ulw.address);

    // run methods on `ulw`
}
