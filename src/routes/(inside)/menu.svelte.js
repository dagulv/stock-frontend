/**
 * @typedef {Object} MenuItem
 * @property {string} href
 * @property {string} label
 */

/**
 * @type MenuItem[]
 */
let items = $state([]);

export const menu = {
    get items() {
        return items;
    },
    set items(value) {
        items = value;
    }
}