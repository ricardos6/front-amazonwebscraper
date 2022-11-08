import React from "react";
import Form from "react-bootstrap/Form";
import {deepClone} from "../../utils/utils";
import Button from 'react-bootstrap/Button';
import "./leftPanel.css";

const aggregationsMapping = {
    os: "Operation System",
    cellular_technology: "Cellular Technology",
    memory_storage: "Storage",
    brand: "Brand",
};


export const LeftPanel = ({aggregations, setQuery}) => {
    const _aggregations = aggregations ? deepClone(aggregations) : {};

    const onClickAggregation = (key) => {
        console.log("onClickAggregation", key)
    }

    return (
        <div className="left-panel__main">
            <div className="left-panel__wrapper">
                <div className="left-panel__inputsWrapper">
                    {Object.entries(_aggregations).map(([key, value]) => {
                        return (
                            <div key={key} className="left-panel__agg-wrapper">
                                <div className="left-panel__agg-title">
                                    {aggregationsMapping[key]}
                                </div>
                                <div className="left-panel__agg-buckets">
                                    {value.buckets.map((agg) => (
                                        // <Button variant="link" key={`${agg.key}`} className="left-panel__agg-link"
                                        // onClick={() => onClickAggregation(key)}>{`${agg.key} (${agg.doc_count})`}</Button>
                                        <Form.Check
                                            type={"checkbox"}
                                            id={`default-${agg.key}`}
                                            label={`${agg.key}`}
                                            key={agg.key}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* <div className="verticalDivider" /> */}
            </div>
        </div>
    );
};
