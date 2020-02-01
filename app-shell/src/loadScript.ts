/**
 * 加载js脚本
 *
 * @param sourcePath 源码路径
 */
export default function loadScript(sourcePath: string) {
  if (document.head.querySelector(`script[src="${sourcePath}"]`)) {
    return;
  }

  const scriptElement = document.createElement("script");
  scriptElement.src = sourcePath;
  scriptElement.async = true;
  const promise = new Promise((resolve, reject) => {
    scriptElement.onload = () => {
      resolve();
    };
    scriptElement.onerror = error => {
      reject(error);
    };
  });
  document.head.appendChild(scriptElement);
  return promise;
}
