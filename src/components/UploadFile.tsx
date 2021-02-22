import DragDropComponent from "@uppy/react/src/DragDrop";
import React from "react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";

function UploadFile(props: {
    serverUrl: string,
    resetForm: () => void,
    setImageDescription: (description: string) => void,
    setImageId: (imageId: string) => void,
    setCurrentImage: (image: string) => void
}) {

    const uppy = Uppy<Uppy.StrictTypes>({
        id: 'uppy',
        autoProceed: true,
        allowMultipleUploads: false,
        debug: false,
        restrictions: {
            maxFileSize: null,
            minFileSize: null,
            maxTotalFileSize: null,
            maxNumberOfFiles: null,
            minNumberOfFiles: null,
            allowedFileTypes: ['image/*']
        },
        meta: {},
        infoTimeout: 5000
    })
    uppy.use(XHRUpload, {
        endpoint: `${props.serverUrl}/upload-image`,
        method: "post",
        responseType: "text",
        formData: true,
        fieldName: 'file'
    }).on("file-added", _ => {
        props.resetForm();
    }).on("upload-error", args => {
        console.error("Something went horribly wrong, try again");
        uppy.reset()
    }).on("upload-success", (args, response) => {
            if (args?.data) {
                const reader = new FileReader();
                reader.readAsDataURL(args.data)
                reader.onloadend = e => {
                    if (e?.target?.result) {
                        if (typeof e.target.result === "string") {
                            props.setCurrentImage(e?.target?.result)
                        }
                    }
                }
            }
            props.setImageDescription(response.body.description)
            props.setImageId(response.body.fileName)
            uppy.reset()
        }
    )


    return (
        <>
            <h1 className={'subtitle is-4'}>Upload your file: </h1>
            <DragDropComponent uppy={uppy} allowMultipleFiles={false} height={'150px'}/>
        </>
    )
}

export default UploadFile;
