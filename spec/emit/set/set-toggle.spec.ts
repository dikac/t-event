import MapToggle from "../../../dist/emit/map/map-toggle";
import SetToggle from "../../../dist/emit/set/set-toggle";

it("force console log", () => { spyOn(console, 'log').and.callThrough();});


describe('insert', () => {

    let map = new SetToggle<[number], number>(
        new Set<(n : number) => number>()
    );

    let data1 = 1;
    map.add((n : number) => {
        data1 = n;
        return 1;
    });


    let data2 = 2;
    map.add((n : number) => {
        data2 = n;
        return 2;
    });

    it("initial", () => {

        expect(data1).toBe(1);
        expect(data2).toBe(2);
    });


    it("emitted", () => {

        let _return = map.emit(5);
        expect(data1).toBe(5);
        expect(data2).toBe(5);
        expect([..._return]).toEqual([1,2]);
    });
});

describe('disabled', () => {

    let map = new SetToggle<[number], number>(
        new Set<(n : number) => number>()
    );

    let data1 = 1;
    map.add((n : number) => {
        data1 = n;
        return 1;
    });


    let data2 = 2;
    map.add((n : number) => {
        data2 = n;
        return 2;
    });

    it("initial", () => {

        expect(data1).toBe(1);
        expect(data2).toBe(2);
    });


    it("emitted", () => {

        map.enable = false;
        let _return = map.emit(5);
        expect(data1).toBe(1);
        expect(data2).toBe(2);
        expect([..._return]).toEqual([]);
    });
});