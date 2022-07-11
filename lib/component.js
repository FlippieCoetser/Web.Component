/**
* @module Base
*/
import Template from "./template.js";
import { Tag } from "./enums/enum.tag.js";
/**
* @category Base
*/
export default class Component extends HTMLElement {
    constructor() {
        super(...arguments);
        this._addEventHandlers = () => this.configuration?.gestures?.forEach(this._addEventHandler);
        this._addEventHandler = ({ event, operation, parameters }, index, arr) => {
            arr[index] = {
                event: event,
                operation: operation,
                parameters: parameters,
                handler: (event) => this[operation]()
            };
        };
        /**
         * Bind UI Gestures: Mouse and Touchscreen, to Component Operations
         * TODO: Add gestures and gesture type signature
         */
        this._addEventListeners = () => this.configuration?.gestures?.forEach(({ event, handler, parameters }) => this.addEventListener(event, handler, parameters));
        this._removeEventListeners = () => this.configuration?.gestures?.forEach(({ event, handler }) => this.removeEventListener(event, handler));
        this._addShadowRoot = () => this.root = this.attachShadow({ mode: 'closed' });
        this._hasTemplate = () => this.templateId !== '';
        this._loadTemplate = () => {
            this._addShadowRoot();
            this.template = new Template({
                id: this.templateId,
                root: this.root
            });
        };
        this._addTemplate = () => this._hasTemplate() && this._loadTemplate();
        this._render = () => { };
    }
    static get attributes() { return []; }
    /**
     * Standard Web Component lifecycle method which returns a list of attributes in DOM to observe
     * @hidden
     */
    static get observedAttributes() {
        return Object.values(this.attributes);
    }
    static get tag() {
        return Tag[this.name] ?? this.throwUndefinedComponent(this.name);
    }
    /**
    * Base component by default does not use an HTML Template
    * @readonly
    * @category Attributes
    */
    get templateId() { return ''; }
    /**
     * Called after connection with DOM established
     * @hidden
     */
    connectedCallback() {
        this._addEventHandlers();
        this._addEventListeners();
        this._addTemplate();
        this._render();
    }
    /**
     * Called after component removed from DOM
     * @hidden
     */
    disconnectedCallback() {
        this._removeEventListeners();
    }
    /**
    * Triggers when attribute in this.attributes initial or subsequent value set.
    * @hidden
    */
    attributeChangedCallback(attribute, oldValue, newValue) {
        // Manage attributes with Enums
        /* istanbul ignore next */
        switch (attribute) {
            case 'default':
                //console.log(`default changed from ${oldValue} to ${newValue}`)
                break;
        }
        ;
    }
}
Component.throwUndefinedComponent = (name) => {
    throw new Error(`Missing Definition: ${name} in enum Tag`);
};
