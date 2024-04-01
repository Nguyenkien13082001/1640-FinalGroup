import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import NavbarProfile from "../components/profile/NavbarProfile";
import InforAcount from "../components/profile/InforAcount";

export default function Profile() {
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Street, City",
    phone: "123-456-7890",
  };
  return (
    <LayoutHome>
      <div style={{ height: "80vh" }}>
        <NavbarProfile
          li={[
            ["Infor Accout", "img/dashboard.svg"],
            ["Restautant’s", "img/restaurant.svg"],
            ["Manage User’s", "img/manage user.svg"],
            ["Manage Order’s", "img/manage  order.svg"],
            ["Manage Coupon’s", "img/manage coupon.svg"],
          ]}
        ></NavbarProfile>
        <InforAcount user={userData} />
      </div>
    </LayoutHome>
  );
}
