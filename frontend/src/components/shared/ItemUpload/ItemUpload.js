import React from "react";
import ImageUploader from "../ImageUploader/ImageUploader";
import "./ItemUpload.css";

export const ItemUpload = () => {
  const handleUpload = (uploadedFiles) => {
    // Handle the uploaded files if needed
    console.log("Uploaded files:", uploadedFiles);
  };

  const handleSaveDraft = () => {
    alert("Draft Saved");
  };

  const handlePostItem = () => {
    alert("Item has been Posted");
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "50px", marginLeft: "300px" }}
    >
      <h1>Upload Items</h1>

      <div style={{ marginTop: "20px" }}>
        {/* Use ImageUploader with showDropzone={false} to hide the drop zone */}
        <ImageUploader onUpload={handleUpload} showDropzone={true} />
      </div>
      <div className="button-container">
        <div className="save-button">
          <button onClick={handleSaveDraft}>Save Draft</button>
        </div>
        <div className="post-button">
          <button onClick={handlePostItem}>Post Item</button>
        </div>
      </div>
      <div className="TextBox">
        <form>
          <p>
            <label for="ItemInfo">Item Description</label>
          </p>
          <textarea id="ItemInfo" name="ItemInfo" rows="6" cols="160">
            Please enter any relevant information about your
            item/items(quantity, condition, description, etc.)
          </textarea>
        </form>
      </div>
    </div>
  );
};
