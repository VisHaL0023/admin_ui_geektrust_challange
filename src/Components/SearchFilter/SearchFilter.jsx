import React from "react";
import styles from "./Search.module.css";

const SearchFilter = ({ setValue }) => {
  const handleChange = (e) => {
    const eventValue = e.target.value;
    setValue(eventValue);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.search}
        placeholder="Search by Name, Email, Role"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchFilter;
