import DropdownButton from "react-bootstrap/DropdownButton";
import { Button } from "react-bootstrap";

function FilterDropDown({ filterSaveHandler }) {
  const submitHandler = (event) => {
    event.preventDefault();
    let result = {};
    event.target.childNodes.forEach((child) => {
      if (child.tagName === "DIV") {
        let key = `${child.childNodes[1].textContent}`.toLowerCase();
        let val = child.childNodes[0].checked;
        result = { ...result, [key]: val };
      }
    });
    filterSaveHandler(result);
  };

  return (
    <DropdownButton
      autoClose={false}
      id="dropdown-basic-button"
      title="Filter By File Type"
    >
      <div style={{ padding: "10px" }}>
        <form onSubmit={submitHandler}>
          <div>
            <input type={"checkbox"} value="pdf" />
            PDF
          </div>
          <div>
            <input type={"checkbox"} value="kml" />
            KML
          </div>
          <div>
            <input type={"checkbox"} value="csv" />
            CSV
          </div>
          <div>
            <input type={"checkbox"} value="jpg" />
            JPG
          </div>
          <Button type="submit" variant="success">
            Save
          </Button>
        </form>
      </div>
    </DropdownButton>
  );
}

export default FilterDropDown;
