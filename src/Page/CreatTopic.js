import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import ClassQuestion from "../components/createtopic/ClassQuestion";

export default function CreatTopic() {
  return (
    <LayoutHome>
      <div style={{ marginTop: "70px" }}>
        <ClassQuestion></ClassQuestion>
      </div>
    </LayoutHome>
  );
}
