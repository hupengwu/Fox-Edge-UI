/**
 * el-table-column的时间格式化
 * @taskParam row
 * @taskParam column
 */
export function formatFileSize4elTableColumn(row: any, column: any) {
    // 获取单元格数据
    const fileSize = row[column.property]
    if (fileSize === null || fileSize === 0 || fileSize === undefined) {
        return '-'
    }

    if (fileSize > (1024 * 1024 * 1024)) {
        return (fileSize / (1024 * 1024 * 1024)).toFixed(2) + 'G';
    }
    if (fileSize > (1024 * 1024)) {
        return (fileSize / (1024 * 1024)).toFixed(2) + 'M';
    }
    if (fileSize > 1024) {
        return (fileSize / 1024).toFixed(0) + 'K';
    }

    return fileSize;
}

export function formatFileSize4elTableColumn2(row: any, column: any) {
    const cs = column.property.split(".");
    if (cs.length < 2) {
        return '-'
    }
    // 获取单元格数据
    const fileSize0 = row[cs[0]];
    if (fileSize0 === null || fileSize0 === 0 || fileSize0 === undefined) {
        return '-'
    }

    const fileSize = fileSize0[cs[1]];
    if (fileSize === null || fileSize === 0 || fileSize === undefined) {
        return '-'
    }

    if (fileSize > (1024 * 1024 * 1024)) {
        return (fileSize / (1024 * 1024 * 1024)).toFixed(2) + 'G';
    }
    if (fileSize > (1024 * 1024)) {
        return (fileSize / (1024 * 1024)).toFixed(2) + 'M';
    }
    if (fileSize > 1024) {
        return (fileSize / 1024).toFixed(0) + 'K';
    }

    return fileSize;
}

export function formatFileSize(row: any, column: any) {
    // 获取单元格数据
    const fileSize = row[column]
    if (fileSize === null || fileSize === 0 || fileSize === undefined) {
        return '-'
    }

    if (fileSize > (1024 * 1024 * 1024)) {
        return (fileSize / (1024 * 1024 * 1024)).toFixed(2) + 'G';
    }
    if (fileSize > (1024 * 1024)) {
        return (fileSize / (1024 * 1024)).toFixed(2) + 'M';
    }
    if (fileSize > 1024) {
        return (fileSize / 1024).toFixed(0) + 'K';
    }

    return fileSize;
}
