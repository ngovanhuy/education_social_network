import {DOMAIN_SERVICE} from "../constants/index";

export const fileUtils = {
    prettyFileSize,
    fileToPlainObject,
    mapFiles,
    renderFileSource,
}

function prettyFileSize(size) {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    var res = ( size / Math.pow(1024, i) ).toFixed(2) * 1;
    return res + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

function fileToPlainObject(file) {
    return {
        id: file.lastModified,
        name: file.name,
        type: file.type,
        size: file.size,
        lastModifiedDate: file.lastModifiedDate,
        dataURL: window.URL.createObjectURL(file),
    };
};

function mapFiles(fn, files) {
    var result = [];
    for (var i = 0; i < files.length; i++) result.push(fn(files[i]));
    return result;
}

function renderFileSource(fileId) {
    return DOMAIN_SERVICE + "/files/get/" + fileId;
}