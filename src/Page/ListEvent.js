import React from "react";
import Event from "../components/Listevent/Event";
import LayoutHome from "../layouts/LayoutHome";

export default function ListEvent() {
  return (
    <LayoutHome>
      <div>
        <Event></Event>
      </div>
    </LayoutHome>
  );
}
