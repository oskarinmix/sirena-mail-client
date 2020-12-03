import React from "react";
import Inbox from "./Inbox";
import Sidebar from "./Sidebar";
export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Inbox />
    </div>
  );
}
