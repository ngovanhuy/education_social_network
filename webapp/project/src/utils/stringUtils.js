export const stringUtils = {
    converToString,
}

function converToString(value) {
    if(value){
        return value.toString()
    }
    return ''
}