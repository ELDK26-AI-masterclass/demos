import asyncio

from agent_framework.azure import AzureOpenAIChatClient
from azure.identity import AzureCliCredential

"""
Azure OpenAI Chat Client - Threads Example

This sample demonstrates multi-turn conversation using threads.
The conversation history is persisted, allowing the agent to remember context.
"""


async def main() -> None:
    """Example of multi-turn conversation with thread context."""
    print("=== Module 3.2: Conversation with Threads ===\n")

    # Create agent with Azure Chat Client
    # For authentication, run `az login` command in terminal
    agent = AzureOpenAIChatClient(credential=AzureCliCredential()).as_agent(
        instructions="You are a creative marketing copywriter. Write concise, catchy slogans.",
    )

    # Create a new thread to store conversation history
    thread = agent.get_new_thread()

    query = "Write a marketing slogan for a new collection of basic t-shirts."
    print(f"User: {query}\n")
    print("Agent: ", end="", flush=True)
    async for update in agent.run_stream(query, thread=thread):
        if update.text:
            print(update.text, end="", flush=True)

    # Get user's feedback - the agent will remember the previous slogan
    user_message = input("\n\nYour feedback: ")
    print("\nAgent: ", end="", flush=True)
    async for update in agent.run_stream(user_message, thread=thread):
        if update.text:
            print(update.text, end="", flush=True)
    print("\n")


if __name__ == "__main__":
    asyncio.run(main())