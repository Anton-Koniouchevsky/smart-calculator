const PRIORITY = {
    POW: 0,
    MULTIPLY: 1,
    DEVIDE: 2,
    ADD: 3,
    SUBTRACT: 4,
}

class SmartCalculator {
    constructor(initialValue) {
        this.operations = [
            [PRIORITY.ADD, initialValue]
        ];
        this.minPriority = PRIORITY.ADD;
        return this;
    }

    add(number) {
        this.operations.push([PRIORITY.ADD, number]);
        return this;
    }

    subtract(number) {
        this.operations.push([PRIORITY.SUBTRACT, number]);
        return this;
    }

    multiply(number) {
        this.operations.push([PRIORITY.MULTIPLY, number]);
        this.minPriority = this.minPriority > PRIORITY.MULTIPLY ? PRIORITY.MULTIPLY : this.minPriority;
        return this;
    }

    devide(number) {
        this.operations.push([PRIORITY.DEVIDE, number]);
        this.minPriority = this.minPriority > PRIORITY.DEVIDE ? PRIORITY.DEVIDE : this.minPriority;
        return this;
    }

    pow(number) {
        this.operations.push([PRIORITY.POW, number]);
        this.minPriority = PRIORITY.POW;
        return this;
    }

    valueOf() {
        let priority = this.minPriority;
        while (priority < 3) {
            for (let operation = this.operations.length - 1; operation > 0; operation--) {
                if (this.operations[operation][0] == priority) {
                    switch (priority) {
                        case PRIORITY.POW:
                            this.operations[operation - 1][1] = Math.pow(this.operations[operation - 1][1], this.operations[operation][1]);
                            break;
                        case PRIORITY.MULTIPLY:
                            this.operations[operation - 1][1] *= this.operations[operation][1];
                            break;
                        case PRIORITY.DEVIDE:
                            this.operations[operation - 1][1] /= this.operations[operation][1];
                            break;
                    }
                    this.operations.splice(operation, 1);
                }
            }
            priority++;
        }
        return this.operations.reduce((init, curr) => {
            curr[0] == PRIORITY.ADD ? init += curr[1] : init -= curr[1];
            return init;
        }, 0);
    }
}

module.exports = SmartCalculator;