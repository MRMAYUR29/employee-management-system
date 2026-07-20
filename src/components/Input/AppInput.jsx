import TextField from "@mui/material/TextField";

export default function AppInput({
  label,
  type = "text",
  error = false,
  helperText,
  placeholder,
  fullWidth = true,
  ...rest
}) {
  return (
    <TextField 
    label={label} 
    type={type}
    error={error}
    helperText={helperText}
    placeholder={placeholder}
    fullWidth={fullWidth}
    {...rest}
    >

    </TextField>
  );
}
