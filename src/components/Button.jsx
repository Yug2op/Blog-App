import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-700",
    hoverBgColor = "hover:bg-gray-700",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 md:px-5 md:py-3 rounded-lg text-sm md:text-base font-medium ${bgColor} ${hoverBgColor} ${textColor} ${className} transition-colors duration-200 ease-in-out`}
            {...props}
        >
            {children}
        </button>
    );
}
