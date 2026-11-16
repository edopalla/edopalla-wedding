import { useRef, useState, type ChangeEvent } from "react";
import { insert, setIfMissing, useClient, type ArrayOfObjectsInputProps } from "sanity";
import { Button, Card, Stack, Text } from "@sanity/ui";
import { UploadIcon } from "@sanity/icons/Upload";

const batchSize = 5;

function uniqueKey() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

function isVideo(file: File) {
  return file.type.startsWith("video/");
}

function reference(assetId: string) {
  return { _type: "reference", _ref: assetId };
}

export function BatchUploadInput(props: ArrayOfObjectsInputProps) {
  const client = useClient({ apiVersion: "2025-01-01" });
  const picker = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [failed, setFailed] = useState<string[]>([]);

  const upload = async (file: File) => {
    if (isVideo(file)) {
      const asset = await client.assets.upload("file", file, { filename: file.name });
      return { _type: "video", _key: uniqueKey(), file: { _type: "file", asset: reference(asset._id) } };
    }
    const asset = await client.assets.upload("image", file, { filename: file.name });
    return { _type: "photo", _key: uniqueKey(), asset: reference(asset._id) };
  };

  const uploadAll = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";
    if (files.length === 0) return;

    setFailed([]);
    setProgress({ done: 0, total: files.length });
    props.onChange(setIfMissing([]));

    for (let start = 0; start < files.length; start += batchSize) {
      const batch = files.slice(start, start + batchSize);
      const results = await Promise.allSettled(batch.map(upload));
      const items = results.flatMap((result) => (result.status === "fulfilled" ? [result.value] : []));
      const rejected = batch.filter((_, index) => results[index].status === "rejected").map((file) => file.name);
      if (items.length > 0) props.onChange(insert(items, "after", [-1]));
      if (rejected.length > 0) setFailed((names) => [...names, ...rejected]);
      setProgress({ done: Math.min(start + batch.length, files.length), total: files.length });
    }

    setProgress(null);
  };

  return (
    <Stack gap={3}>
      {props.renderDefault(props)}
      <input
        ref={picker}
        type="file"
        multiple
        accept="image/*,video/*"
        hidden
        onChange={uploadAll}
      />
      <Button
        icon={UploadIcon}
        mode="ghost"
        text={progress ? `Uploading ${progress.done} / ${progress.total}…` : "Upload photos and videos"}
        disabled={props.readOnly || progress !== null}
        onClick={() => picker.current?.click()}
      />
      {failed.length > 0 && (
        <Card padding={3} tone="critical" radius={2}>
          <Text size={1}>Could not upload: {failed.join(", ")}</Text>
        </Card>
      )}
    </Stack>
  );
}
