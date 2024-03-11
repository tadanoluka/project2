import { FILE_STATUS } from "@/app/admin/files/add/fileInfo/FILE_STATUS";

export type TFileInfo = {
  file: File;
  status: FILE_STATUS;
  uploadPercent: number;
};
export enum FILE_INFO_ACTION_TYPE {
  REMOVE_ALL,
  REMOVE_FILE_INFO_BY_FILE,
  ADD_FILE_INFO,
  SET_STATUS,
  UPDATE_LOAD_PERCENT,
}

export type TFileInfoAction =
  | {
      type: FILE_INFO_ACTION_TYPE.REMOVE_ALL;
    }
  | {
      type: FILE_INFO_ACTION_TYPE.REMOVE_FILE_INFO_BY_FILE;
      payload: TRemoveFileInfoByFilePayload;
    }
  | {
      type: FILE_INFO_ACTION_TYPE.ADD_FILE_INFO;
      payload: TAddFileInfoPayload;
    }
  | {
      type: FILE_INFO_ACTION_TYPE.SET_STATUS;
      payload: TSetStatusPayload;
    }
  | {
      type: FILE_INFO_ACTION_TYPE.UPDATE_LOAD_PERCENT;
      payload: TUpdateLoadPercentPayload;
    };

type TRemoveFileInfoByFilePayload = {
  file: File;
};

type TAddFileInfoPayload = {
  fileInfo: TFileInfo;
};

type TSetStatusPayload = {
  file: File;
  status: FILE_STATUS;
};

type TUpdateLoadPercentPayload = {
  file: File;
  uploadPercent: number;
};
