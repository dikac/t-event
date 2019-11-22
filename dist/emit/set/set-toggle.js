(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "t-set/wrapper"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const wrapper_1 = require("t-set/wrapper");
    class SetToggle extends wrapper_1.default {
        constructor(set, enable = true) {
            super(set);
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
            let _return = new Set();
            if ( /*this.executing || */this.size === 0 || !this.enable) {
                return _return;
            }
            this.emitting = true;
            try {
                for (let val of this) {
                    _return.add(val(...args));
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
    exports.default = SetToggle;
});
//# sourceMappingURL=set-toggle.js.map