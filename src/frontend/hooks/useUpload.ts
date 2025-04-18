import { IRootContext, UploadStatus } from '../context/RootContext'

export default function useUpload({
    upload,
    files,
}: Pick<IRootContext, 'upload' | 'files'>) {
    const {
        proceedUpload,
        filesProgressMap,
        uploadStatus,
        uploadError,
        totalProgress,
    } = upload || {}

    return {
        upload: proceedUpload,
        files: Array.from(files.values()).map(file => {
            const progressObject = filesProgressMap?.[file.id]
            const progress = progressObject?.total
                ? Math.round(progressObject?.loaded / progressObject.total)
                : 0

            return {
                ...file,
                progress,
            }
        }),
        loading: uploadStatus === UploadStatus.ONGOING,
        error: uploadError,
        progress: totalProgress,
    }
}
