import React, { useState, useEffect } from "react";
import "./styles.css";

function getTransactionsFromLocalStorage() {
  // getting stored value
  const saved = localStorage.getItem("transactions");
  const initialValue = JSON.parse(saved) || [];
  // relabel the keys from 0 to length-1
  for (let i = 0; i < initialValue.length; i++) {
    initialValue[i]["key"] = i;
  }
  return initialValue || [];
}

function testing() {
  console.log("This is a test!");
}

export default function Transaction() {
  let [transactions, setTransactions] = useState(getTransactionsFromLocalStorage);
  let [numKeys, setNumKeys] = useState(() => transactions.length);
  let [displayMode, setDisplayMode] = useState("default");

  function add_transaction() {
    const itemId = document.getElementById("itemId").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

    let newTransaction = {
      key: numKeys,
      itemId,
      amount,
      category,
      date,
      description,
    };
    document.getElementById("itemId").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
    setNumKeys(numKeys + 1);
    setTransactions([newTransaction, ...transactions]);
  }

  function deleteTransaction(key) {
    console.log(key);
    const newTransaction = transactions.filter((x) => x["key"] !== key);
    setTransactions(newTransaction);
    setNumKeys(numKeys - 1);
  }

  useEffect(() => {
    // storing items if items change value
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 👇 Get input value
      add_transaction();
    }
  };

  const renderTransactions = () => {
    const summarizeTransactions = (keyExtractor) => {
      return transactions.reduce((acc, transaction) => {
        const key = keyExtractor(transaction);
        if (!acc[key]) {
          acc[key] = [transaction];
        } else {
          acc[key].push(transaction);
        }
        return acc;
      }, {});
    };

    const renderSummaryRows = (summary, labelPrefix) => {
      return Object.entries(summary).map(([key, transactions]) => (
        <React.Fragment key={key}>
          <tr>
            <td colSpan="6" style={{ fontWeight: "bold" }}>
              {labelPrefix}: {key}
            </td>
          </tr>
          {transactions.map((transaction) => (
            <tr key={transaction.key}>
              <td>
                <button onClick={() => deleteTransaction(transaction["key"])}>X</button>
              </td>
              <td>{transaction.itemId}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
            </tr>
          ))}
        </React.Fragment>
      ));
    };

    switch (displayMode) {
      case "date":
        return renderSummaryRows(summarizeTransactions((t) => t.date), "Date");
      case "month":
        return renderSummaryRows(summarizeTransactions((t) => t.date.slice(0, 7)), "Month");
      case "year":
        return renderSummaryRows(summarizeTransactions((t) => t.date.slice(0, 4)), "Year");
      case "category":
        return renderSummaryRows(summarizeTransactions((t) => t.category), "Category");
      default:
        return transactions.map((transaction) => (
          <tr key={transaction.key}>
            <td>
              <button onClick={() => deleteTransaction(transaction["key"])}>X</button>
            </td>
            <td>{transaction.itemId}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.category}</td>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
          </tr>
        ));
  }
};

return (
  <div className="App container">
  <h1 className="bg-warning text-center p-2">Transaction Tracker</h1>
  <h3>List of your Transactions</h3>
  <table className="transaction-table">
    <thead>
      <tr>
      <th>Delete</th>
      <th>ID</th>
      <th>Amount</th>
      <th>Category</th>
      <th>Date</th>
      <th>Description</th>
      </tr>
    </thead>
  <tbody>{renderTransactions()}</tbody>
  </table>
    <button onClick={() => setDisplayMode("date")}>Summarize by Date</button>
    <button onClick={() => setDisplayMode("month")}>Summarize by Month</button>
    <button onClick={() => setDisplayMode("year")}>Summarize by Year</button>
    <button onClick={() => setDisplayMode("category")}>Summarize by Category</button>
    <h2> Add new transaction item </h2>
    <input type="number" id="itemId" placeholder="Item ID" onKeyDown={handleKeyDown} />
    <input type="number" id="amount" placeholder="Amount" onKeyDown={handleKeyDown} />
    <input type="text" id="category" placeholder="Category" onKeyDown={handleKeyDown} />
    <input type="date" id="date" placeholder="Date" onKeyDown={handleKeyDown} />
    <input type="text" id="description" placeholder="Description" onKeyDown={handleKeyDown} />
    <button onClick={() => add_transaction()}>Add Transaction</button>
    </div>

);
}
