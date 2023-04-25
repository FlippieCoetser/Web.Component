/**
 * @module Component
 */
import { Template } from "./template.js";
import { Tag } from "@browser-modules/component.library";
export { Gesture } from "./enums/enum.gesture.js";
export { Tag } from "@browser-modules/component.library";
/**
 * @category Component
 */
class Component extends HTMLElement {
    /**
     * When extending `Component`, override attributes.
     * Return attributes to observe in DOM and set the appropriate return type
     * @category Attributes
     */
    static get attributes() {
        return {};
    }
    /**
     * Standard Web Component lifecycle method which returns a list of attributes in DOM to observe
     * @hidden
     */
    static get observedAttributes() {
        return Object.keys(this.attributes);
    }
    /**
     * By convention component html tags are defined and stored in the component library.
     * Providing the library has a tag defined for the component no error will be thrown.
     */
    static get tag() {
        let name = this.name.toUpperCase();
        return Tag[name] ?? this.throwUndefinedComponent(name);
    }
    /**
     * @hidden
     */
    constructor() {
        super();
        this._addEventHandler = ({ event, operation, parameters }, index, arr) => {
            arr[index] = {
                event: event,
                operation: operation,
                parameters: parameters,
                handler: (event) => this[operation](),
            };
        };
        this._addEventHandlers = () => this.configuration?.gestures?.forEach(this._addEventHandler);
        /**
         * Bind UI Gestures: Mouse and Touchscreen, to Component Operations
         * TODO: Add gestures and gesture type signature
         */
        this._addEventListeners = () => this.configuration?.gestures?.forEach(({ event, handler, parameters }) => this.addEventListener(event, handler, parameters));
        this._removeEventListeners = () => this.configuration?.gestures?.forEach(({ event, handler }) => this.removeEventListener(event, handler));
        this._addShadowRoot = () => (this.root = this.attachShadow({ mode: "closed" }));
        this._hasTemplate = () => this.templateId !== "";
        this._loadTemplate = () => {
            this._addShadowRoot();
            this.template = new Template({
                id: this.templateId,
                root: this.root,
            });
        };
        this._addTemplate = () => {
            console.log(this.templateId);
            this._hasTemplate() && this._loadTemplate();
        };
        this._render = () => { };
    }
    /**
     * Base component by default does not use an HTML Template
     * Return Attribute.TEMPLATE or Default to component tag if template required
     * @readonly
     * @category Attributes
     */
    get templateId() {
        return "";
    }
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
        /* istanbul ignore next */
        switch (attribute) {
            case "default":
                //console.log(`default changed from ${oldValue} to ${newValue}`)
                break;
        }
    }
}
Component.throwUndefinedComponent = (name) => {
    throw new Error(`Undefined Component: Add ${name} to component library`);
};
export { Component };
