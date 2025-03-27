export const makeDOMwithProperties = (domType, propertyMap) => {
    // domType: div, a, li...
    // propertyMap: { "className": "product-card", "alt" : ... }
    // Object.keys(propertyMap) -> ["className", "alt"]

    const dom = document.createElement(domType);
    Object.keys(propertyMap).forEach((key) => {
        dom[key] = propertyMap[key];
    });

    return dom;
};

export const appendChildrenList = (target, childrenList) => {
    // 아닐 경우를 먼저 처리하는 early-return으로 로직을 줄임
    if (!Array.isArray(childrenList)) return;

    childrenList.forEach((children) => {
        target.appendChild(children);
    })
}