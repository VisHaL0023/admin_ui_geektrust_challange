import React, { useState, useEffect } from "react";
import styles from "./UserCard.module.css";
import { RiDeleteBin7Line, RiEditBoxLine } from "react-icons/ri";
import TableFooter from "../TableFooter/TableFooter";
import searchFull from "../../Helper/helper";

const UserCard = ({ userData, searchValue }) => {
  //states
  const [currPage, setCurrPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState([]);
  const [modifiedData, setModifiedData] = useState([...userData]);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

  //varriable

  const userPerPage = 10;
  const startIndex = (currPage - 1) * userPerPage;
  const endIndex = startIndex + userPerPage;
  const isAllSelected = selectedRow.length === userPerPage;
  const filteredData = getFilteredData(modifiedData, searchValue);

  // Functions

  function getFilteredData(modifiedData, searchValue) {
    let updateData = [...modifiedData];
    if (searchValue) {
      updateData = searchFull(searchValue, updateData);
    }
    return updateData;
  }

  const handleEditUser = (users) => {
    setEditingItem(users);
    setIsEditMenuOpen(true);
  };

  const handleDeleteUser = (id) => {
    const updatedData = modifiedData.filter((element) => element.id !== id);

    const updatedTotalPages = Math.ceil(updatedData.length / userPerPage);
    if (currPage > updatedTotalPages) {
      setCurrPage(updatedTotalPages);
    }
    setModifiedData(updatedData);
    setSelectedRow([]);
  };

  const handleAllSelected = (event, modifiedData) => {
    const isAllChecked = event.target.checked;
    if (isAllChecked) {
      const startIndex = (currPage - 1) * userPerPage;
      let rowSelected = [];

      for (let index = startIndex; index < startIndex + userPerPage; index++) {
        if (index < modifiedData.length) {
          rowSelected.push(modifiedData[index].id);
        } else {
          rowSelected.push(Math.random());
        }
      }
      setSelectedRow(rowSelected);
    } else {
      setSelectedRow([]);
    }
  };

  const handleRowCheckBox = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRow([...selectedRow, id]);
    } else {
      setSelectedRow(selectedRow.filter((item) => item !== id));
    }
  };

  // UseEffect

  useEffect(() => {
    setCurrPage(1);
    setSelectedRow([]);
  }, [searchValue]);

  useEffect(() => {
    setModifiedData(userData);
  }, [userData]);

  return (
    <div className={styles.tableViewContainer}>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(event) => handleAllSelected(event, modifiedData)}
                checked={isAllSelected}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.slice(startIndex, endIndex).map((user, index) => (
            <tr
              key={index}
              className={styles.tableRow}
              style={{
                backgroundColor: selectedRow.includes(user.id)
                  ? "lightblue"
                  : "",
              }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRow.includes(user.id)}
                  onChange={(event) => handleRowCheckBox(event, user.id)}
                  style={{ cursor: "pointer" }}
                />
              </td>
              <td>{user.name} </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className={styles.actions}>
                <RiEditBoxLine
                  onClick={() => handleEditUser(user)}
                  style={{ cursor: "pointer", fontSize: "22px" }}
                />
                <RiDeleteBin7Line
                  style={{
                    color: "red",
                    marginLeft: "10px",
                    cursor: "pointer",
                    fontSize: "22px",
                  }}
                  onClick={() => handleDeleteUser(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Table Footer */}
      <TableFooter
        currPage={currPage}
        setCurrPage={setCurrPage}
        setSelectedRow={setSelectedRow}
        selectedRow={selectedRow}
        filteredData={filteredData}
        setModifiedData={setModifiedData}
        isEditMenuOpen={isEditMenuOpen}
        setIsEditMenuOpen={setIsEditMenuOpen}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />
    </div>
  );
};

export default UserCard;
