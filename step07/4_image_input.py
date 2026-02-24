import asyncio

from agent_framework import Agent, Content, Message
from agent_framework.azure import AzureOpenAIChatClient
from azure.identity import AzureCliCredential

"""
Azure OpenAI Chat Client - Image Input Example

This sample demonstrates how to include images in your prompts.
The agent can analyze images and generate content based on them.
"""


async def main() -> None:
    """Example of using image input with an agent."""
    print("=== Module 4: Image Input ===\n")

    # Create agent with Azure Chat Client
    # For authentication, run `az login` command in terminal
    agent = Agent(
        client=AzureOpenAIChatClient(credential=AzureCliCredential()),
        instructions="You are a creative marketing copywriter who writes compelling product descriptions.",
    )

    # Create a message with both text and an image
    message = Message(
        role="user",
        contents=[
            Content.from_text("Write a product description for this t-shirt for an online store."),
            Content.from_uri(
                uri="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
                media_type="image/jpeg"
            ),
        ]
    )

    print("User: Write a product description for this t-shirt for an online store.\n")
    print("[Image: White t-shirt]\n")
    print("Agent: ", end="", flush=True)
    async for update in agent.run(message, stream=True):
        if update.text:
            print(update.text, end="", flush=True)
    print("\n")


if __name__ == "__main__":
    asyncio.run(main())