import SetWrapper from 't-set/wrapper';
import Toggle from "t-toggle/toggle";
import Emit from "../emit";

type Callback<Arguments extends any[], Return> = (...args : Arguments) => Return;

export default class
    SetToggle<
        Arguments extends any[],
        Return = void,
        EmitArguments extends any[] = Arguments,
        Container extends Set<Callback<Arguments, Return>> = Set<Callback<Arguments, Return>>>
    extends
        SetWrapper<
            Callback<Arguments, Return>,
            Container
        >
    implements
        Toggle,
        Emit<
            EmitArguments,
            Set<Return>
        >
{

    private emitting : boolean = false;
    private _enable !: boolean;

    constructor(
        set : Container,
        enable : boolean = true
    ) {
        super(set);
        this.enable = enable;
    }

    get emittable () : boolean {

        return this._enable && !this.emitting;
    }


    get enable() : boolean {

        return this._enable;
    }

    set enable(enable : boolean)  {

        this._enable = enable;
    }

    emit(...args : Arguments) : Set<Return> {

        let _return = new Set<Return>();

        if(/*this.executing || */this.size === 0 || !this.enable) {

            return _return;
        }

        this.emitting = true;

        try {

            for(let val of this) {

                _return.add(val(...args));
            }

        } catch (e) {

            throw e;

        } finally {

            this.emitting = false;
        }

        return _return;
    }
}
