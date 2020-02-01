import React, { useMemo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  dispatchEvent,
  EventType,
  getModuleRootElementName
} from "@sinouiapp/commons";
import loadScript from "./loadScript";

const HIDE_STYLE: React.CSSProperties = {
  display: "none"
};

/**
 * 模块加载器
 */
function ModuleLoader() {
  const [modules, setModules] = useState<string[]>([]);
  const { pathname } = useLocation();
  const moduleName = useMemo(() => pathname.split("/")[1], [pathname]);

  if (moduleName && !modules.includes(moduleName)) {
    setModules(prev => {
      if (!prev.includes(moduleName)) {
        return prev.concat(moduleName);
      }
      return prev;
    });
  }

  useEffect(() => {
    const showModule = async () => {
      await loadScript(`/${moduleName}/main.js`);
      dispatchEvent(EventType.SHOW_MODULE, { moduleName });
    };

    if (moduleName) {
      showModule();

      return () => {
        dispatchEvent(EventType.HIDE_MODULE, { moduleName });
        setModules(prev => prev.filter(item => item !== moduleName));
      };
    }
  }, [moduleName]);

  return (
    <>
      {modules.map(item => (
        <div
          key={item}
          id={getModuleRootElementName(item)}
          style={item === moduleName ? undefined : HIDE_STYLE}
        ></div>
      ))}
    </>
  );
}

export default ModuleLoader;
