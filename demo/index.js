import { Component, Gesture } from "@browser-modules/web.component";

class Test extends Component {
  configuration = {
    gestures: [
      {
        event: Gesture.CLICK,
        operation: "one",
      },
    ],
  };
  one = () => console.log("Operation.ONE");
}
customElements.define(Test.tag, Test);

// Demo
let component = document.getElementsByTagName(Test.tag)[0];
component.click();
