import React, { useState } from "react";
import styles from "./EditMenu.module.css";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const options = ["admin", "member"];

const EditMenu = ({ userData, SaveData, closeMenu }) => {
  const [editUser, setEditUser] = useState({ ...userData });

  const handleSave = () => {
    SaveData(editUser);
    closeMenu();
  };

  const handleEditedValues = (event) => {
    const { name, value } = event.target;
    setEditUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className={styles.editMenu}>
      <div className={styles.menuContainer}>
        <h2>Edit user details</h2>
        <label>User Name</label>
        <input
          type="name"
          name="name"
          value={editUser.name}
          onChange={handleEditedValues}
        />
        <label>Email</label>
        <input
          type="name"
          name="email"
          value={editUser.email}
          onChange={handleEditedValues}
        />
        <label>Role</label>
        <Box className="dropdown" sx={{ minWidth: 120 }}>
          <FormControl sx={{ width: "200px" }} size="small">
            <Select
              labelId="Role"
              id="role"
              value={editUser.role}
              name="role"
              onChange={handleEditedValues}
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option && option[0].toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <div className={styles.menuButton}>
          <button onClick={handleSave}>Save</button>
          <button onClick={closeMenu}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
