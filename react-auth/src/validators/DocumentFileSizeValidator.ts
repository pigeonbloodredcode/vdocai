class DocumentFileSizeValidator
{
    private fileSizeInBytes: Number
    private maxFileSizeInBYtes: Number = 52428800 //20MB = 20971520 Bytes

    constructor(fileSize: Number){
        this.fileSizeInBytes = fileSize
    }

    validateFileSize(): boolean{
        return this.fileSizeInBytes <= this.maxFileSizeInBYtes
    }

    getErrorMessage():string{
        return  'Maximum file size accepted is 50 MB.'
    }

}

export default DocumentFileSizeValidator