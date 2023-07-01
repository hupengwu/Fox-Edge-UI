import {AxiosResponse} from "axios";


export function downloadFile(response: AxiosResponse, fileName: string): any {
  // 文件下载
  console.info("文件下载")
  const blob = new Blob([response.data], {
    type: "application/file",
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName; // 文件名称需要自己定义。如果需要知道也可以在header中自定义一个文件名称返回 也可以随机生成一个 我这里是已经提前知道了文件名
  a.click();
}
