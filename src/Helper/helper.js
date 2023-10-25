function searchFull(value, updatedData) {
  return updatedData.filter(({ name, email, role }) => {
    return (
      name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      email.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      role.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  });
}

export default searchFull;
