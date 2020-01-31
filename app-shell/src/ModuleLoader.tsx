import React, { useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ModuleLoader() {
  const { pathname } = useLocation();
  const moduleName = useMemo(() => pathname.split("/")[1], [pathname]);

  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = `/${moduleName}/main.js`;
    scriptElement.onload = () => console.log("加载完成");
    document.head.appendChild(scriptElement);
  }, [moduleName]);

  return moduleName ? (
    <div id={`${moduleName}-root`}>正在加载{moduleName}模块</div>
  ) : null;
}

export default ModuleLoader;
