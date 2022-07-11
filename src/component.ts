/**
* @module Base
*/

import Template from "./template.js";
import { Tag } from "./enums/enum.tag.js";

export { Gesture } from "./enums/enum.gesture.js"
export { Tag } from "./enums/enum.tag.js"
/**
* @category Base
*/
export default abstract class Component extends HTMLElement { 
    public static get attributes(): any {return []}
    
    /**
     * Standard Web Component lifecycle method which returns a list of attributes in DOM to observe
     * @hidden
     */
    public static get observedAttributes(): string[] {
        return Object.values(this.attributes)
    }

    public static get tag(): Tag {
        return Tag[this.name] ?? this.throwUndefinedComponent(this.name) 
    }
    
    private static throwUndefinedComponent = (name): void => {
        throw new Error(`Missing Definition: ${name} in enum Tag`)
    }
    
    public configuration: any;
    public root: ShadowRoot;
    public template: Template;

    /**
    * Base component by default does not use an HTML Template 
    * @readonly
    * @category Attributes
    */
    public get templateId(): string  { return '' }

    /**
     * Called after connection with DOM established
     * @hidden
     */
    public connectedCallback(): void {
        this._addEventHandlers();
        this._addEventListeners();
        this._addTemplate();
        this._render();
    }


    /**
     * Called after component removed from DOM
     * @hidden
     */
    public disconnectedCallback(): void {
        this._removeEventListeners();
    }

    /**
    * Triggers when attribute in this.attributes initial or subsequent value set.
    * @hidden
    */
    public attributeChangedCallback (
        attribute: string, 
        oldValue: string, 
        newValue: string): void {

        // Manage attributes with Enums
        /* istanbul ignore next */
        switch (attribute) {
            case 'default':
                //console.log(`default changed from ${oldValue} to ${newValue}`)
            break;
        };
    }
                
    private _addEventHandlers = () => 
        this.configuration?.gestures?.forEach(this._addEventHandler)
    
    private _addEventHandler = ({event, operation, parameters}, index, arr) => { 
        arr[index] = {
            event: event,
            operation: operation,
            parameters: parameters,
            handler: (event) => this[operation]()
        }
    }

    /**
     * Bind UI Gestures: Mouse and Touchscreen, to Component Operations
     * TODO: Add gestures and gesture type signature
     */
    private _addEventListeners = () => 
        this.configuration?.gestures?.forEach(({event, handler, parameters}) => 
            this.addEventListener(event,handler,parameters))
    
    private _removeEventListeners = () =>
        this.configuration?.gestures?.forEach(({event, handler}) =>
            this.removeEventListener(event,handler))

    private _addShadowRoot = (): ShadowRoot => 
        this.root = this.attachShadow({mode: 'closed'});
    
    private _hasTemplate = (): boolean => 
        this.templateId !== ''

    private _loadTemplate = () => {
        this._addShadowRoot();
        this.template = new Template({
            id: this.templateId,
            root: this.root
        })
    }
    private _addTemplate = () =>
        this._hasTemplate() && this._loadTemplate(); 

    protected _render = () => {}  
}