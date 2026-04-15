import {
  Dropzone,
  DropZoneArea,
  DropzoneFileList,
  DropzoneTrigger,
  useDropzone,
  type FileStatus,
} from "@/components/ui/dropzone"
import { Image as ImageIcon } from "lucide-react"
import { useEffect } from "react"
import { FileItem } from "./file-item"

interface ImageUploadButtonProperties {
  onChange: (
    file: File | FileStatus<string, string> | string | undefined | null
  ) => void
  value: File | string | null | undefined
}

export function ImageUploadButton({
  onChange,
  value,
}: ImageUploadButtonProperties) {
  const acceptedFiles = {
    "image/*": [".jpeg", ".jpg", ".png", ".webp"],
  }
  const sixMegaBytes = 6 * 1024 * 1024

  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      if (file.size > sixMegaBytes) {
        onChange(null)
        return {
          status: "error",
          error: "",
        }
      }

      onChange(file)
      return {
        status: "success",
        result: URL.createObjectURL(file),
      }
    },
    onRootError: (rejectedFiles) => {
      console.log(rejectedFiles)

      return {
        status: "error",
        result: rejectedFiles,
      }
    },
    validation: {
      accept: acceptedFiles,
      maxSize: sixMegaBytes,
      maxFiles: 2,
    },
  })

  const hasNewImage = dropzone.fileStatuses.length > 0
  const hasExistingImage = typeof value === "string" && !!value
  const displayImage = hasNewImage || hasExistingImage

  useEffect(() => {
    if (!value && hasNewImage) {
      dropzone.fileStatuses.forEach((file) => dropzone.onRemoveFile(file.id))
    }
  }, [value, hasNewImage, dropzone])

  return (
    <Dropzone {...dropzone}>
      {!displayImage && (
        <DropZoneArea className="mb-2 h-8 min-h-8 w-8 min-w-8 cursor-pointer rounded-[8px] border-none bg-transparent! shadow-none hover:bg-transparent!">
          <DropzoneTrigger>
            <ImageIcon className="h-8 min-h-8 w-8 min-w-8 rounded-[8px] text-primary-button transition-colors group-hover:text-primary-button/50!" />
          </DropzoneTrigger>
        </DropZoneArea>
      )}

      {displayImage && (
        <DropzoneFileList className="mb-[16.5px] w-40 rounded-[16px] bg-foreground not-dark:shadow-md">
          {dropzone.fileStatuses.map((file) => (
            <>
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
            </>
          ))}

          {hasExistingImage && !hasNewImage && (
            <FileItem
              fileName="Minha imagem"
              fileSize={0}
              previewUrl={value}
              status="success"
              onRemove={() => onChange(null)}
            />
          )}
        </DropzoneFileList>
      )}
    </Dropzone>
  )
}
