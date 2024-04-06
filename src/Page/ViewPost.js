import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import ViewEvent from "../components/Listevent/ViewEvent";

export default function ViewPost() {
  return (
    <LayoutHome>
      <div>
        <ViewEvent></ViewEvent>
      </div>
    </LayoutHome>
  );
}
