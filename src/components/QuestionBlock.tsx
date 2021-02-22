import Chart from "./Chart";
import React, {ChangeEvent} from "react";
import {QuestionResponse} from "../App";

function QuestionBlock(props: {
    isImageLoaded: boolean,
    answers: QuestionResponse | undefined
    setQuestion: (question: string) => void
    askQuestion: () => void
}) {

    if (!props.isImageLoaded) {
        return null
    }

    const questionUpdated = (e: ChangeEvent<HTMLInputElement>) => {
        props.setQuestion(e.target.value)
    }


    const questionKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.askQuestion()
        }
    }

    return (
        <div className={'columns'}>
            <div className={"column is-half"}>
                <div className={'px-2 ask-question'}>
                    <label className={'label'}>Ask a question:</label>
                    <div className={'control'}>
                        <input className={'input'} type={"text"} onChange={questionUpdated}
                               onKeyDown={questionKeyDown}/>
                    </div>
                    <div className={'control pt-1'}>
                        <button className={'button is-primary'} onClick={props.askQuestion}>Submit
                        </button>
                    </div>
                </div>
            </div>
            <div className={'column is-half'}>
                <Chart data={props.answers}/>
            </div>
        </div>
    );
}

export default QuestionBlock
