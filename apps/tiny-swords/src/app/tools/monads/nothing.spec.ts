import { Nothing } from "@tools";

describe('Nothing monad', () => {
   let instantiatedClass: Nothing<string>;

    beforeEach(() => {
        instantiatedClass = new Nothing('initial value');
    });

    it('constructor should set value correctly', () => {
        expect(instantiatedClass.extract()).toEqual('initial value');
    });

    it('map function should not change the value', () => {
        instantiatedClass.map(val => val + ' modified');
        expect(instantiatedClass.extract()).toEqual('initial value');
    });
});
