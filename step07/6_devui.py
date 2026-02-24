from typing import Annotated

from agent_framework import tool
from agent_framework.azure import AzureOpenAIChatClient
from agent_framework.devui import serve
from azure.identity import AzureCliCredential
from pydantic import Field

"""
Azure OpenAI Chat Client - DevUI Example

This sample demonstrates how to visualize agent interactions using DevUI.
DevUI provides a web-based interface to inspect agent behavior, tool calls, and responses.
"""

# Mock product database
PRODUCT_CATALOG = {
    "TSH-001": {"name": "Basic White T-Shirt", "price": 19.99, "stock": 150},
    "TSH-002": {"name": "Premium Black T-Shirt", "price": 29.99, "stock": 75},
    "TSH-003": {"name": "V-Neck Gray T-Shirt", "price": 24.99, "stock": 0},
    "TSH-004": {"name": "Organic Cotton T-Shirt", "price": 34.99, "stock": 42},
}


@tool(approval_mode="never_require")
def get_product_price(
    product_id: Annotated[str, Field(description="The product ID to look up (e.g., TSH-001)")],
) -> str:
    """Look up the price for a product by its ID."""
    if product_id in PRODUCT_CATALOG:
        product = PRODUCT_CATALOG[product_id]
        return f"Product {product_id}: {product['name']} - ${product['price']:.2f}"
    return f"Product {product_id} not found."


@tool(approval_mode="never_require")
def check_stock(
    product_id: Annotated[str, Field(description="The product ID to check stock for")],
) -> str:
    """Check the stock availability for a product."""
    if product_id in PRODUCT_CATALOG:
        product = PRODUCT_CATALOG[product_id]
        if product["stock"] > 0:
            return f"Product {product_id} ({product['name']}): {product['stock']} units in stock"
        return f"Product {product_id} ({product['name']}): OUT OF STOCK"
    return f"Product {product_id} not found."


# Create a specialized pricing agent
pricing_agent = AzureOpenAIChatClient(credential=AzureCliCredential()).as_agent(
    name="PricingAgent",
    instructions="You are a pricing specialist. Look up product prices and stock when asked.",
    description="An agent that looks up product prices and stock from the catalog.",
    tools=[get_product_price, check_stock],
)

# Create main shopping assistant that uses the pricing agent
main_agent = AzureOpenAIChatClient(credential=AzureCliCredential()).as_agent(
    name="ShoppingAssistant",
    instructions="You are a helpful shopping assistant. Use the PricingAgent to look up product information. Available product IDs are: TSH-001, TSH-002, TSH-003, TSH-004.",
    tools=[pricing_agent.as_tool()],
)

# Launch DevUI to visualize agent interactions
# Open http://localhost:5000 in your browser after running this script
serve(entities=[main_agent, pricing_agent])