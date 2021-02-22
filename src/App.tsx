import React, {useState} from 'react';
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import Axios from "axios";
import './App.sass';
import UploadFile from "./components/UploadFile";
import ImageWithDescription from "./components/ImageWithDescription";
import QuestionBlock from "./components/QuestionBlock";

const serverUrl = "http://pcknot4.fit.vutbr.cz:8502"

interface Answer {
    "answer": string,
    "probability": number
}

export interface QuestionResponse {
    answers: Answer[]
}

function App() {
    const [imageId, setImageId] = useState<string | undefined>(undefined);
    const [imageDescription, setImageDescription] = useState("");
    const [currentImage, setCurrentImage] = useState<string | undefined>(undefined);
    const [question, setQuestion] = useState<string | undefined>(undefined);
    const [answers, setAnswers] = useState<QuestionResponse | undefined>(undefined)

    const askQuestion = () => {
        Axios.post<QuestionResponse>(`${serverUrl}/ask-question/${imageId}`, {question: question})
            .then((value) => {
                setAnswers(value.data)
            })
    }

    const resetForm = () => {
        setAnswers(undefined)
        setQuestion(undefined)
        setImageDescription("")
        setCurrentImage(undefined)
    }

    return (
        <>
            <div className={'container pt-3'}>
                <div className={'block box'}>
                    <UploadFile serverUrl={serverUrl}
                                resetForm={resetForm}
                                setImageDescription={setImageDescription}
                                setCurrentImage={setCurrentImage}
                                setImageId={setImageId}
                    />
                </div>
                <ImageWithDescription image={currentImage} description={imageDescription}/>
                <QuestionBlock isImageLoaded={!!currentImage} askQuestion={askQuestion} setQuestion={setQuestion}
                               answers={answers}/>
                <footer className="footer py-3">
                    <div className="content has-text-centered">
                        <p>
                            Created by Pavel Kocurek
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default App;
