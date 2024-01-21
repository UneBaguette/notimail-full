import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const SearchUser = ({ setOpen }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handlechange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen && setOpen(false);
    navigate('/result', { state: searchText });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Rechercher"
        value={searchText}
        onChange={handlechange}
      />
      <button type="submit">
        <IoIosSearch />
      </button>
    </form>
  );
};
