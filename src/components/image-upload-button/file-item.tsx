import { Trash2Icon } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropzoneFileListItem,
  DropzoneRemoveFile,
  DropzoneTrigger,
} from "../ui/dropzone"

export function FileItem({
  fileName,
  fileSize,
  previewUrl,
  status,
  onRemove,
}: {
  fileName: string
  fileSize: number
  previewUrl?: string
  status: string
  onRemove: () => void
}) {
  const oneMegaByte = 1024 * 1024
  return (
    <DropzoneFileListItem
      className="overflow-hidden rounded-[16px] border border-border p-0 shadow-sm"
      file={{} as any}
    >
      <DropzoneTrigger className="w-full cursor-pointer">
        {status === "pending" ? (
          <div className="aspect-video animate-pulse bg-black/20" />
        ) : (
          <img
            src={previewUrl}
            alt={fileName}
            className="aspect-video w-full object-cover"
          />
        )}
      </DropzoneTrigger>

      <div className="flex items-center justify-between p-2 pl-4">
        <div className="min-w-0">
          <p className="truncate text-sm">{fileName}</p>
          <p className="text-xs text-text-secondary">
            {fileSize > 0 ? `${(fileSize / oneMegaByte).toFixed(2)}} MB` : null}
          </p>
        </div>
        <DropzoneRemoveFile>
          <Button
            onClick={onRemove}
            className="h-5 min-h-5 w-5 min-w-5 cursor-pointer border-none bg-transparent p-0 shadow-none hover:bg-transparent hover:text-red-500/80"
          >
            <Trash2Icon className="h-5 min-h-5 w-5 min-w-5" />
          </Button>
        </DropzoneRemoveFile>
      </div>
    </DropzoneFileListItem>
  )
}
