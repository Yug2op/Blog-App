import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";

export default function RTE({
  name,
  control,
  label,
  defaultValue = "",
  readOnly = false,
}) {
  const [loading, setLoading] = useState(true); // Loading state

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {loading && (
        <div className="flex justify-center items-center py-4">
          {/* Spinner for loading */}
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <div
            className={`rounded-lg bg-gray-100 border-none overflow-hidden ${
              loading ? "hidden" : ""
            }`}
          >
            <Editor
              apiKey = {conf.rteApiKey }
              initialValue={defaultValue}
              init={{
                height: 500,
                menubar: !readOnly, // Hide the menu bar if readOnly
                plugins: !readOnly
                  ? [
                      "image",
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                      "anchor",
                    ]
                  : [], // Disable plugins in read-only mode
                toolbar: !readOnly
                  ? "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
                  : false, // Disable toolbar in read-only mode
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #1a202c; color: white; }", // Dark mode styling
                readonly: readOnly, // Enable read-only mode
                setup: (editor) => {
                  editor.on("init", () => {
                    setLoading(false); // Hide spinner once initialized
                  });
                },
              }}
              onEditorChange={onChange}
            />
          </div>
        )}
      />
    </div>
  );
}
