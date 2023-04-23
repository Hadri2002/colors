export default class Application {

    /**
     * @type {HTMLElement}
     * Target element of the application.
     */
    target;

    constructor(options) {
        options = options ?? {};

        this.validate(options);
        this.init();
    }

    validate(opts) {
        if (typeof opts !== 'object') {
            throw new Error('Options must be an object.');
        }

        if (!(opts.target instanceof HTMLElement)) {
            throw new Error('Argument target must be a valid HTML element.');
        }

        this.target = opts.target;
    }

    init() {
        console.log('Initialization started');
    }

    destroy() {
        console.log('Destroying application');
        while (this.target.lastChild) {
            this.target.lastChild.remove();
        }
    }
}