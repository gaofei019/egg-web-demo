const path = require('path');
const fs = require('fs');

// 计算分页
let pagination = (totalSize, currentPage, pageSize=5)=> {
  let totalCount = Math.ceil(totalSize/12);
  // 每次显示5个分页按钮
  let startCount = Math.ceil(currentPage/pageSize);
  if(startCount > 1) {
    startCount = (startCount-1)*5+1;
  }
  console.log('startCount, totalCount',startCount, totalCount);
  return {
    startCount,
    totalCount
  }
}

// 上传图片文件
let saveFile = (stream, config)=> {
  return new Promise((resolve, reject)=>{
    let fileName = new Date().getTime() + '.' + stream.mimeType.split('/')[1];
    let relativePath = `${config.staticServer.imagePath}/${fileName}`;
    const detailPath = path.join(config.staticServer.staticPath, relativePath);
    // 图片存储路径
    // console.log(detailPath)
    const ws = fs.createWriteStream(detailPath);
    stream.pipe(ws);
    ws.on('error', reject);
    ws.on('end', resolve(relativePath));
  })
}

module.exports = {
  pagination: pagination,
  saveFile: saveFile
}