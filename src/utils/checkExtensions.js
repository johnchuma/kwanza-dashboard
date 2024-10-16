export const isFileImage = (file) => {
  const validImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/bmp",
    "image/svg+xml",
  ];
  return file && validImageTypes.includes(file.type);
};

export const isZipped = (file) => {
  const validZipExtensions = [".zip", ".tar", ".gz", ".rar", ".7z"];
  return (
    (file && validZipExtensions.includes(file.name.slice(-4))) ||
    file.name.slice(-3) === ".gz" ||
    file.name.slice(-4) === ".tar"
  );
};
