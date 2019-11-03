import MapWrapper from 't-map/wrapper';
import Toggle from "t-toggle/toggle";
import Emit from "../emit";

type Callback<Arguments extends any[], Return> = (...args : Arguments) => Return;

export default class
    MapToggle<
        Arguments extends any[],
        Return = void,
        EmitArguments extends any[] = Arguments,
        Key = any,
        Container extends Map<Key, Callback<Arguments, Return>> = Map<Key, Callback<Arguments, Return>>>
    extends
        MapWrapper<
            Key,
            Callback<Arguments, Return>,
            Container
        >
    implements
        Toggle,
        Emit<
            EmitArguments,
            Map<Key, Return>
        >
{

    private emitting : boolean = false;
    private _enable !: boolean;

    constructor(
        map : Container,
        enable : boolean = true
    ) {
        super(map);
        this.enable = enable;
    }

    get emittable () : boolean {

        return  this._enable && !this.emitting;
    }


    get enable() : boolean {

        return this._enable;
    }

    set enable(enable : boolean)  {

        this._enable = enable;
    }

    emit(...args : Arguments) : Map<Key, Return> {

        let _return = new Map<Key, Return>();

        if(/*this.executing || */this.size === 0 || !this.enable) {

            return _return;
        }

        this.emitting = true;

        try {

            for(let [key, val] of this) {

                _return.set(key, val(...args));
            }

        } catch (e) {

            throw e;

        } finally {

            this.emitting = false;
        }

        return _return;
    }
}
