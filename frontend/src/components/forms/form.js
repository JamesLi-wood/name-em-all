import { useState } from "react";
import Regions from "./regions";
import Types from "./types";
import "./form.css";

const formComponents = {
  regions: (props) => <Regions {...props} />,
  types: (props) => <Types {...props} />,
};

const Form = () => {
  const [role, setRole] = useState("");
  const RenderFormComponent = formComponents[role];

  return (
    <div className="form-wrapper">
      {role ? (
        <RenderFormComponent setRole={setRole} />
      ) : (
        <form>
          <div className="form-title">Select Mode</div>
          <div className="region-selection">
            <div onClick={() => setRole("regions")}>Regions</div>
            <div onClick={() => setRole("types")}>Types</div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
