export function getDescendants(id, dict) {
    const {
        children
    } = dict[id];
    if (children === undefined) {
        return [];
    }
    const descendants = [...children]
    for (let descendant of descendants) {
        descendants.push(...getDescendants(descendant, dict))
    }
    return descendants;
}

export function checkAncestors(id, dict, categoryChecked) {
    const parentId = dict[id].parentId //Id родителя
    if (parentId === undefined) {
        return;
    }
    const siblings = dict[parentId].children //массив детей родителя
    const allSiblingsChecked = siblings.every((id) => categoryChecked.includes(id))
    if (allSiblingsChecked) {
        categoryChecked.push(parentId)
        checkAncestors(parentId, dict, categoryChecked)
    }
}
export function getAncestors(id, dict) {
    const {
        parentId
    } = dict[id]
    if (parentId === undefined) {
        return [];
    }
    return [parentId, ...getAncestors(parentId, dict)];
}