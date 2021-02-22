import {QuestionResponse} from "../App";
import {Pie} from "@reactchartjs/react-chart.js";

function Chart(props: { data: QuestionResponse | undefined }) {
    if (!props.data) {
        return null;
    }
    const possibleColors = [
        '#914e72',
        '#0078bf',
        '#00a95c',
        '#3255a4',
        '#f15060',
        '#765ba7',
        '#00838a',
        '#bb8b41',
        '#407060',
        '#ff665e'
    ]
    const chartData = {
        labels: props.data.answers.map(x => x.answer),
        datasets: [
            {
                label: 'Probability',
                data: props.data.answers.map(x => x.probability),
                backgroundColor: possibleColors.slice(0, props.data.answers.length)
            }
        ]
    }

    return (
        <>
            <Pie type={Pie} data={chartData}/>
        </>
    )
}

export default Chart;
