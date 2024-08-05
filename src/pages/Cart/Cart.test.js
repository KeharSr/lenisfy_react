// src/pages/cart/Cart.test.js
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import { getCartApi, updateCartItemApi, getCurrentUserApi } from "../../apis/Api";
import cartMockData from "../../__mock__/cartMockData";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-hot-toast";

// Mock the API
jest.mock("../../apis/Api");

// Mock toast
jest.mock("react-hot-toast", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("Cart Component Test", () => {
  beforeEach(() => {
    getCurrentUserApi.mockResolvedValue({
      data: {
        user: {
          name: "Test User"
        }
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display cart items if API call is successful", async () => {
    getCartApi.mockResolvedValue({
      status: 200,
      data: cartMockData
    });

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

     waitFor(() => {
      cartMockData.products.forEach((item) => {
        expect(screen.getByText(item.productId.productName)).toBeInTheDocument();
        expect(screen.getByText(`Price: Rs. ${item.productId.productPrice.toFixed(2)}`)).toBeInTheDocument();
        expect(screen.getByText(`Rs. ${(item.productId.productPrice * item.quantity).toFixed(2)}`)).toBeInTheDocument();
      });
    });
  });

  it("should handle quantity change", async () => {
    getCartApi.mockResolvedValue({
      status: 200,
      data: cartMockData
    });

    updateCartItemApi.mockResolvedValue({
      status: 200,
      data: {
        success: true
      }
    });

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

     waitFor(() => {
      const increaseButton = screen.getAllByRole('button', { name: /plus/i })[0];
      fireEvent.click(increaseButton);
      expect(updateCartItemApi).toHaveBeenCalled();
    });
  });
});
