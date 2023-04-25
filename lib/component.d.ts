/**
 * @module Component
 */
import { Template } from "./template.js";
export { Gesture } from "./enums/enum.gesture.js";
export { Tag } from "@browser-modules/component.library";
/**
 * @category Component
 */
export declare class Component extends HTMLElement {
    /**
     * When extending `Component`, override attributes.
     * Return attributes to observe in DOM and set the appropriate return type
     * @category Attributes
     */
    static get attributes(): any;
    /**
     * Standard Web Component lifecycle method which returns a list of attributes in DOM to observe
     * @hidden
     */
    static get observedAttributes(): string[];
    /**
     * By convention component html tags are defined and stored in the component library.
     * Providing the library has a tag defined for the component no error will be thrown.
     */
    static get tag(): any;
    private static throwUndefinedComponent;
    configuration: any;
    root: ShadowRoot;
    template: Template;
    /**
     * @hidden
     */
    constructor();
    /**
     * Base component by default does not use an HTML Template
     * Return Attribute.TEMPLATE or Default to component tag if template required
     * @readonly
     * @category Attributes
     */
    get templateId(): string;
    /**
     * Called after connection with DOM established
     * @hidden
     */
    connectedCallback(): void;
    /**
     * Called after component removed from DOM
     * @hidden
     */
    disconnectedCallback(): void;
    /**
     * Triggers when attribute in this.attributes initial or subsequent value set.
     * @hidden
     */
    attributeChangedCallback(attribute: string, oldValue: string, newValue: string): void;
    private _addEventHandler;
    private _addEventHandlers;
    /**
     * Bind UI Gestures: Mouse and Touchscreen, to Component Operations
     * TODO: Add gestures and gesture type signature
     */
    private _addEventListeners;
    private _removeEventListeners;
    private _addShadowRoot;
    private _hasTemplate;
    private _loadTemplate;
    private _addTemplate;
    protected _render: () => void;
}
