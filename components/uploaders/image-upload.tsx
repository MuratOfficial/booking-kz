"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash, Wand } from "lucide-react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [changedValue, setValue] = useState<string[]>([]);
  const handleChangeImageOrder = (index: number) => {
    if (index !== 0 && index < changedValue.length) {
      const newValue = [...changedValue];
      const clickedImage = newValue.splice(index, 1);
      newValue.unshift(clickedImage[0]);
      setValue(newValue);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    setValue(value);
  }, [value]);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      <div className="mb-2 flex items-center gap-2 flex-row flex-wrap">
        <CldUploadWidget
          onUpload={onUpload}
          uploadPreset="xtknaqrt"
          options={{
            sources: ["local", "url", "camera", "google_drive", "instagram"],
            multiple: true,
            maxFiles: 30,
            maxFileSize: 770000,
            maxImageFileSize: 770000,
            maxImageWidth: 1920,
            language: "ru",
          }}
        >
          {({ open }) => {
            const onClick = () => {
              open();
            };

            return (
              <Button
                type="button"
                disabled={disabled}
                variant="secondary"
                onClick={onClick}
                className="rounded-xl aspect-square  w-[140px] h-[140px] hover:bg-blue-300 bg-blue-400 flex flex-col justify-center items-center"
              >
                <ImagePlus className="w-6 stroke-white" />
              </Button>
            );
          }}
        </CldUploadWidget>

        {changedValue.map((url, index) => (
          <div
            key={url}
            className="relative w-[140px] h-[140px] rounded-xl overflow-hidden"
          >
            {index !== 0 && (
              <div className="z-10 absolute top-2 left-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => handleChangeImageOrder(index)}
                  className="h-8 w-8"
                  size="icon"
                >
                  <Wand className="h-3 w-3" />
                </Button>
              </div>
            )}

            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => {
                  const newValue = [...changedValue];
                  newValue.splice(index, 1);
                  setValue(newValue);
                }}
                variant="destructive"
                className="h-8 w-8"
                size="icon"
              >
                <Trash className="h-3 w-3" />
              </Button>
            </div>
            {index === 0 && (
              <p className="bg-blue-500 z-10 text-neutral-50 text-sm absolute bottom-0 left-0 rounded-tr-lg py-0.5 px-1 ">
                Главное фото
              </p>
            )}

            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
