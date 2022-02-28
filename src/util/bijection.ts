/**
 *	Rosenberg Strong Pairing
 *
 *	bijection which maps N²->N
 *
 * @param x - the x coordinate
 * @param y - the y coordinate
 * @returns the paired value
 */
const rosenbergStrongPair = (x: number, y: number): number =>
	x < y ? y * y + x : x * x + 2 * x - y;

export { rosenbergStrongPair as biject };
