(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "t-map/wrapper"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const wrapper_1 = require("t-map/wrapper");
    class MapToggle extends wrapper_1.default {
        constructor(map, enable = true) {
            super(map);
            this.emitting = false;
            this.enable = enable;
        }
        get emittable() {
            return this._enable && !this.emitting;
        }
        get enable() {
            return this._enable;
        }
        set enable(enable) {
            this._enable = enable;
        }
        emit(...args) {
            let _return = new Map();
            if ( /*this.executing || */this.size === 0 || !this.enable) {
                return _return;
            }
            this.emitting = true;
            try {
                for (let [key, val] of this) {
                    _return.set(key, val(...args));
                }
            }
            catch (e) {
                throw e;
            }
            finally {
                this.emitting = false;
            }
            return _return;
        }
    }
    exports.default = MapToggle;
});
//# sourceMappingURL=map-toggle.js.map