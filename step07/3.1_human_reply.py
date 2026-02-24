import asyncio

from agent_framework import Agent
from agent_framework.azure import AzureOpenAIChatClient
from azure.identity import AzureCliCredential

"""
Azure OpenAI Chat Client - Human Reply Example

This sample demonstrates a simple back-and-forth interaction where the user
can respond to the agent. Note: There is no conversation history/context.
"""


async def main() -> None:
    """Example of human reply (no conversation context)."""
    print("=== Module 3.1: Human Reply (No Context) ===\n")

    # Create agent with Azure Chat Client
    # For authentication, run `az login` command in terminal
    agent = Agent(
        client=AzureOpenAIChatClient(credential=AzureCliCredential()),
        instructions="You are a creative marketing copywriter. Write concise, catchy slogans.",
    )

    query = "Write a marketing slogan for a new collection of basic t-shirts."
    print(f"User: {query}\n")
    print("Agent: ", end="", flush=True)
    async for update in agent.run(query, stream=True):
        if update.text:
            print(update.text, end="", flush=True)

    # Get user's feedback
    user_message = input("\n\nYour feedback: ")
    print("\nAgent: ", end="", flush=True)
    async for update in agent.run(user_message, stream=True):
        if update.text:
            print(update.text, end="", flush=True)
    print("\n")


if __name__ == "__main__":
    asyncio.run(main())