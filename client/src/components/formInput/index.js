import React from "react";

export default function InputForm({ label, id, placeholder, setValue, value }) {
    return (
        <div className="mt-2">
            <label
                htmlFor={id}
                className="font-semibold text-lg cursor-pointer"
            >
                {label}
            </label>
            <input
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                value={value ? value : ""}
                className="py-2 px-2 w-full mt-1 rounded-sm shadow-md"
                id={id}
            />
        </div>
    );
}
