import asyncio
from typing import Annotated

from agent_framework import tool
from agent_framework.azure import AzureOpenAIChatClient
from azure.identity import AzureCliCredential
from pydantic import Field

"""
Azure OpenAI Chat Client - Tools in a Class Example

This sample demonstrates how to organize multiple tools in a class.
This is useful when tools need to share state or when you have many related tools.
"""


class ProductTools:
    """A class containing product-related tools."""
    
    def __init__(self):
        # Mock product database
        self.products = {
            "TSH-001": {"name": "Basic White T-Shirt", "price": 19.99, "stock": 150},
            "TSH-002": {"name": "Premium Black T-Shirt", "price": 29.99, "stock": 75},
            "TSH-003": {"name": "V-Neck Gray T-Shirt", "price": 24.99, "stock": 0},
            "TSH-004": {"name": "Organic Cotton T-Shirt", "price": 34.99, "stock": 42},
        }

    @tool(approval_mode="never_require")
    def get_product_price(
        self,
        product_id: Annotated[str, Field(description="The product ID to look up (e.g., TSH-001)")],
    ) -> str:
        """Look up the price for a product by its ID."""
        if product_id in self.products:
            product = self.products[product_id]
            return f"Product {product_id}: {product['name']} - ${product['price']:.2f}"
        return f"Product {product_id} not found."

    @tool(approval_mode="never_require")
    def check_stock(
        self,
        product_id: Annotated[str, Field(description="The product ID to check stock for")],
    ) -> str:
        """Check the stock availability for a product."""
        if product_id in self.products:
            product = self.products[product_id]
            if product['stock'] > 0:
                return f"Product {product_id} ({product['name']}): {product['stock']} units in stock"
            return f"Product {product_id} ({product['name']}): OUT OF STOCK"
        return f"Product {product_id} not found."


async def main() -> None:
    """Example of using tools organized in a class."""
    print("=== Module 5.2: Tools in a Class ===\n")

    # Create an instance of the tools class
    product_tools = ProductTools()

    # Create agent with Azure Chat Client and multiple tools from the class
    agent = AzureOpenAIChatClient(credential=AzureCliCredential()).as_agent(
        instructions="You are a helpful shopping assistant. Use the available tools to look up prices and check stock.",
        tools=[product_tools.get_product_price, product_tools.check_stock],
    )

    query = "What's the price of TSH-002 and is it in stock?"
    print(f"User: {query}\n")
    print("Agent: ", end="", flush=True)
    async for update in agent.run_stream(query):
        if update.text:
            print(update.text, end="", flush=True)
    print("\n")


if __name__ == "__main__":
    asyncio.run(main())