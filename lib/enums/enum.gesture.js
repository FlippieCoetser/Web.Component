/**
* @module Base
*/
/**
* UI Gestures via Keyboard, Mouse, Touch, etc, used by Components
* @category Configuration
*/
export var Gesture;
(function (Gesture) {
    Gesture["MOUSEDOWN"] = "mousedown";
    Gesture["MOUSEUP"] = "mouseup";
    Gesture["TOUCHSTART"] = "touchstart";
    Gesture["TOUCHEND"] = "touchend";
    Gesture["CLICK"] = "click";
})(Gesture || (Gesture = {}));
