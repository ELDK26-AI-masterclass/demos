import asyncio

from agent_framework.azure import AzureOpenAIChatClient
from azure.identity import AzureCliCredential

"""
Azure OpenAI Chat Client Streaming Example

This sample demonstrates usage of AzureOpenAIChatClient for streaming responses,
where results are received as they are generated.
"""


async def main() -> None:
    """Example of streaming response (get results as they are generated)."""
    print("=== Module 2: Streaming Responses ===\n")

    # Create agent with Azure Chat Client
    # For authentication, run `az login` command in terminal
    agent = AzureOpenAIChatClient(credential=AzureCliCredential()).as_agent(
        instructions="You are excellent at writing creative marketing texts and product descriptions.",
    )

    query = "Write a creative marketing text for a new collection of Hawaiian shirts made of ecological cotton in Contoso's new factory in Portugal."
    print(f"User: {query}\n")
    print("Agent: ", end="", flush=True)
    async for update in agent.run_stream(
        query,
        max_tokens=500,
        temperature=0.7
    ):
        if update.text:
            print(update.text, end="", flush=True)
    print("\n")


if __name__ == "__main__":
    asyncio.run(main())