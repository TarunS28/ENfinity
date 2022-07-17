import React from "react";
import Plot from "react-plotly.js";
import { Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function Visualizer() {
  let { state } = useLocation();

  if (typeof state === "string") {
    state = state.replaceAll("NaN", '"Nan"');
    state = JSON.parse(state);
  }

  return (
    <div className="text-center">
      <br />
      <h2>
        Best Model for your Dataset is : {state.m[0].Model} :
        {state.m[0].R2 ? state.m[0].R2 * 100 : state.m[0].Accuracy * 100}%
      </h2>
      <br />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th colSpan={Object.keys(state.m[0]).length}>
              Top 5 Models for your Dataset
            </th>
          </tr>
          <tr>
            {Object.keys(state.m[0]).map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.m.map((row) => {
            return (
              <tr>
                {Object.keys(row).map((key) => (
                  <td>{row[key]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="text-center">
        <Plot
          data={[
            {
              y: state.r[Object.keys(state.r)[0]],
              name: Object.keys(state.r)[0],
              marker: { color: "blue" },
            },
            {
              y: state.r[Object.keys(state.r)[1]],
              name: Object.keys(state.r)[1],
              marker: { color: "red" },
            },
          ]}
          layout={{ autosize: true }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
