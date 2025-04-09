import React, { useState } from "react";
import { Input, Button } from "./commonComponents";
function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted value ", inputValue);
  };
  return (
    <div className="font-poppins">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          name="test"
          value={inputValue}
          type="text"
          onChange={handleChange}
        />
        <Button label="button" />
      </form>
    </div>
  );
}

export default App;
