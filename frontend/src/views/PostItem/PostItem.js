import React from "react";
import { NavBar } from "../../components/shared/NavBar/NavBar";
import { ItemUpload } from "../../components/shared/ItemUpload/ItemUpload";
import "../../styles/Home.css";

function PostItem() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <ItemUpload />
      </div>
    </div>
  );
}

export default PostItem;
