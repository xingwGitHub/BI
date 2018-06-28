//导出数据 生成文件
class ExportFile {

    static  exportJson2CSV(jsonData, fileTitle, headerName) {
        let _headerName = headerName;
        var arrData = typeof jsonData !== 'object' ? JSON.parse(jsonData) : jsonData;
        var csvString = '';
        var row = "";

        for (var index in _headerName) {
            row += _headerName[index] + ',';
        }
        row = row.slice(0, -1);
        csvString += row + '\r\n';

        for (var i = 0; i < arrData.length; i++) {
            let row = "";
            for (let index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);
            csvString += row + '\r\n';
        }

        if (csvString === '') {
            alert("导出错误！");
            return;
        }

        var fileName = fileTitle.replace(/ /g, "_");
        csvString = "\ufeff" + csvString;
        var blob = new Blob([csvString], {type: "text/plain"});
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName + ".csv";
        link.click();
        URL.revokeObjectURL(link.href);
    }

}
export default ExportFile;