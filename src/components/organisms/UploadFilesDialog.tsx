import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".pdf", ".docx"];
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

interface UploadFilesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAttachFiles?: (files: File[]) => void;
}

function isAcceptedFile(file: File) {
  const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  return (
    ACCEPTED_EXTENSIONS.includes(extension) ||
    ACCEPTED_FILE_TYPES.includes(file.type)
  );
}

export function UploadFilesDialog({
  open,
  onOpenChange,
  onAttachFiles,
}: UploadFilesDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const closeDialog = () => {
    onOpenChange(false);
    setSelectedFiles([]);
    setError("");
    setIsDragging(false);
  };

  const addFiles = (files: FileList | File[]) => {
    const acceptedFiles: File[] = [];
    const rejectedFiles: string[] = [];

    Array.from(files).forEach((file) => {
      if (!isAcceptedFile(file)) {
        rejectedFiles.push(
          `${file.name}: only PDF and DOCX files are supported.`,
        );
      } else if (file.size > MAX_FILE_SIZE) {
        rejectedFiles.push(`${file.name}: file must be 50 MB or smaller.`);
      } else {
        acceptedFiles.push(file);
      }
    });

    if (acceptedFiles.length > 0) {
      setSelectedFiles((currentFiles) => {
        const newFiles = acceptedFiles.filter(
          (file) =>
            !currentFiles.some(
              (currentFile) =>
                currentFile.name === file.name &&
                currentFile.size === file.size &&
                currentFile.lastModified === file.lastModified,
            ),
        );
        return [...currentFiles, ...newFiles];
      });
    }

    setError(rejectedFiles.join(" "));
  };

  const handleAttach = () => {
    if (!onAttachFiles) {
      setError("File upload is not connected yet.");
      return;
    }

    onAttachFiles(selectedFiles);
    closeDialog();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          onOpenChange(true);
        } else {
          closeDialog();
        }
      }}
    >
      <DialogContent className="max-w-md">
        <div className="relative border-b px-6 py-5 pr-14">
          <DialogTitle>Upload and attach files</DialogTitle>
          <DialogDescription className="mt-2">
            Upload and attach files to this project.
          </DialogDescription>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close upload dialog"
            className="absolute top-4 right-4"
            onClick={closeDialog}
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ×
            </span>
          </Button>
        </div>

        <div className="p-6">
          <div
            className={`flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed py-6 text-center transition-colors ${
              isDragging
                ? "border-primary bg-muted"
                : "border-border hover:bg-muted/30"
            }`}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(event) => {
              const nextTarget = event.relatedTarget;
              if (
                !(nextTarget instanceof Node) ||
                !event.currentTarget.contains(nextTarget)
              ) {
                setIsDragging(false);
              }
            }}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              addFiles(event.dataTransfer.files);
            }}
          >
            <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-muted">
              <Upload className="size-8" aria-hidden="true" />
            </div>
            <p className="font-medium">Drag and drop files here</p>
            <p className="mt-1 text-sm text-muted-foreground">
              PDF or DOCX (max. 50 MB each)
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              multiple
              className="sr-only"
              onChange={(event) => {
                if (event.currentTarget.files) {
                  addFiles(event.currentTarget.files);
                  event.currentTarget.value = "";
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => inputRef.current?.click()}
            >
              Browse files
            </Button>
            {selectedFiles.length > 0 && (
              <ul className="mt-4 w-full max-w-md space-y-1 text-left text-sm">
                {selectedFiles.map((file) => (
                  <li
                    key={`${file.name}-${file.size}-${file.lastModified}`}
                    className="truncate text-muted-foreground"
                  >
                    {file.name}
                  </li>
                ))}
              </ul>
            )}
            {error && (
              <p role="alert" className="mt-3 text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t bg-muted/20 px-6 py-5">
          <Button type="button" variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={selectedFiles.length === 0}
            onClick={handleAttach}
          >
            Attach {selectedFiles.length > 1 ? "files" : "file"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
