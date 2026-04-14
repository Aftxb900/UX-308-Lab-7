let currentState = welcoming;

let order = {
  drink: null,
  size: null
};

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput(){
  currentState = welcoming;
  order = { drink: null, size: null };
}

// 🔹 WELCOME
function welcoming() {
  let aReturn = [];
  currentState = ordering;

  aReturn.push("Welcome to the coffee shop.");
  aReturn.push("What would you like to order?");

  return aReturn;
}

// 🔹 ORDERING DRINK
function ordering(sInput) {
  let aReturn = [];
  let input = sInput.toLowerCase();

  if (input.includes("latte") || input.includes("espresso") || input.includes("cappuccino")) {
    order.drink = input.includes("latte")
      ? "latte"
      : input.includes("espresso")
      ? "espresso"
      : "cappuccino";

    currentState = sizing;

    aReturn.push(`Great choice. What size would you like for your ${order.drink}?`);
    aReturn.push("Small, medium, or large?");
  } else {
    aReturn.push("We have latte, espresso, and cappuccino.");
    aReturn.push("What would you like?");
  }

  return aReturn;
}

// 🔹 SELECT SIZE
function sizing(sInput) {
  let aReturn = [];
  let input = sInput.toLowerCase();

  if (input.includes("small") || input.includes("medium") || input.includes("large")) {
    order.size = input.includes("small")
      ? "small"
      : input.includes("medium")
      ? "medium"
      : "large";

    currentState = confirming;

    aReturn.push(`Got it. A ${order.size} ${order.drink}.`);
    aReturn.push("Would you like anything else?");
  } else {
    aReturn.push("Please choose a size: small, medium, or large.");
  }

  return aReturn;
}

// 🔹 CONFIRMATION
function confirming(sInput) {
  let aReturn = [];
  let input = sInput.toLowerCase();

  if (input.startsWith("y")) {
    currentState = ordering;
    aReturn.push("Sure, what else would you like?");
  } else {
    currentState = done;

    aReturn.push("Your order has been placed.");
    aReturn.push("It will be ready shortly. Thank you.");
  }

  return aReturn;
}

// 🔹 DONE
function done() {
  return ["If you'd like to start a new order, refresh the chat."];
}