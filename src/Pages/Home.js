import React from "react";
import NotesCard from "../Components/NotesCard/NotesCard";

const Home = (props) => {
  const {showAlert} = props
  return (
    <div>
      <NotesCard showAlert={showAlert} mode={props.mode} toggleMode={props.toggleMode}/>
    </div>
  );
};

export default Home;
