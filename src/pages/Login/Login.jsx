import Container from "@mui/material/Container";
import AppInput from "../../components/Input/AppInput";
import AppButton from "../../components/Button/AppButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/authService";
import { useDispatch } from "react-redux";
import { loginSuccess, setLoading } from "../../redux/slices/authSlice";
import { STORAGE_KEYS } from "../../constants/storageKeys";
import { clearAuth } from "../../utils/authStorage";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "../../utils/authStorage";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(setLoading(true));

    try {
      const response = await loginUser(data);
      saveAuth(response);
      dispatch(loginSuccess(response));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Container>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Typography variant="h4">Employee Management</Typography>
                <AppInput
                  placeholder="Enter Email Address"
                  label="Email Address"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid Email",
                    },
                  })}
                />
                <AppInput
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                />
                <AppButton type="submit">Login</AppButton>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
