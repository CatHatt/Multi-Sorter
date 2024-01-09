"use strict";
function unsort() {
    document.getElementById('sortingMethod').value = 'unsorted'

    const itemContainer = document.getElementById('itemContainer')
    const children = []

    while (itemContainer.firstElementChild) {
        children.push(itemContainer.firstElementChild)
        itemContainer.removeChild(itemContainer.firstElementChild)
    }

    while (children.length) {
        itemContainer.appendChild(children.splice(Math.floor(Math.random()*children.length), 1)[0])
    }
}

function sort() {
    const itemContainer = document.getElementById('itemContainer')
    let children = []

    while (itemContainer.firstElementChild) {
        children.push(itemContainer.firstElementChild)
        itemContainer.removeChild(itemContainer.firstElementChild)
    }

    let method = (item, divider) => {return parseFloat(item.textContent) < parseFloat(divider.textContent)}
    
    switch (document.getElementById('sortingMethod').value) {
        case '0':
            method = (item, divider) => {
                return parseFloat(item.textContent) > parseFloat(divider.textContent)
            }
            break
        case '1':
            method = (item, divider) => {
                return parseFloat(item.textContent) < parseFloat(divider.textContent)
            }
            break
    }

    children = quicksort(children, method)

    while (children.length) {
        itemContainer.appendChild(children.splice(0, 1)[0])
    }
}

function quicksort(array, method) {
    if (array.length <= 1) return array
    
    const divider = array.splice(Math.floor(Math.random()*array.length), 1)[0]
    const oldLeft = []
    const oldRight = []

    for (const item of array) {
        if (method(item, divider)) {
            oldLeft.push(item)
        } else {
            oldRight.push(item)
        }
    }

    let newLeft = quicksort(oldLeft, method)
    let newRight = quicksort(oldRight, method)

    return [...newLeft, divider, ...newRight]
}