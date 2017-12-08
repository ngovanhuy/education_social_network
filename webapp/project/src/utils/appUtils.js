export const appUtils = {
   checkLoading,
}

function checkLoading(object) {
    var loading = false;
    for (var prop in object) {
        if(object[prop].loading){
            loading = true;
            break;
        }
    }
    return loading;
}