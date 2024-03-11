export const apiURI = "http://localhost:8080/api/v1";
export const securedURI = apiURI + "/secured";

export const securedFilesURI = securedURI + "/files";

export const loadFileURI = securedFilesURI + "/add";

export const downloadFileURI = (filename: string) =>
  securedFilesURI + "/download/" + filename;
