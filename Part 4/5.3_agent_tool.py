import asyncio
from typing import Annotated

from agent_framework import tool
from agent_framework.azure import AzureOpenAIChatClient
from azure.identity import AzureCliCredential
from pydantic import Field

"""
Azure OpenAI Chat Client - Agent as Tool Example

This sample demonstrates how to use one agent as a tool for another agent.
This enables multi-agent collaboration where specialized agents handle specific tasks.
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
    """Example of using an agent as a tool for another agent."""
    print("=== Module 5.3: Agent as Tool ===\n")

    # Create a specialized pricing agent with product lookup tool
    pricing_agent = AzureOpenAIChatClient(credential=AzureCliCredential()).as_agent(
        name="PricingAgent",
        instructions="You are a pricing specialist. Look up product prices when asked.",
        description="An agent that looks up product prices from the catalog.",
        tools=[get_product_price],
    )

    # Create a main agent that uses the pricing agent as a tool
    main_agent = AzureOpenAIChatClient(credential=AzureCliCredential()).as_agent(
        instructions="You are a helpful shopping assistant. Always use the PricingAgent tool to look up product prices. Available product IDs are: TSH-001, TSH-002, TSH-003, TSH-004.",
        tools=[pricing_agent.as_tool()],
    )

    query = "What is the price of product TSH-002?"
    print(f"User: {query}\n")
    print("Agent: ", end="", flush=True)
    async for update in main_agent.run_stream(query):
        if update.text:
            print(update.text, end="", flush=True)
    print("\n")


if __name__ == "__main__":
    asyncio.run(main())