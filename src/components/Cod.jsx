import FilterToggle from "./FilterToggle";

const Cod = ({ cod }) => {
  return (
    <FilterToggle title={"Cash on Delivery"}>
      <div
        className={`p-3 rounded-3 mt-2 mb-3 bg-white`}
        style={{
          fontWeight: "500",
          fontSize: "16px",
          letterSpacing: "0.3px",
         
        }}
      >
        
        <span>{cod ? "Available" : "Not Available"}</span>
      </div>
    </FilterToggle>
  );
};

export default Cod;
