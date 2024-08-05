import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Login from "./Login";
import { loginUserApi } from "../../apis/Api";
import { toast } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

// Mock the API and toast
jest.mock("../../apis/Api");
jest.mock("react-hot-toast");

describe("Login Component Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show error message on failed login", async () => {
    // Mocking the loginUserApi function
    const mockedData = {
      data: {
        success: false,
        message: "Invalid Password",
      },
    };
    loginUserApi.mockResolvedValue(mockedData);

    // Config that toast error message as a test function
    toast.error = jest.fn();

    // Render the Login component
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Finding email, password, login button
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    // Simulating user input and interaction
    fireEvent.change(email, { target: { value: "user@gmail.com" } });
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.click(loginButton);

    // Using waitFor to handle asynchronous operations
    await waitFor(() => {
      // Testing the toast error message
      expect(loginUserApi).toHaveBeenCalledWith({
        email: "user@gmail.com",
        password: "password",
      });
      expect(toast.error).toHaveBeenCalledWith('Invalid Password');
    });
  });
});
