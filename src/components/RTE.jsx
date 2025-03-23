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
    <div className="w-full max-w-full">
      {label && (
        <label className="inline-block mb-2 text-xs sm:text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {loading && (
        <div className="flex justify-center items-center py-4">
          {/* Spinner for loading */}
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <div
            className={`rounded-lg bg-gray-100 border-none overflow-hidden relative ${
              loading ? "hidden" : ""
            }`}
          >
            <Editor
              apiKey={conf.rteApiKey}
              initialValue={defaultValue}
              init={{
                height: 500, // Adjusted height for better usability
                min_height: 150,
                menubar: !readOnly,
                plugins: !readOnly
                  ? [
                      "image",
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
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
                      "wordcount",
                    ]
                  : [],
                toolbar: !readOnly
                  ? "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
                  : false,
                content_style: `
                  body { 
                    font-family:Helvetica,Arial,sans-serif; 
                    font-size:14px; 
                    background-color: #111827;
                    color: #f9fafb;
                  }
                  /* Custom Scrollbar */
                  ::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                  }
                  ::-webkit-scrollbar-thumb {
                    background: #9ca3af; /* Gray-400 */
                    border-radius: 4px;
                  }
                  ::-webkit-scrollbar-thumb:hover {
                    background: #6b7280; /* Gray-500 */
                  }
                  ::-webkit-scrollbar-track {
                    background: #f3f4f6; /* Gray-100 */
                  }
                `,
                readonly: readOnly,
                setup: (editor) => {
                  editor.on("init", () => {
                    setLoading(false); // Hide spinner once initialized
                  });
                },
                object_resizing: false, // Prevents weird resizing issues
                resize: true, // Allows resizing but avoids overflow issues
                skin: "oxide", // Keeps default styling
              }}
              onEditorChange={onChange}
            />
          </div>
        )}
      />
    </div>
  );
}
