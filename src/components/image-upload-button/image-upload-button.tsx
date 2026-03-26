import {
  Dropzone,
  DropZoneArea,
  DropzoneFileList,
  DropzoneTrigger,
  useDropzone,
} from "@/components/ui/dropzone"
import { Image as ImageIcon } from "lucide-react"
import { useEffect } from "react"
import { FileItem } from "./file-item"

interface ImageUploadButtonProperties {
  onChange: (file: File | string | null) => void
  value: File | string | null
}

export const fiveMegaBytes = 5 * 1024 * 1024

export function ImageUploadButton({
  onChange,
  value,
}: ImageUploadButtonProperties) {
  const acceptedFiles = { "image/*": [".png", ".jpg", ".jpeg"] }
  const oneSecond = 1000

  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, oneSecond))
      onChange(file)
      return {
        status: "success",
        result: URL.createObjectURL(file),
      }
    },
    validation: {
      accept: acceptedFiles,
      maxSize: fiveMegaBytes,
      maxFiles: 1,
    },
  })

  const hasNewImage = dropzone.fileStatuses.length > 0
  const hasExistingImage = typeof value === "string" && !!value
  const displayImage = hasNewImage || hasExistingImage

  useEffect(() => {
    if (!value && hasNewImage) {
      dropzone.fileStatuses.forEach((f) => dropzone.onRemoveFile(f.id))
    }
  }, [value, hasNewImage, dropzone])

  return (
    <div className="flex w-full flex-col gap-2">
      <Dropzone {...dropzone}>
        {!displayImage && (
          <DropZoneArea className="group mb-2 h-8 min-h-8 w-8 min-w-8 cursor-pointer rounded-[8px] border-none bg-transparent! shadow-none hover:bg-transparent!">
            <DropzoneTrigger>
              <ImageIcon className="h-8 min-h-8 w-8 min-w-8 rounded-[8px] text-primary-button transition-colors group-hover:text-primary-button/50!" />
            </DropzoneTrigger>
          </DropZoneArea>
        )}

        {displayImage && (
          <DropzoneFileList className="mb-[16.5px] w-40 rounded-[16px] bg-foreground not-dark:shadow-md">
            {/* 1. Handle Newly Uploaded Files */}
            {dropzone.fileStatuses.map((file) => (
              <FileItem
                key={file.id}
                fileName={file.fileName}
                fileSize={file.file.size}
                previewUrl={file.result}
                status={file.status}
                onRemove={() => {
                  dropzone.onRemoveFile(file.id)
                  onChange(null)
                }}
              />
            ))}

            {hasExistingImage && !hasNewImage && (
              <FileItem
                fileName=""
                fileSize={0}
                previewUrl={value}
                status="success"
                onRemove={() => onChange(null)}
              />
            )}
          </DropzoneFileList>
        )}
      </Dropzone>
    </div>
  )
}
