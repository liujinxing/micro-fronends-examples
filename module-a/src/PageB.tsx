import React from "react";
import { Link } from "react-router-dom";

export default function PageA() {
  return (
    <div>
      页面B
      <Link to="/module-b/page-a">导航至模块B/页面A</Link>
    </div>
  );
}
