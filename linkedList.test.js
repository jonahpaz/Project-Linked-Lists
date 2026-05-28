import LinkedList from "./linkedList";

const list012 = {
    _head: {
        value: 0, nextNode: {
            value: 1, nextNode: {
                value: 2, nextNode: null
            }
        }
    }
}
Object.setPrototypeOf(list012, LinkedList.prototype);
const list12ab = {
    _head: {
        value: 1, nextNode: {
            value: 2, nextNode: {
                value: 'a', nextNode: {
                    value: 'b', nextNode: null
                }
            }
        }
    }
}
Object.setPrototypeOf(list12ab, LinkedList.prototype);

describe('Create linked list', () => {
    test('Empty list', () => {
        const input = undefined;
        const actual = new LinkedList(input);
        const expected = {_head: null};
        expect(actual).toEqual(expected);
    });
    test('List from value 0', () => {
        const input = 0;
        const actual = new LinkedList(input);
        const expected = {
            _head: {value: 0, nextNode: null}
        };
        expect(actual).toEqual(expected);
    });
    test('List from array [0]', () => {
        const input = [0];
        const actual = new LinkedList(input);
        const expected = {_head: 
            {value: 0, nextNode: null}
        };
        expect(actual).toEqual(expected);
    });
    test('List from array [0, 1, 2]', () => {
        const input = [0, 1, 2];
        const actual = new LinkedList(input);
        const expected = list012;
        expect(actual).toEqual(expected);
    });
    test('List from another list', () => {
        const input = new LinkedList([0, 1, 2]);
        const actual = new LinkedList(input);
        const expected = list012;
        expect(actual).toEqual(expected);
    });
});
describe('Get data from a linked list', () => {
    test('Get the tail value', () => {
        const actual = new LinkedList([1, 2, 3]).tail();
        const expected = 3;
        expect(actual).toEqual(expected);
    });
    test('Get the _head value', () => {
        const actual = new LinkedList([1, 2, 3]).head();
        const expected = 1;
        expect(actual).toBe(expected);
    });
    test('Get the size of a linked list with 3 nodes', () => {
        const actual = new LinkedList([1, 2, 3]).size();
        const expected = 3
        expect(actual).toEqual(expected);
    });
    test('Get value at index: 0 position', () => {
        const actual = new LinkedList([1, 2, 3]).at(0);
        const expected = 1;
        expect(actual).toBe(expected);
    });
    test('Get value undefined at index: 5 position', () => {
        const actual = new LinkedList([1, 2, 3]).at(5);
        const expected = undefined;
        expect(actual).toEqual(expected);
    });
    test('Get value at negative index: -3 position', () => {
        const actual = new LinkedList([1, 2, 3]).at(-3);
        const expected = 1;
        expect(actual).toBe(expected);
    });
    test('Find value at index', () => {
        const actual = list12ab.findIndex('b');
        const expected = 3;
        expect(actual).toEqual(expected);
    });
    test('Find non-existent value at index', () => {
        const actual = list12ab.findIndex('c');
        const expected = -1;
        expect(actual).toEqual(expected);
    });
    test('Assert existence of value', () => {
        const actual = list12ab.contains('c');
        const expected = false;
        expect(actual).toEqual(expected);
    });
})

test('Append a single value', () => {
    const input = {a: 5};
    const actual = new LinkedList();
    actual.append(input);
    const expected = {_head: 
        {value: {a: 5}, nextNode: null}
    };
    expect(actual).toEqual(expected);
});
test('Append each element of an array', () => {
    const input = [0, 1, 2];
    const actual = new LinkedList();
    actual.appendEach(input);
    const expected = list012;
    expect(actual).toEqual(expected);
});
test('Prepend a single value', () => {
    const input = 'New head';
    const actual = new LinkedList('Old head');
    actual.prepend(input);
    const expected = {
        _head: {
            value: 'New head', nextNode: {
                value: 'Old head', nextNode: null
            }
        }
    };
    expect(actual).toEqual(expected);
});
test('Link a list at the end (tail position)', () => {
    const input = new LinkedList(['a', 'b']);
    const actual = new LinkedList([1, 2]);
    actual.linkListAtTail(input);
    const expected = list12ab;
    expect(actual).toEqual(expected);
});
test('Link a list at the start (head position)', () => {
    const input = new LinkedList([1, 2]);
    const actual = new LinkedList(['a', 'b']);
    actual.linkListAtHead(input);
    const expected = list12ab;
    expect(actual).toEqual(expected);
});
test('Delete last node from list', () => {
    const actual = new LinkedList(['popped', 0, 1, 2]);
    const popped = actual.pop();
    const expected = list012;
    expect(actual).toEqual(expected);
    expect(popped).toEqual('popped');
});




// console.log('Expected: ', expected);
// console.log('Actual: ', actual);
