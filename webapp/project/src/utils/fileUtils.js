import {DOMAIN_SERVICE} from "../constants/index";
import {defaultConstants} from "../constants/defaultConstant";

export const fileUtils = {
    prettyFileSize,
    fileToPlainObject,
    filesToPlainArray,
    mapFiles,
    renderFileSource,
}

function prettyFileSize(size) {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    var res = ( size / Math.pow(1024, i) ).toFixed(2) * 1;
    return res + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

function fileToPlainObject(file) {
    if(file){
        return {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModifiedDate: file.lastModifiedDate,
            dataURL: window.URL.createObjectURL(file),
        };
    }
    return {};
};

function filesToPlainArray(files) {
    var filesInfo = []
    if(files && files.length > 0){
        for(var i = 0; i < files.length; i++){
            filesInfo.push(fileToPlainObject(files[i]));
        }
    }
    return filesInfo;
};

function mapFiles(fn, files) {
    var result = [];
    for (var i = 0; i < files.length; i++) result.push(fn(files[i]));
    return result;
}

function renderFileSource(fileId, defaultSource = "") {
    if(fileId && !defaultSource)
        return DOMAIN_SERVICE + "/files/get/" + fileId;
    else
        return defaultSource;
}