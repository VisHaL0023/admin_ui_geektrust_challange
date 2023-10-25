import React from "react";
import styles from "./TableFooter.module.css";
import EditMenu from "../EditMenu/EditMenu";

const TableFooter = ({
  currPage,
  setCurrPage,
  setSelectedRow,
  selectedRow,
  filteredData,
  setModifiedData,
  isEditMenuOpen,
  setIsEditMenuOpen,
  editingItem,
  setEditingItem,
}) => {
  const userPerPage = 10;
  const totalPages = Math.ceil(filteredData?.length / userPerPage);

  const getPageNumber = (totalPage) => {
    const pageNumber = [];
    for (let curr = 1; curr <= totalPage; curr++) {
      pageNumber.push(curr);
    }
    return pageNumber;
  };
  const pageNumbers = getPageNumber(totalPages);

  const goToFirstPage = () => {
    setCurrPage(1);
    setSelectedRow([]);
  };

  const goToPrevPage = () => {
    setCurrPage(currPage - 1);
    setSelectedRow([]);
  };

  const handlePageClick = (page) => {
    setCurrPage(page);
    setSelectedRow([]);
  };

  const goToNextPage = () => {
    setCurrPage(currPage + 1);
    setSelectedRow([]);
  };

  const goToLastPage = () => {
    setCurrPage(totalPages);
    setSelectedRow([]);
  };

  const handleDeleteAll = () => {
    if (!selectedRow.length) return;
    const updatedData = filteredData.filter(
      (users) => !selectedRow.includes(users.id)
    );

    const updatedTotalPages = Math.ceil(updatedData.length / userPerPage);
    if (currPage > updatedTotalPages) {
      setCurrPage(updatedTotalPages);
    }
    setModifiedData(updatedData);
    setSelectedRow([]);
  };

  const handleEditData = (editUser) => {
    const updateData = [...filteredData];
    const firstIndexOfEditing = updateData.findIndex(
      (user) => user.id === editUser.id
    );
    if (firstIndexOfEditing !== -1) {
      updateData[firstIndexOfEditing] = editUser;
      setModifiedData(updateData);
    }
    setEditingItem(null);
  };

  const handleCloseMenu = () => {
    setIsEditMenuOpen(false);
    setEditingItem(null);
  };

  return (
    <div className={styles.tableFooter}>
      <button
        className={
          !selectedRow.length ? styles.disableDeleteButton : styles.deleteButton
        }
        onClick={handleDeleteAll}
      >
        Delete Selected
      </button>
      <div className={styles.paginationContainer}>
        <button
          onClick={goToFirstPage}
          className={currPage === 1 ? styles.disabledButton : styles.button}
        >
          First
        </button>
        <button
          onClick={goToPrevPage}
          className={currPage === 1 ? styles.disabledButton : styles.button}
        >
          Previous
        </button>

        {pageNumbers?.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={currPage === page ? styles.activePage : styles.button}
          >
            {page}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          className={
            currPage === totalPages ? styles.disabledButton : styles.button
          }
        >
          Next
        </button>
        <button
          onClick={goToLastPage}
          className={
            currPage === totalPages ? styles.disabledButton : styles.button
          }
        >
          Last
        </button>
      </div>

      {isEditMenuOpen && (
        <EditMenu
          userData={editingItem}
          SaveData={handleEditData}
          closeMenu={handleCloseMenu}
        />
      )}
    </div>
  );
};

export default TableFooter;
