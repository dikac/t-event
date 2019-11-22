import SetWrapper from 't-set/wrapper';
import Toggle from "t-toggle/toggle";
import Emit from "../emit";
declare type Callback<Arguments extends any[], Return> = (...args: Arguments) => Return;
export default class SetToggle<Arguments extends any[], Return = void, EmitArguments extends any[] = Arguments, Container extends Set<Callback<Arguments, Return>> = Set<Callback<Arguments, Return>>> extends SetWrapper<Callback<Arguments, Return>, Container> implements Toggle, Emit<EmitArguments, Set<Return>> {
    private emitting;
    private _enable;
    constructor(set: Container, enable?: boolean);
    get emittable(): boolean;
    get enable(): boolean;
    set enable(enable: boolean);
    emit(...args: Arguments): Set<Return>;
}
export {};
