import React, { useState, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const current_user = "admin";

const client_chat = [
  {
    id: 1,
    order: 1,
    username: "jeff101",
    timestamp: "9/10/2024, 3:40pm",
    text: "Chat Content (text)",
    action: "",
    attachments: ["img_url", "img_url"],
  },
  {
    id: 2,
    order: 3,
    username: "jeff101",
    timestamp: "9/10/2024, 3:45pm",
    text: "",
    action: "Submitted Schedule Request",
    attachments: [],
  },
];

const admin_chat = [
  {
    id: 1,
    order: 2,
    username: "admin",
    timestamp: "9/10/2024, 3:42pm",
    text: "Chat Content (text)",
    action: "",
    attachments: [],
  },
];

const Chat = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [chatContent, setChatContent] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles: FileList = event.target.files;
      let updatedFiles: File[] = [...files];

      for (let i = 0; i < uploadedFiles.length; i++) {
        updatedFiles.push(uploadedFiles[i]);
      }

      setFiles(updatedFiles);
    }
  };
  const handleRemove = (fileToRemove: File) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
  };
  const uploadFilesToServer = async () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    alert("Chat Content: " + chatContent);

    //after handling submission and it was successfull.... clear fields
    setChatContent("");
    setFiles([]);

    try {
      // const response = await fetch("https://backend-api.com/upload", {
      //   method: "POST",
      //   body: formData,
      // });
      // if (response.ok) {
      //   console.log("Files uploaded successfully");
      // } else {
      //   console.error("Failed to upload files");
      // }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  let concatted_chat_array = client_chat.concat(admin_chat);
  concatted_chat_array.sort((a, b) => {
    const item_order_1 = a.order;
    const item_order_2 = b.order;
    if (item_order_1 < item_order_2) {
      return -1;
    }
    if (item_order_1 > item_order_2) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="p-3 md:p-8 flex flex-col">
      <div className="flex flex-wrap justify-between">
        <span className="font-semibold text-[#A4A4A4]">
          Chat started on 9/10/2024 at 3:40pm with{" "}
          <span className="text-black font-bold">jeff101</span>
        </span>
        <span>
          <FaSearch />
        </span>
      </div>
      <br />
      <div>
        {concatted_chat_array.map((item) => (
          <div key={item.order}>
            <h3 className="text-[#278AF6] font-bold">
              {item.username == current_user ? "You" : item.username}
            </h3>
            <p className="text-[#B1B1B1] text-sm">{item.timestamp}</p>
            <p className="py-2 text-black font-semibold">{item.text}</p>
            {item.action && (
              <div className="w-fit p-3 text-black font-bold text-sm bg-[#EEEEEE]">
                {item.action}
              </div>
            )}
            <div className="flex flex-wrap gap-8 py-2">
              {item.attachments.map((image, i: number) => (
                <img
                  key={i}
                  src={image}
                  alt="Image"
                  className="bg-[#278AF6] p-6 text-white"
                />
              ))}
            </div>
            <div className="py-8 w-full flex justify-center items-center">
              <span className="bg-gray-500 h-[0.5px] w-4/5"></span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid">
        <h3 className="text-[#278AF6] font-bold">You</h3>
        <textarea
          className="border border-black p-2 w-full md:w-1/2"
          placeholder="Begin typing..."
          value={chatContent}
          onChange={(e) => setChatContent(e.target.value)}
        />
        <div>
          <div>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="my-4"
            />
          </div>
          <div>
            <h3>Current Files Uploaded:</h3>
            <div className="flex flex-wrap gap-8 py-2">
              {files.map((file: File, index: number) => (
                <div key={index} className="relative">
                  <span
                    className="absolute -top-2 -left-2 bg-gray-300 rounded-full p-1"
                    onClick={() => handleRemove(file)}
                  >
                    <FaTimes />
                  </span>
                  {file.type.startsWith("image/") ? (
                    <div>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                      {file.name}
                    </div>
                  ) : (
                    file.name
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className="mt-4 w-fit shadow-lg bg-[#2D333A] px-5 py-3 text-sm text-white font-bold"
          onClick={uploadFilesToServer}
        >
          Add chat
        </button>
      </div>
    </div>
  );
};

export default Chat;
