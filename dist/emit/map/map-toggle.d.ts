import MapWrapper from 't-map/wrapper';
import Toggle from "t-toggle/toggle";
import Emit from "../emit";
declare type Callback<Arguments extends any[], Return> = (...args: Arguments) => Return;
export default class MapToggle<Arguments extends any[], Return = void, EmitArguments extends any[] = Arguments, Key = any, Container extends Map<Key, Callback<Arguments, Return>> = Map<Key, Callback<Arguments, Return>>> extends MapWrapper<Key, Callback<Arguments, Return>, Container> implements Toggle, Emit<EmitArguments, Map<Key, Return>> {
    private emitting;
    private _enable;
    constructor(map: Container, enable?: boolean);
    get emittable(): boolean;
    get enable(): boolean;
    set enable(enable: boolean);
    emit(...args: Arguments): Map<Key, Return>;
}
export {};
