import { Utils } from "../src/utils.js";

// Component Unit Tests
import { Component, Gesture } from "../src/component.js";
import { Tag } from "../node_modules/@browser-modules/component.library/lib/library.js";

describe("Given Component imported", () => {
  it("Then Component should be defined", () => {
    expect(Component).toBeDefined();
  });
  describe("Given Component has static members", () => {
    it("Then Component.attributes should be defined", () => {
      expect(Component.attributes).toBeDefined();
    });
    it("Then Component.attributes should equal []", () => {
      expect(Component.attributes).toEqual({});
    });
    it("Then Component.observedAttributes should be defined", () => {
      expect(Component.observedAttributes).toBeDefined();
    });
    it("Then Component.observedAttributes should equal []", () => {
      expect(Component.observedAttributes).toEqual([]);
    });
    describe("Given Component added to Tag enumeration", () => {
      beforeEach(() => {
        Tag["Component"] = "component-test";
      });
      afterEach(() => {
        Tag["Component"] = undefined;
      });
      it("Then Tag.Component should be defined", () => {
        expect(Tag["Component"]).toBeDefined();
      });
      it("Then Component.tag should equal Tag.component", () => {
        expect(Component.tag).toEqual(Tag["Component"]);
      });
      it("Then Component.tag should not throw an error", () => {
        expect(() => Component.tag).not.toThrowError();
      });
    });
    describe("Given Component missing from Tag enumeration", () => {
      it("Then Tag.Component should be undefined", () => {
        expect(Tag["Component"]).toBeUndefined();
      });
    });
  });
  describe("Given user interface type component class defined", () => {
    const TEMPLATE = "templateId";
    class View extends Component {
      public get [TEMPLATE](): string {
        return this.getAttribute(TEMPLATE) ?? View.tag;
      }
    }
    it("Then Component should be defined", () => {
      expect(View).toBeDefined();
    });
    describe("Given Component added to Tag enumeration", () => {
      it("Then Tag.Component should be defined", () => {
        expect(Tag["VIEW"]).toBeDefined();
      });
      describe("Given Component defined", () => {
        beforeEach(() => {
          Utils.defineComponent(View.tag, View);
        });
        it("Then custom element registry should contain Component", async () => {
          expect(customElements.get(View.tag)).toBe(View);
        });
        describe("Given HTML Template added to DOM", () => {
          let HTMLTemplate: HTMLTemplateElement;
          beforeEach(() => {
            HTMLTemplate = Utils.createTemplate(
              View.tag,
              `<div>Hello World</div>`
            );
          });
          afterEach(() => {
            Utils.removeTemplate(View.tag);
          });
          it("Then one HTML Template should exist in DOM", () => {
            expect(document.getElementsByTagName("template")).toHaveSize(1);
          });
          describe("Given component added to DOM", () => {
            let component: View;
            beforeEach(() => {
              component = Utils.createComponent<View>(View.tag);
            });
            afterEach(() => {
              component.remove();
            });
            it("Then one component should exist in DOM", () => {
              expect(document.getElementsByTagName(View.tag).length).toEqual(1);
            });
            it("Then component.templateId should be UI.tag", () => {
              expect(component.templateId).toBe(View.tag);
            });
            it("Then component._hasTemplate should be true", () => {
              expect(component["_hasTemplate"]()).toBe(true);
            });
          });
        });
      });
    });
  });
  describe("Given business logic type component class defined", () => {
    const spy = jasmine.createSpy("spy");
    const enum Operation {
      ONE = "one",
    }
    class Logic extends Component {
      public configuration = {
        gestures: [
          {
            event: Gesture.CLICK,
            operation: Operation.ONE,
          },
        ],
      };
      public [Operation.ONE] = (): void => spy();
    }
    it("Then component should be defined", () => {
      expect(Logic).toBeDefined();
    });
    describe("Given component added to Tag enumeration", () => {
      it("Then Tag.Component should be defined", () => {
        expect(Tag["LOGIC"]).toBeDefined();
      });
      describe("Given component defined", () => {
        beforeEach(() => {
          Utils.defineComponent(Logic.tag, Logic);
        });
        it("Then custom element registry should contain Component", async () => {
          expect(customElements.get(Logic.tag)).toBe(Logic);
        });
        describe("Given no HTML Template added to DOM", () => {
          it("Then no HTML Template should exist in DOM", () => {
            expect(document.getElementsByTagName("template").length).toEqual(0);
          });
          describe("Given BL added to DOM", () => {
            let component: Logic;
            beforeEach(() => {
              component = Utils.createComponent<Logic>(Logic.tag);
            });
            afterEach(() => {
              component.remove();
            });
            it("Then one component should exist in DOM", () => {
              expect(document.getElementsByTagName(Logic.tag).length).toBe(1);
            });
            it("Then component.templateId should be empty string", () => {
              expect(component.templateId).toBe("");
            });
            it("Then component._hasTemplate should be false", () => {
              expect(component["_hasTemplate"]()).toBe(false);
            });
            describe("When component is clicked", () => {
              it("Then Operation.ONE should be called once", () => {
                component.click();
                expect(spy).toHaveBeenCalledTimes(1);
              });
            });
          });
        });
      });
    });
  });
});
