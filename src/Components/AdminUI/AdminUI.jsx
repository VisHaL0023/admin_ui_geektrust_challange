import React, { useEffect, useState } from "react";
import { fetchUserData } from "../../API/api";
import UserCard from "../UserCard/UserCard";
import SearchFilter from "../SearchFilter/SearchFilter";
import styles from "./AdminUI.module.css";

const Admin_UI = () => {
  const [usersData, setUsersData] = useState([]);
  const [value, setValue] = useState(null);
  const getUsersData = async () => {
    try {
      const res = await fetchUserData();
      setUsersData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className={styles.container}>
      <SearchFilter setValue={setValue} />
      <UserCard userData={usersData} searchValue={value} />
    </div>
  );
};

export default Admin_UI;
