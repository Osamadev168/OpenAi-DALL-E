import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
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
  const [file, setFile] = useState("");
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
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ fontWeight: "lighter", color: "whitesmoke" }}>
        Open AI DALL-E
      </h3>
      <FormControl>
        <TextField
          id="outlined-basic"
          label="Enter Description"
          variant="standard"
          placeholder="......"
          value={text}
          color="primary"
          sx={{ input: { color: "whitesmoke" } }}
          onChange={(e) => setText(e.target.value)}
        />
        {progress === true ? (
          <div style={{ margin: 20 }}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <Button
            style={{ margin: 10 }}
            type="submit"
            color="primary"
            variant="contained"
            onClick={onSubmit}
            disabled={text == "" || size === ""}
          >
            Generate Image
          </Button>
        )}
      </FormControl>
      <div style={{ margin: 10 }}>
        <img
          src={result}
          style={{ width: 400, height: "100%", borderRadius: 10 }}
        />
      </div>
      <div style={{}}>
        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{ color: "whitesmoke" }}
          >
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
              sx={{ color: "white" }}
              onChange={(e) => setSize(e.target.value)}
            />
            <FormControlLabel
              value="512x512"
              control={<Radio />}
              label="Medium"
              sx={{ color: "white" }}
              onChange={(e) => setSize(e.target.value)}
            />
            <FormControlLabel
              value="1024x1024"
              control={<Radio />}
              label="High"
              sx={{ color: "white" }}
              onChange={(e) => setSize(e.target.value)}
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}
