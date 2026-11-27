import { useState } from "react";
import { Cloud, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadFilesDialog } from "@/components/organisms/UploadFilesDialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface DocumentItem {
  id: string;
  filename: string;
  format: string;
  date: string;
  status: string;
}

interface DocumentsPageProps {
  documents?: DocumentItem[];
  isLoading?: boolean;
  onAttachFiles?: (files: File[]) => void;
}

export function DocumentsPage({
  documents = [],
  isLoading = false,
  onAttachFiles,
}: DocumentsPageProps) {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <section className="flex min-h-full flex-col">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4">
        <h1 className="text-2xl font-semibold tracking-tight">All Documents</h1>
        <Button
          type="button"
          className="gap-1.5 rounded-lg"
          onClick={() => setIsUploadDialogOpen(true)}
        >
          <Plus aria-hidden="true" />
          Upload Files
        </Button>
      </header>

      <div className="relative flex min-h-0 flex-1 flex-col gap-3 bg-muted/40 px-10 py-6">
        <div className="relative">
          <Table className="table-fixed">
            <colgroup>
              <col className="w-75" />
              <col className="w-30" />
              <col className="w-46.25" />
              <col className="w-38" />
              <col />
            </colgroup>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-75 text-muted-foreground">
                  Filename
                </TableHead>
                <TableHead className="w-30 text-muted-foreground">
                  Format
                </TableHead>
                <TableHead className="w-46.25 text-muted-foreground">
                  Date
                </TableHead>
                <TableHead className="w-38 text-right text-muted-foreground">
                  Status
                </TableHead>
                <TableHead aria-hidden="true" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isLoading &&
                documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>{document.filename}</TableCell>
                    <TableCell>{document.format}</TableCell>
                    <TableCell>{document.date}</TableCell>
                    <TableCell className="text-right">
                      <Badge>{document.status}</Badge>
                    </TableCell>
                    <TableCell aria-hidden="true" />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Button
            className="absolute top-0 right-0"
            type="button"
            variant="outline"
            size="sm"
          >
            <Filter aria-hidden="true" />
            Filters
          </Button>
        </div>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            Loading documents...
          </div>
        ) : documents.length === 0 ? (
          <div className="flex flex-1 items-center justify-center py-8">
            <Card className="mx-auto w-full max-w-109.5 border border-dashed shadow-none ring-0">
              <Empty className="min-h-48 border-0 p-6">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Cloud
                      className="text-muted-foreground"
                      aria-hidden="true"
                    />
                  </EmptyMedia>
                  <EmptyTitle>Cloud Storage Empty</EmptyTitle>
                  <EmptyDescription className="max-w-56">
                    Upload files to your cloud storage to access them anywhere.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsUploadDialogOpen(true)}
                  >
                    Upload Files
                  </Button>
                </EmptyContent>
              </Empty>
            </Card>
          </div>
        ) : null}
      </div>
      <UploadFilesDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onAttachFiles={onAttachFiles}
      />
    </section>
  );
}
