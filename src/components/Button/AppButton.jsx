import Button from "@mui/material/Button";

export default function AppButton({
  children,
  variant = "contained",
  type = "button",
  disabled = false,
  onClick,
  ...rest
}) {
  return (
    <Button variant={variant} type={type} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </Button>
  );
}
