/**
* @module Base
*/
import Template from "./template.js";
import { Tag } from "./enums/enum.tag.js";
export { Gesture } from "./enums/enum.gesture.js";
export { Tag } from "./enums/enum.tag.js";
/**
* @category Base
*/
export default abstract class Component extends HTMLElement {
    static get attributes(): any;
    /**
     * Standard Web Component lifecycle method which returns a list of attributes in DOM to observe
     * @hidden
     */
    static get observedAttributes(): string[];
    static get tag(): Tag;
    private static throwUndefinedComponent;
    configuration: any;
    root: ShadowRoot;
    template: Template;
    /**
    * Base component by default does not use an HTML Template
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
    private _addEventHandlers;
    private _addEventHandler;
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
