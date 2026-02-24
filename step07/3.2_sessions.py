import asyncio

from agent_framework import Agent
from agent_framework.azure import AzureOpenAIChatClient
from azure.identity import AzureCliCredential

"""
Azure OpenAI Chat Client - Sessions Example

This sample demonstrates multi-turn conversation using sessions.
The conversation history is persisted, allowing the agent to remember context.
"""


async def main() -> None:
    """Example of multi-turn conversation with session context."""
    print("=== Module 3.2: Conversation with Sessions ===")

    # Create agent with Azure Chat Client
    # For authentication, run `az login` command in terminal
    agent = Agent(
        client=AzureOpenAIChatClient(credential=AzureCliCredential()),
        instructions="You are a creative marketing copywriter. Write concise, catchy slogans.",
    )

    # Create a new session to store conversation history
    session = agent.create_session()

    query = "Write a marketing slogan for a new collection of basic t-shirts."
    print(f"User: {query}\n")
    print("Agent: ", end="", flush=True)
    response = agent.run(query, session=session, stream=True)
    async for update in response:
        if update.text:
            print(update.text, end="", flush=True)
    await response.get_final_response()  # Finalize to persist session history

    # Get user's feedback - the agent will remember the previous slogan
    user_message = input("\n\nYour feedback: ")
    print("\nAgent: ", end="", flush=True)
    response = agent.run(user_message, session=session, stream=True)
    async for update in response:
        if update.text:
            print(update.text, end="", flush=True)
    await response.get_final_response()  # Finalize to persist session history
    print("\n")


if __name__ == "__main__":
    asyncio.run(main())