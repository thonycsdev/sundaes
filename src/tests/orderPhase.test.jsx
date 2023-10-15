import { logRoles, render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("Order phases for happy path", async () => {
  const { container } = render(<App />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await userEvent.click(cherriesCheckbox);

  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await userEvent.click(orderSummaryButton);

  const orderSummary = await screen.findByRole("heading", {
    name: "Order Summary",
  });

  const scoopsSubTotal = await screen.findByRole("heading", {
    name: "Scoops: $6.00",
  });

  const toopingsSubTotal = await screen.findByRole("heading", {
    name: "Toppings: $1.50",
  });

  expect(orderSummary).toBeInTheDocument();
  expect(scoopsSubTotal).toBeInTheDocument();
  expect(toopingsSubTotal).toBeInTheDocument();

  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  const checkboxSummary = await screen.findByRole("checkbox");
  await userEvent.click(checkboxSummary);
  expect(checkboxSummary).toBeChecked();

  const buttonConfirmOrder = await screen.findByRole("button");
  expect(buttonConfirmOrder).toBeInTheDocument();
  await userEvent.click(buttonConfirmOrder);

  const thankYouHeader = await screen.findByRole("heading");
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  const createNewOrderButton = await screen.findByRole("button", {
    name: /create new order/i,
  });
  expect(createNewOrderButton).toBeInTheDocument();
  await userEvent.click(createNewOrderButton);

  const scoops = await screen.findByText("Scoops total: $0.00");
  const toppings = await screen.findByText("Toppings total: $0.00");

  expect(scoops).toBeInTheDocument();
  expect(toppings).toBeInTheDocument();
  logRoles(container);
});

test("Toppings header is not on summary page if no toppings ordered", async () => {});
