
interface  UploadFileResponse{
    success:boolean,
    message:string
}
class FileService
{
    private file: File
    constructor(file:File){
        this.file = file
    }
    static getFileExtension(fileName: string ):string {
        const fileNames: Array<string> = fileName.split('.')
        if(fileNames.length  === 0){
            return ''
        }
        return fileNames[fileNames.length-1]


    }    
    async uploadFile(): Promise<UploadFileResponse>{
        const uploadResponse = await fetch('http://localhost:8080/api/create-vdo-lesson', {
            method: 'POST',
            body: this.getFormData()
        })

        return {
            success:true,
            message:'Sav...'
        }
    }

    private getFormData(): FormData{
        const formData  = new FormData()
        const reader = new FileReader()
                
        formData.append('vdo', this.file, this.file.name)//add by index
                
        //formData.append('vdo', this.file, 'n.jpg');
        console.log(this.file)
        console.log("|")
        console.log(formData)
        return formData
    }

}

export default FileService