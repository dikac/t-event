export default interface Emit<Arguments extends any[] = any[], Return = undefined> {
    readonly emittable: boolean;
    emit(...Arguments: any[]): Return;
}
