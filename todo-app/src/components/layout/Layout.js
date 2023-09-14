import React from "react";

function Layout({ children }) {
  return (
    <div className="page-container">
      <div className="todo-app-container rounded shadow bg-white mx-2">
        {children}
      </div>
    </div>
  );
}

export default Layout;
