function mincost(arr) {
    // Check if the array has at least two ropes
    if (arr.length < 2) {
        return "At least two ropes are required to connect.";
    }

    // Use a min heap to efficiently find and connect the smallest ropes
    const minHeap = new MinHeap(arr);

    // Initialize the total cost
    let totalCost = 0;

    // Continue connecting ropes until there is only one rope left in the heap
    while (minHeap.size() > 1) {
        // Extract the two smallest ropes from the heap
        const rope1 = minHeap.extractMin();
        const rope2 = minHeap.extractMin();

        // Calculate the cost of connecting these two ropes and add it to the total cost
        const currentCost = rope1 + rope2;
        totalCost += currentCost;

        // Insert the newly connected rope back into the heap
        minHeap.insert(currentCost);
    }

    return totalCost;
}

// MinHeap class for efficient min heap operations
class MinHeap {
    constructor(arr = []) {
        this.heap = arr;
        this.buildHeap();
    }

    buildHeap() {
        const len = Math.floor(this.heap.length / 2);
        for (let i = len; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    size() {
        return this.heap.length;
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.size() === 0) {
            return null;
        }
        if (this.size() === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

    heapifyUp(index) {
        let parent = Math.floor((index - 1) / 2);
        while (index > 0 && this.heap[index] < this.heap[parent]) {
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }

    heapifyDown(index) {
        let child = 2 * index + 1;
        while (child < this.size()) {
            if (child + 1 < this.size() && this.heap[child + 1] < this.heap[child]) {
                child++;
            }
            if (this.heap[index] <= this.heap[child]) {
                break;
            }
            [this.heap[index], this.heap[child]] = [this.heap[child], this.heap[index]];
            index = child;
            child = 2 * index + 1;
        }
    }
}

module.exports = mincost;
