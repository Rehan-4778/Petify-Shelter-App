import React, { useState, useEffect } from "react";

function UploadImage(props) {
  useEffect(() => {
    if (props.resetImages) {
      setPreviewSource([]);
      document.getElementById("images").value = "";
    }
  }, [props.resetImages]);

  const [previewSource, setPreviewSource] = useState([]);

  const handleFileInputChange = (e) => {
    const file = [];
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].type.startsWith("image/")) {
        file.push(e.target.files[i]);
      } else {
        console.warn(`Invalid file type: ${file.type}`);
      }
    }

    previewFile(file);
    props.ChangeImageFile(file);
  };

  const previewFile = (file) => {
    file.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource((prev) => [...prev, reader.result]);
      };
    });
  };

  return (
    <div>
      <input
        type="file"
        // only accept image files
        accept="image/*"
        name="images"
        id="images"
        aria-describedby="imageHelp"
        multiple
        required
        onChange={handleFileInputChange}
      />
      {previewSource.length > 0 &&
        previewSource.map((image, index) => {
          return (
            <img
              src={image}
              alt="chosen"
              style={{
                height: "70px",
                width: "70px",
                margin: "5px 5px 0 0",
                objectFit: "cover",
              }}
              key={index}
            />
          );
        })}
    </div>
  );
}

export default UploadImage;
