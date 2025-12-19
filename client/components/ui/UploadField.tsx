"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "./Button";
import Image from "next/image";
import NoImage from "@/public/img/ui/NoImage.png";

interface UploadFieldProps {
  label: string;
  labelFile: string;
  name: string;
  alt: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  onRemoveFile?: () => void;
  existingFileUrl?: string | null;
  readOnly?: boolean;
  errors?: string[];
}

export default function UploadField({
  label,
  labelFile,
  name,
  alt,
  value,
  onChange,
  onRemoveFile,
  existingFileUrl,
  readOnly,
  errors,
}: UploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(null);

  // When file is dropped or inserted
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setPreview(URL.createObjectURL(file));

        if (onChange) onChange(file);
      }
    },
    [onChange]
  );

  // Remove existing file
  const handleRemoveFile = () => {
    if (onChange) onChange(null);
    if (onRemoveFile) onRemoveFile();
    setPreview(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    multiple: false,
  });

  useEffect(() => {
    value
      ? setPreview(URL.createObjectURL(value))
      : existingFileUrl
      ? setPreview(existingFileUrl)
      : setPreview(null);
  }, [value, existingFileUrl]);

  return (
    <>
      <div className="mb-1">
        <label htmlFor={name} className="text-gray-800 font-medium">
          {label}
        </label>
      </div>
      <div
        className={`transition border border-gray-300 border-dashed cursor-pointer rounded-lg hover:border-blue-600 ${
          errors ? "mb-0" : "mb-4"
        }`}
      >
        <div
          {...getRootProps()}
          className={`rounded-lg border-dashed border-gray-300 ${
            !preview && "p-6"
          } ${
            isDragActive
              ? "border-blue-600 bg-gray-100"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          {!readOnly && <input {...getInputProps()} name={name} id={name} />}
          <div className="flex flex-col items-center m-0">
            {preview ? (
              <Image
                src={preview}
                alt={alt}
                width={800}
                height={600}
                sizes="100vw"
                className="w-full h-auto object-cover"
                unoptimized
              />
            ) : readOnly ? (
              <Image
                src={NoImage}
                alt="No Image"
                width={800}
                height={600}
                sizes="100vw"
                className="w-full h-auto object-cover"
              />
            ) : (
              <>
                <div className="mb-[22px] flex justify-center">
                  <div className="flex w-[68px] h-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-600">
                    <svg
                      className="w-8 h-8"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                      />
                    </svg>
                  </div>
                </div>
                <h4 className="mb-3 font-semibold text-gray-800 text-xl  text-center">
                  {isDragActive ? "Drop File Here" : "Drag & Drop File Here"}
                </h4>
                <span className="text-center mb-4 block w-full max-w-[290px] text-sm text-gray-700">
                  Drag and drop your {labelFile}
                </span>
                <span className="font-medium underline text-blue-600 text-sm">
                  Browse File
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      {errors && errors.length > 0 && (
        <div className="mb-2">
          <span className="text-red-600 text-xs">{errors[0]}</span>
        </div>
      )}
      {!readOnly && preview && (
        <Button
          tag="button"
          type="button"
          className="w-full"
          onClick={handleRemoveFile}
        >
          Remove
        </Button>
      )}
    </>
  );
}
