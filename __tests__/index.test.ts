import {double, concat, waitSeconds} from '../src';
import mock = jest.mock;

/*
* Este exemplo contém um grupo de testes
* definido pela função describe e dentro
* do grupo tem dois testes definidos com
* a função test. Lembrando que também é
* possível criar sub-grupos com a função describe.
*
*
* Dentro da função test você precisa declarar
* uma expectativa seguida de um matcher.
* Neste exemplo, expect é a expectativa e toBe
* é o matcher. Ou seja, você espera que o retorno
* de uma função (ou uma varíavel) seja igual a um determinado valor.
*/

describe('testing index file', () => {
    test('double function', () => {
        expect(double(5)).toBe(10);
    });

    test('concat function', () => {
        expect(concat('John', ' ', 'Wick')).toBe('John Wick');
    });
});

describe('example of asynchronous testing', () => {
    test('testing with async/await', async () => {
        expect(await waitSeconds(1)).toBe('waited 1 seconds');
    });

    test('testing returning a promise', () => {
        return expect(waitSeconds(1.5)).resolves.toBe('waited 1.5 seconds');
    });

    test('testing returning a promise with callback function', () => {
        return waitSeconds(0.5).then((response) => {
            expect(response).toBe('waited 0.5 seconds');
        });
    });

    test('testing with callback function', (done) => {
        waitSeconds(0.8).then((response) => {
            expect(response).toBe('waited 0.8 seconds');
            done();
        });
    });
});

describe('additional testing cases', () => {
    test('matcher not toBe', () => {
        expect(1).not.toBe(2);
    });

//https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c

    test('returns undefined by default', () => {
        const mock = jest.fn();
        let result = mock("foo");

        expect(result).toBeUndefined();
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith("foo");
    })

    test('mock implementation', () => {
        const mock = jest.fn((foo: string) => "bar");

        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");
    });

    test('also mock implementation', () => {
        const mock = jest.fn().mockImplementation((foo: string) => "bar");

        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");
    });

    test('mock implementation one time', () => {
        const mock = jest.fn().mockImplementationOnce(() => "bar");

        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");

        expect(mock("baz")).toBe(undefined);
        expect(mock).toHaveBeenCalledWith("baz");
    });

    test('mock return value', () => {
        const mock = jest.fn();
        mock.mockReturnValue("bar");

        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");
    });

    test('mock promise resolution', () => {
        const mock = jest.fn();
        mock.mockResolvedValue("bar");

        expect(mock("foo")).resolves.toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");
    });


    /*
    * This strategy is solid, but it requires
    * that your code supports dependency injection.
    * Often that is not the case, so we will need
    * tools to mock existing modules and functions instead.
    */

    describe('dependency injection testing case', () => {
        const doAdd = (a, b, callback) => {
            callback(a + b);
        };

        test('calls callback with arguments added', () => {
            const mockCallback = jest.fn();
            doAdd(1, 2, mockCallback);
            expect(mockCallback).toHaveBeenCalledWith(3);
        })
    });
})
