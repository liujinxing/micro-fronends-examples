import React from "react";
import { Link } from "react-router-dom";

export default function PageA() {
  return (
    <div>
      页面A
      <Link to="/module-a/page-b">页面B</Link>
    </div>
  );
}
