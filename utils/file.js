import parseCSVString from "./utils";


const downloadTask = (fileUrl) => {
    return uni.downloadFile({
        url: fileUrl,
        filePath: plus.io.FileSyste,
        success: (res) => {
            if (res.statusCode === 200) {
                // 保存文件
                uni.saveFile({
                    tempFilePath: res.tempFilePath,
                    success: (savaRes) => {
                        console.log(`下载文件保存成功:,${res.tempFilePath}, ${savaRes.savedFilePath}`);
                        readFile(res.tempFilePath,(res)=>{
                            console.log(`读取文件成功：${res}`);
                        })
                    },
                    fail: () => {
                        console.log(`保存失败！！！`);
                    }
                })
                console.log('下载成功');
            } else {
                console.log(`文件下载失败！！！`);
            }
        },
        fail: (err) => {
            console.log(`文件下载失败： ${err}`);
        }
    });
}
const readFile = (url,callback) => {
    return plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function (fs) {
        // fs.root是根目录操作对象DirectoryEntry
        console.log(fs.root.fullPath);
        fs.root.getFile(url, {
            create: false
        }, function (fileEntry) {
            fileEntry.file(function (file) {
                var fileReader = new plus.io.FileReader();
                console.log("getFile:" + JSON.stringify(file));
                fileReader.readAsText(file, 'utf-8');
                fileReader.onloadend = function (evt) {
                    const res = parseCSVString(evt.target.result)
                    callback(res);
                    // 保存文件
                    const fileName = url.replace("csv", 'json')
                    console.log(`filename: ${fileName}`);
                    uni.saveFile({
                        tempFilePath: fileName, // 替换为实际的文件路径
                        data: res,
                        success: (saveResult) => {
                            console.log('转换成JSON文件写入成功', saveResult.savedFilePath);
                        },
                        fail: (err) => {
                            console.error('转换成JSON文件写入失败', err);
                        }
                    });
                }
                console.log(file.size + '--' + fileName);
            })
        })
    });
}
export  {downloadTask , readFile};