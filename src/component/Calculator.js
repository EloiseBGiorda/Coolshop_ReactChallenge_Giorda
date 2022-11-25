/**
 * File regarding the management of the calculator.
 * It holds all functions necessary and returns the html DOM for the calculator
 */
import { useState, useEffect } from "react";

function Calculator() {
  //Hook to manage the rows and their data
  const [row, setRow] = useState([]);

  //function to add new row data to the row hook with default data
  const addNewRow = () => {
    const newRow = [...row, { operator: "+", value: 0, enabled: true }];
    setRow(newRow);
  };

  //function to delete the selected row's data and consecutively its html row counterpart
  const deleteRow = (idx) => {
    const rows = [...row];
    rows.splice(idx, 1);
    setRow(rows);
  };

  //function to save the number inserted in the row's textbox into its data counterpart
  const manageInput = (idx, value) => {
    const rows = [...row];
    rows[idx].value = value;
    setRow(rows);
  };

  //function to toggle the operator sign of the selected value
  const manageOperator = (idx) => {
    const rows = [...row];
    if (rows[idx].operator === "+") rows[idx].operator = "-";
    else rows[idx].operator = "+";
    setRow(rows);
  };

  //function to enable or diable the row and it's value in the calculation
  const toggleEnabled = (idx) => {
    const rows = [...row];
    rows[idx].enabled = !rows[idx].enabled;
    setRow(rows);
  };

  //function to calculate the sum of all enabled inserted values, negative or positive
  const sum = (rows) => {
    console.log("calculating sum");
    let sumValue = 0;
    rows.forEach((row) => {
      if (row.enabled === true) {
        if (row.operator === "+") sumValue += Number(row.value);
        else sumValue -= Number(row.value);
      }
    });
    return sumValue;
  };

  //used to create a first row on creation
  useEffect(() => {
    addNewRow();
  }, []); //empty array to ensure the effect is called only upon creation

  //the html code to represent the calculator
  return (
    <div className="text-center mx-auto mt-5" style={{ width: "500px" }}>
      {/*the button to add new rows*/}
      <button
        onClick={() => addNewRow()}
        className="btn btn-secondary mx-auto"
        style={{ width: "90%", margin: "2rem auto 0 auto !important" }}
      >
        Add new row
      </button>

      {/*a text to inform the user to add new values if there are currently none*/}
      <p className="text-center">
        <em>
          {row.length <= 0 ? "click the button to add your first value" : ""}
        </em>
      </p>

      {/*cycling all available rows to give them a visible html row*/}
      {row.map((row, index) => (
        <div key={index}>
          <div className="row g-3 justify-content-md-center mt-1">
            <div className="col-auto">
              {/*the button to switch the value's operator*/}
              <button
                onClick={() => manageOperator(index)}
                value={row.operator}
                disabled={!row.enabled}
                type="button"
                className="btn btn-dark"
                style={{ minWidth: "4rem" }}
              >
                {row.operator}
              </button>
            </div>
            <div className="col-auto">
              {/*the input textbox to change the nuber's value*/}
              <input
                type="text"
                value={row.value}
                onChange={(e) => manageInput(index, e.target.value)}
                disabled={!row.enabled}
                className="form-control"
                aria-describedby="passwordHelpInline"
              />
            </div>
            <div className="col-auto">
              {/*the button to delete the selected row*/}
              <button
                onClick={() => {
                  deleteRow(index);
                }}
                type="button"
                className="btn btn-secondary "
              >
                Delete
              </button>

              {/*the button to enable or disable the row*/}
              <button
                onClick={() => toggleEnabled(index)}
                type="button"
                className="btn btn-dark"
              >
                {row.enabled ? "disable" : "enable"}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/*the value of the sum*/}
      <p className="display-6" style={{ margin: "2rem 8rem" }}>
        The total is: {sum(row)}
      </p>
    </div>
  );
}

export default Calculator;
