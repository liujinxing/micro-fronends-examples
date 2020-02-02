import React from "react";
import { Link } from "react-router-dom";
import Button from "./components/Button";

export default function PageA() {
  return (
    <div>
      页面A
      <Link to="/module-a/page-b" component={Button}>
        页面B
      </Link>
    </div>
  );
}
