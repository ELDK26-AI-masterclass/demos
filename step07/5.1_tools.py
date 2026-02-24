import asyncio
from typing import Annotated

from agent_framework import tool
from agent_framework.azure import AzureOpenAIChatClient
from azure.identity import AzureCliCredential
from pydantic import Field

"""
Azure OpenAI Chat Client - Tools Example

This sample demonstrates how to give an agent access to custom tools (functions).
The agent can call these tools to retrieve information or perform actions.
"""

# Mock product database
PRODUCT_PRICES = {
    "TSH-001": {"name": "Basic White T-Shirt", "price": 19.99},
    "TSH-002": {"name": "Premium Black T-Shirt", "price": 29.99},
    "TSH-003": {"name": "V-Neck Gray T-Shirt", "price": 24.99},
    "TSH-004": {"name": "Organic Cotton T-Shirt", "price": 34.99},
}


@tool(approval_mode="never_require")
def get_product_price(
    product_id: Annotated[str, Field(description="The product ID to look up (e.g., TSH-001)")],
) -> str:
    """Look up the price for a product by its ID."""
    if product_id in PRODUCT_PRICES:
        product = PRODUCT_PRICES[product_id]
        return f"Product {product_id}: {product['name']} - ${product['price']:.2f}"
    else:
        return f"Product {product_id} not found. Available products: {', '.join(PRODUCT_PRICES.keys())}"


async def main() -> None:
    """Example of using tools with an agent."""
    print("=== Module 5.1: Tools (Function Calling) ===\n")

    # Create agent with Azure Chat Client and a tool
    # For authentication, run `az login` command in terminal
    agent = AzureOpenAIChatClient(credential=AzureCliCredential()).as_agent(
        instructions="You are a helpful shopping assistant. Use the get_product_price tool to look up prices when asked.",
        tools=[get_product_price],
    )

    query = "What is the price of product TSH-001 and TSH-003?"
    print(f"User: {query}\n")
    print("Agent: ", end="", flush=True)
    async for update in agent.run(query, stream=True):
        if update.text:
            print(update.text, end="", flush=True)
    print("\n")


if __name__ == "__main__":
    asyncio.run(main())