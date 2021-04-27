export const dot = (x: any, y: any): any => y[x]
export const not = (x: any): any => !x
export const plus = (x: any, y: any): any => y === undefined ? x : y + x
export const minus = (x: any, y: any): any => y === undefined ? -x : y - x
export const multi = (x: any, y: any): any => y * x
export const div = (x: any, y: any): any => y / x
export const mod = (x: any, y: any): any => y % x
export const eq = (x: any, y: any): any => y == x
export const seq = (x: any, y: any): any => y === x
export const ne = (x: any, y: any): any => y != x
export const sne = (x: any, y: any): any => y !== x
export const lt = (x: any, y: any): any => y < x
export const gt = (x: any, y: any): any => y > x
export const le = (x: any, y: any): any => y <= x
export const ge = (x: any, y: any): any => y >= x
export const or = (x, y) => y || x
export const and = (x: any, y: any): any => y && x
export const cond = (x: any, y: any, z: any): any => z ? x : y
