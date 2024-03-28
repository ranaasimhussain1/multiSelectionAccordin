import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Acordin() {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleClick(getSelectedId) {
        setSelected(selected === getSelectedId ? null : getSelectedId);
    }
    function handleMultipleSection(getSelectedId) {
        const cpmultiple = [...multiple];
        const findElement = cpmultiple.indexOf(getSelectedId);
        if (findElement === -1) {
            cpmultiple.push(getSelectedId);
        } else {
            cpmultiple.splice(findElement, 1);
        }
        setMultiple(cpmultiple);
    }
    console.log(selected, multiple);
    return (
        <div className="acc-wrapper">
            <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
                Enable Multi Selection
            </button>
            <div className="accordian">
                {data && data.length > 0 ? (
                    <div>
                        {data.map((dataItem) => (
                            <div className="item">
                                <div
                                    className="title"
                                    onClick={
                                        enableMultiSelection
                                            ? () => handleMultipleSection(dataItem.id)
                                            : () => handleSingleClick(dataItem.id)
                                    }
                                >
                                    <h3>{dataItem.question}</h3>
                                    <span>+</span>
                                </div>
                                {
                                    enableMultiSelection ? multiple.indexOf(dataItem.id) !== -1
                                        && <div className="acc-content">
                                            <h3>{dataItem.answer}</h3>
                                        </div> : selected === dataItem.id && <div className="acc-content">
                                            <h3>{dataItem.answer}</h3>
                                        </div>}

                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No Data Found</div>
                )}
            </div>
        </div>
    );
}
