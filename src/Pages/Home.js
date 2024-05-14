import React from "react";
import NotesCard from "../Components/NotesCard/NotesCard";

const Home = (props) => {
  const {showAlert} = props
  return (
    <div>
      <NotesCard showAlert={showAlert}/>
    </div>
  );
};

export default Home;
