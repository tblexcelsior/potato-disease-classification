import React, { useCallback, useEffect } from 'react'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'
import './index.css'
import PredictTag from './predictTag';
export default function MyDropzone(){

    const [files, setFiles] = React.useState();
    const [preview, setPreview] = React.useState(false);
    const [data, setData] = React.useState();
    const [image, setImage] = React.useState();

    const sendFile = async () => {
        if (preview) {
            let formData = new FormData()
            formData.append('file', image)
            let res = await axios({
                method: "post",
                url: process.env.REACT_APP_API_URL,
                data: formData
            });
            if (res.status === 200){
                setData(res.data);
            }
        }
    }

    useEffect(() => {
        if (!preview){
            return;
        }
        else{
            sendFile();
        }
    }, [preview])

    const clearData = () => {
        setData(null)
        setImage(null)
        setPreview(false)
        setFiles(null)
    }


    const onDrop = useCallback(acceptedFiles => {
        const url = acceptedFiles.map(file =>  Object.assign(
                                                            file, {
                                                            preview: URL.createObjectURL(file)
                                                            }))
        setFiles(url);
        setImage(acceptedFiles[0])
        setPreview(acceptedFiles)
        }, []);



    const {getRootProps, getInputProps, isDragActive} = useDropzone({
                                                                    onDrop,
                                                                    accept: 'image/jpeg, image/png'})

    return (
        <div className='main-content'>
            {(preview && data)?

            <PredictTag files={files} data={data}/> :
            <div className='dropzone-sheet'>
                <div {...getRootProps()} className="app-dropzone">
                <input {...getInputProps()} />{
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
                </div>
            </div>
            }
            {preview && <div className='clear-button' onClick={clearData}>
                            <p>Clear</p>
                        </div>}
        </div>
    )
}