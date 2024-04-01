import React from "react";

import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import Navbars from "../components/home/Navbars";

export default function LayoutHome({ children }) {
  return (
    <div>
      <Header />

      <Navbars
        li={[
          ["Home", "img/dashboard.svg"],
          ["Account Management", "img/manage user.svg"],
          ["Event Management", "img/restaurant.svg"],
          ["Faculty Management", "img/manage  order.svg"],
          ["Download", "img/download-902.svg"],
          ["Chart", "img/chart-874.svg"],
        ]}
      />
      <div className="ps-5">{children}</div>
      <div className="ps-5">
        <Footer />
      </div>
    </div>
  );
}
