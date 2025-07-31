import Image from "next/image";
import { FC } from "react";
// import SkeletonLoader from "@/components/ui/Skeleton/Skeleton";
import { IUploadField } from "./UploadField.interface";
import s from "./UploadField.module.scss";
import { useUpload } from "./useUpload";
import addImage from "@/assets/images/addImage.svg";

const UploadField: FC<IUploadField> = ({
  folder,
  value,
  onChange,
  placeholder,
  error,
  style,
  isNoImage = false,
  hint,
  required,
}) => {
  const { isLoading, uploadFile, deleteFile } = useUpload(onChange, folder);

  const deleteFileHandler = () => {
    if (!value) return;
    const parts = value.split("/");
    const filename = parts.pop() || "";
    const folder = parts.pop() || "";
    deleteFile(folder, filename);
  };

  return (
    <div className={s.uploadField} style={style}>
      <p className={s.hint}>
        {hint} {required && <span className={s.required}>*</span>}
      </p>
      <div className={s.container}>
        <label className={s.label}>
          <input className={s.fileInput} type="file" onChange={uploadFile} />
          <Image src={addImage} alt="addImage" />
        </label>

        {!isNoImage && (
          <div className={s.wrap}>
            {isLoading ? (
              // <SkeletonLoader count={1} className={s.skeletonLoader} />
              "loading"
            ) : (
              value && (
                <>
                  <div className={s.delete} onClick={deleteFileHandler} />
                  {value.endsWith(".mp4") ? (
                    <video width="100" height="100" controls={false}>
                      <source src={value} type="video/mp4" />
                      Ваш браузер не поддерживает видео.
                    </video>
                  ) : (
                    <Image
                      src={value}
                      alt="img"
                      width={100}
                      height={100}
                      unoptimized
                      className={s.fileChoose}
                    />
                  )}
                </>
              )
            )}
          </div>
        )}
      </div>
      {error && <span className={s.error}>{error.message}</span>}
    </div>
  );
};

export default UploadField;
