import MapToggle from "../../../dist/emit/map/map-toggle";

it("force console log", () => { spyOn(console, 'log').and.callThrough();});


describe('enabled', () => {

    let map = new MapToggle<[number], number>(
        new Map<any, (n : number) => number>()
    );

    let data1 = 1;
    map.set(0, (n : number) => {
        data1 = n;
        return 1;
    });


    let data2 = 2;
    map.set(1, (n : number) => {
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
        expect([..._return]).toEqual([[0,1],[1,2]]);
    });
});

describe('disabled', () => {

    let map = new MapToggle<[number]>(
        new Map<any, (n : number) => void>()
    );

    let data1 = 1;
    map.set(0, (n : number) => {
        data1 = n;
    });


    let data2 = 2;
    map.set(1, (n : number) => {
        data2 = n;
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