import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import {
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState();
  const [progress, setProgress] = useState(false);
  const [size, setSize] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
    setResult("");

    setProgress(true);
    const response = await fetch("http://localhost:4000/genImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: text, size: size }),
    });
    const data = await response.json();
    setResult(data.data);

    setText("");
    setProgress(false);
    console.log(size, data);
  }
  return (
    <div style={{ backgroundColor: "#808080", borderRadius: 20 }}>
      <div style={{ textAlign: "center" }}>
        <h3 style={{ fontWeight: "lighter", color: "whitesmoke" }}>
          Open AI DALL-E
        </h3>

        <FormControl style={{}}>
          <TextField
            id="outlined-basic"
            label="Enter Discription"
            variant="outlined"
            placeholder="......"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {progress === true ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={onSubmit}
              disabled={size === ""}
            >
              Generate Image
            </Button>
          )}
          <div style={{ margin: 30 }}>
            <img
              src={result}
              style={{ width: 400, height: "100%", borderRadius: 30 }}
            />
          </div>
        </FormControl>

        <div style={{}}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Select Quality
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="256x256"
                control={<Radio />}
                label="Low"
                onChange={(e) => setSize(e.target.value)}
              />
              <FormControlLabel
                value="512x512"
                control={<Radio />}
                label="Medium"
                onChange={(e) => setSize(e.target.value)}
              />
              <FormControlLabel
                value="1024x1024"
                control={<Radio />}
                label="High"
                onChange={(e) => setSize(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
