/**
 * @param el
 * @param {Array} att
 */
export const attr = (el, att) => {
    if(att[0].constructor === Array) {
        att.forEach((_)=>{
            el.setAttribute(_[1],_[2])
        })
    }
}