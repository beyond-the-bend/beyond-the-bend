import pandas as pd
import json

# Load the accounting data
df = pd.read_csv("C:/BTB/Financial_Sanctuary/01_Monthly_Exports/Extracted_Wave_Data/accounting.csv")

# Only keep primary transaction lines (ignore the balanced pairs for simple summary)
# Actually, the double entry means every dollar is counted twice. 
# We'll filter by Account Type to segment them correctly.

income_rows = df[df['Account Type'] == 'Income']
expense_rows = df[df['Account Type'] == 'Expense']

total_income = income_rows['Amount (One column)'].sum()
total_expenses = expense_rows['Amount (One column)'].sum()
net_profit = total_income - total_expenses

# Top Expense Categories
top_expenses = expense_rows.groupby('Account Name')['Amount (One column)'].sum().sort_values(ascending=False).head(10)

# Monthly Revenue
income_rows['Transaction Date'] = pd.to_datetime(income_rows['Transaction Date'])
monthly_income = income_rows.resample('M', on='Transaction Date')['Amount (One column)'].sum()

print(f"Total Income: ${total_income:,.2f}")
print(f"Total Expenses: ${total_expenses:,.2f}")
print(f"Net Profit/Loss: ${net_profit:,.2f}")
print("\nTop 10 Expense Categories:")
print(top_expenses)
print("\nMonthly Income:")
print(monthly_income)
