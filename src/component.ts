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
export class Component extends HTMLElement {
  /**
   * When extending `Component`, override attributes.
   * Return attributes to observe in DOM and set the appropriate return type
   * @category Attributes
   */
  public static get attributes(): any {
    return {};
  }

  /**
   * Standard Web Component lifecycle method which returns a list of attributes in DOM to observe
   * @hidden
   */
  public static get observedAttributes(): string[] {
    return Object.keys(this.attributes);
  }

  /**
   * By convention component html tags are defined and stored in the component library.
   * Providing the library has a tag defined for the component no error will be thrown.
   */
  public static get tag() {
    let name = this.name.toUpperCase();
    return Tag[name] ?? this.throwUndefinedComponent(name);
  }

  private static throwUndefinedComponent = (name): void => {
    throw new Error(`Undefined Component: Add ${name} to component library`);
  };

  public configuration: any;
  public root: ShadowRoot;
  public template: Template;

  /**
   * @hidden
   */
  constructor() {
    super();
  }

  /**
   * Base component by default does not use an HTML Template
   * Return Attribute.TEMPLATE or Default to component tag if template required
   * @readonly
   * @category Attributes
   */
  public get templateId(): string {
    return "";
  }

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
  public attributeChangedCallback(
    attribute: string,
    oldValue: string,
    newValue: string
  ): void {
    /* istanbul ignore next */
    switch (attribute) {
      case "default":
        //console.log(`default changed from ${oldValue} to ${newValue}`)
        break;
    }
  }
  private _addEventHandler = ({ event, operation, parameters }, index, arr) => {
    arr[index] = {
      event: event,
      operation: operation,
      parameters: parameters,
      handler: (event) => this[operation](),
    };
  };

  private _addEventHandlers = () =>
    this.configuration?.gestures?.forEach(this._addEventHandler);

  /**
   * Bind UI Gestures: Mouse and Touchscreen, to Component Operations
   * TODO: Add gestures and gesture type signature
   */
  private _addEventListeners = () =>
    this.configuration?.gestures?.forEach(({ event, handler, parameters }) =>
      this.addEventListener(event, handler, parameters)
    );

  private _removeEventListeners = () =>
    this.configuration?.gestures?.forEach(({ event, handler }) =>
      this.removeEventListener(event, handler)
    );

  private _addShadowRoot = (): ShadowRoot =>
    (this.root = this.attachShadow({ mode: "closed" }));

  private _hasTemplate = (): boolean => this.templateId !== "";

  private _loadTemplate = () => {
    this._addShadowRoot();
    this.template = new Template({
      id: this.templateId,
      root: this.root,
    });
  };
  private _addTemplate = () => {
    console.log(this.templateId);
    this._hasTemplate() && this._loadTemplate();
  };

  protected _render = () => {};
}
