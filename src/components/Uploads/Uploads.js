import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Upload() {
  const { register, handleSubmit, errors } = useForm();

  const [fileInput, setFileInput] = useState("");
  const [selected, setSelected] = useState("");
  const [preview, setPreview] = useState("");
  //   const [fileTypeError, setFileTypeError] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const submitFile = (e) => {
    e.preventDefault();
    if (!preview) return;
    uploadImage(preview);
  };

  const uploadImage = (imgString) => {
    fetch(process.env.REACT_APP_URL + "/api", {
      method: "POST",
      body: JSON.stringify({ data: imgString }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res)
      .then((res) => {
        if (res.status === 200) {
          console.log("muck");
        }
      });
  };

  return (
    <>
      <form onSubmit={submitFile}>
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInput}
          accept=".jpeg"
          ref={register}
          style={{ marginBottom: 15 }}
        />
        <button
          type="submit"
          className="btn waves-effect waves-light green"
          style={{ marginBottom: 10, display: "block" }}>
          Submit
        </button>
        {/* {fileTypeError ? <span>Please upload .jpeg file.</span> : null} */}
      </form>
      {preview && (
        <img
          src={preview}
          alt="profile_picture"
          width="120px"
          height="120px"
          style={{ display: "block", marginBottom: 10 }}
        />
      )}
    </>
  );
}
