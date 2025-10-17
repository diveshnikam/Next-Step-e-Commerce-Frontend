import { useState } from "react";

const FilterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-bottom  py-2 mb-3 shadow-none">
      <div
        className="d-flex justify-content-between align-items-center"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      >
        <h6 className="fw-bold mb-3 hover-underline">{title}</h6>
        <i className={`bi bi-chevron-${isOpen ? "up" : "down"}`}></i>
      </div>

      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default FilterSection;
