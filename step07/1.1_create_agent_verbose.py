import asyncio

from agent_framework.azure import AzureOpenAIChatClient
from azure.identity import AzureCliCredential

"""
Azure OpenAI Chat Client Basic Example

This sample demonstrates basic usage of AzureOpenAIChatClient for a simple
prompt and response interaction.
"""


async def main() -> None:
    """Example of a simple prompt and response."""
    print("=== Module 1.1: Creating an Azure OpenAI Chat Agent (verbose) ===\n")

    # Create agent with Azure Chat Client
    # For authentication, run `az login` command in terminal
    credential = AzureCliCredential()
    client = AzureOpenAIChatClient(credential=credential)
    agent = client.as_agent(
        instructions="You are a helpful assistant.",
    )

    query = "What does the T in t-shirt stand for?"
    print(f"User: {query}\n")
    result = await agent.run(query)
    print(f"Agent: {result}\n")


if __name__ == "__main__":
    asyncio.run(main())