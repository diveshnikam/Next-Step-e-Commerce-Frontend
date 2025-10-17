import FilterToggle from "./FilterToggle";
import { useContext } from "react";
import NextStepContext from "../context/NextStepContext";

const Filters = () => {
  const {
    gender,
    setGender,
    rating,
    setRating,
    discount,
    setDiscount,
    price,
    setPrice,
    color,
    setColor,
  } = useContext(NextStepContext);

  const genderHandler = (e) => {
    const { checked, value } = e.target;

    setGender((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

  const ratingHandler = (e) => {
    setRating(e.target.value);
  };

  const discountHandler = (e) => {
    setDiscount(e.target.value);
  };

  const colorHandler = (e) => {
    const { checked, value } = e.target;

    setColor((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const colorOptions = [
    "Black",
    "White",
    "Grey",
    "Blue",
    "Red",
    "Brown",
    "Green",
    "Pink",
    "Yellow",
    "Orange",
    "Gold",
  ];

  const clearFilter = () => {
    setGender([]);
    setDiscount("");
    setPrice("");
    setRating("");
    setColor([])
  };

  return (
    <div className="p-3">
      <button
        type="button"
        className="btn btn-secondary mt-2"
        onClick={clearFilter}
      >
        Clear Filter
      </button>

    <hr className="border-bottom mt-4" />

      <FilterToggle title="Gender">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="Men"
            checked={gender.includes("Men")}
            onChange={genderHandler}
            id="men"
          />
          <label className="form-check-label" htmlFor="men">
            Men
          </label>
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            value="Women"
            checked={gender.includes("Women")}
            onChange={genderHandler}
            id="women"
          />
          <label className="form-check-label" htmlFor="women">
            Women
          </label>
        </div>
      </FilterToggle>

      <FilterToggle title="Rating">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="rating"
            value="1"
            id="rating1"
            onChange={ratingHandler}
            checked={rating === "1"}
          />
          <label className="form-check-label" htmlFor="rating1">
            1 Star & above
          </label>
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="radio"
            name="rating"
            value="2"
            id="rating2"
            onChange={ratingHandler}
            checked={rating === "2"}
          />
          <label className="form-check-label" htmlFor="rating2">
            2 Star & above
          </label>
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="radio"
            name="rating"
            value="3"
            id="rating3"
            onChange={ratingHandler}
            checked={rating === "3"}
          />
          <label className="form-check-label" htmlFor="rating3">
            3 Star & above
          </label>
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="radio"
            name="rating"
            value="4"
            id="rating4"
            onChange={ratingHandler}
            checked={rating === "4"}
          />
          <label className="form-check-label" htmlFor="rating4">
            4 Star & above
          </label>
        </div>
      </FilterToggle>

      <FilterToggle title="Discount">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="discount1"
            value="10"
            id="discount1"
            onChange={discountHandler}
            checked={discount === "10"}
          />
          <label className="form-check-label" htmlFor="discount1">
            10% & above
          </label>
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="radio"
            name="discount2"
            value="20"
            id="discount2"
            onChange={discountHandler}
            checked={discount === "20"}
          />
          <label className="form-check-label" htmlFor="discount2">
            20% & above
          </label>
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="radio"
            name="discount3"
            value="30"
            id="discount3"
            onChange={discountHandler}
            checked={discount === "30"}
          />
          <label className="form-check-label" htmlFor="discount3">
            30% & above
          </label>
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="radio"
            name="discount4"
            value="40"
            id="discount4"
            onChange={discountHandler}
            checked={discount === "40"}
          />
          <label className="form-check-label" htmlFor="discount4">
            40% & above
          </label>
        </div>
      </FilterToggle>

      <FilterToggle title="Price">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="price"
            value="high"
            id="priceHigh"
            onChange={priceHandler}
            checked={price === "high"}
          />
          <label className="form-check-label" htmlFor="priceHigh">
            High to Low
          </label>
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="radio"
            name="price"
            value="low"
            id="priceLow"
            onChange={priceHandler}
            checked={price === "low"}
          />
          <label className="form-check-label" htmlFor="priceLow">
            Low to High
          </label>
        </div>
      </FilterToggle>

      <FilterToggle title="Color">
        {colorOptions.map((clr) => (
          <div className="form-check mt-2" key={clr}>
            <input
              className="form-check-input"
              type="checkbox"
              value={clr}
              checked={color.includes(clr)}
              onChange={colorHandler}
              id={`color-${clr}`}
            />
            <label className="form-check-label" htmlFor={`color-${clr}`}>
              {clr}
            </label>
          </div>
        ))}
      </FilterToggle>
    </div>
  );
};

export default Filters;
