export default class LinkedList {
    constructor(value) {
        switch (true) {
            case value instanceof LinkedList:
                this._head = value._head;
                break;
            case value instanceof Array:
                const list = new LinkedList();
                list.appendEach(value);
                this._head = list._head;
                break;
            case value !== undefined && value !== null:
                this._head = LinkedList.#Node(value);
                break;
            default:
                this._head = null;
        }
    }
    static #Node(value = null, nextNode = null) {
        return {value, nextNode};
    }
    static #tailNode(list) {
        let lastNode = list._head;
        while (lastNode.nextNode !== null) {
            lastNode = lastNode.nextNode;
        }
        return lastNode;
    }
    static #linkAtTail(list, newTail) {
        if (list._head === null) {
            list._head = newTail;
            return;
        }
        let lastNode = list._head;
        while (lastNode.nextNode !== null) {
            lastNode = lastNode.nextNode;
        }
        lastNode.nextNode = newTail;
    }
    static #linkAtIndex(list, index, insertionHead, insertionTail) {
        if (insertionTail === undefined) insertionTail = insertionHead;
        if (!list._head) {
            list._head = insertionHead;
            return;
        }
        if (!list._head.nextNode) {
            const nodeAtIndex = list.at(index);
            insertionTail.nextNode = list._head;
            list._head = insertionHead;
            return;
        }
        const nodeBeforeIndex = list.at(index - 1);
        const nodeAtIndex = nodeBeforeIndex.nextNode;
        nodeBeforeIndex.nextNode = insertionHead;
        insertionTail.nextNode = nodeAtIndex;
    }
    head() {
        return this._head ? this._head.value : undefined;
    }
    tail() {
        if (!this._head) return undefined;
        const tailNode = LinkedList.#tailNode(this);
        return tailNode.value;
    }
    size() {
        let count = 0;
        let curr = this._head;
        while (curr) {
            count++;
            curr = curr.nextNode;
        }
        return count;
    }
    at(index) {
        if (!this._head) return undefined;
        if (index < 0) {
            index += this.size();
            if (index < 0) return undefined;
        }
        let i = 0;
        let node = this._head;
        while (i < index && node.nextNode) {
            node = node.nextNode;
            i++
        }
        return i === index ? node.value : undefined;
    }
    contains(value) {
        return this.findIndex(value) === -1 ? false : true;
    }
    findIndex(value) {
        let index = 0;
        let existence = false;
        let curr = this._head;
        while (curr) {
            existence = curr.value === value;
            if (existence) break;
            curr = curr.nextNode;
            index++;
        }
        if (!existence) index = -1;
        return index;
    }
    toString() {
        let linkedString = '';
        let curr = this._head;
        while (curr) {
            let nodeString = `( ${JSON.stringify(curr.value)} ) -> `
            if (!curr.nextNode) nodeString += 'null';
            linkedString += nodeString;
            curr = curr.nextNode;
        }
        return linkedString;
    }
    log(message) {
        console.log('');
        console.log(message);
        console.log('List: ', this.toString());
        console.log('Size: ', this.size());
        console.log('');
    }
    prepend(value) {
        if (value === undefined || value === null ) return;
        let newHead = LinkedList.#Node(value, this._head);
        this._head = newHead;
    }
    append(value) {
        if (value === undefined || value === null) return;
        let tail = LinkedList.#Node(value);
        LinkedList.#linkAtTail(this, tail);
    }
    appendEach(array) {
        if (!(array instanceof Array) || array.length === 0) return;
        let i = array.length - 1;
        const tailValue = array[i];
        const tempList = new LinkedList(tailValue);
        i--;
        while (i >= 0) {
            let currValue = array[i];
            let preTailNode = LinkedList.#Node(currValue);
            preTailNode.nextNode = tempList._head;
            tempList._head = preTailNode;
            i--;
        }
        this.linkListAtTail(tempList);
    }
    linkListAtTail(list) {
        if (!(list instanceof LinkedList)) return;
        const linkingNode = list._head;
        LinkedList.#linkAtTail(this, linkingNode);
    }
    linkListAtHead(list) {
        if (!(list instanceof LinkedList) || !list._head) return;

        const newHead = list._head;
        const linkingNode = LinkedList.#tailNode(list);
        const oldHead = this._head;

        linkingNode.nextNode = oldHead;
        this._head = newHead;
    }
    insertAt(value, index) {
        if (value === undefined || value === null) return;
        if (!Number.isInteger(index)) return;
        let insertion = LinkedList.#Node(value);
        LinkedList.#linkAtIndex(this, index, insertion);
    }
    linkListAt(list, index) {
        if (!(list instanceof LinkedList)) return;
        if (!list._head) return;
        LinkedList.#linkAtIndex(this, index, insertion);
    }
    insertAt(index, ...values) {

    }
    pop() {
        if (this._head === null) return undefined;
        let firstNode = this._head;
        this._head = firstNode.nextNode;
        return firstNode.value;
    }
    removeAt(index) {

    }
}