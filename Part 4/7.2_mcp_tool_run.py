import asyncio

from agent_framework import MCPStreamableHTTPTool
from agent_framework.azure import AzureOpenAIChatClient
from azure.identity import AzureCliCredential

"""
Azure OpenAI Chat Client - MCP Tools on Run Level

This sample demonstrates how to provide MCP tools at the run level instead of the agent level.
This is useful when you want to use different tools for different queries, or when tools
should only be available for specific interactions.

The MCP tool is passed to run() instead of being defined when creating the agent.
"""


async def main() -> None:
    """Example showing MCP tools defined when running the agent."""
    print("=== Module 7.2: MCP Tools on Run Level ===\n")

    # MCP tool is provided when running the agent (not at creation)
    async with (
        MCPStreamableHTTPTool(
            name="Microsoft Learn MCP",
            url="https://learn.microsoft.com/api/mcp",
        ) as mcp_server,
    ):
        # Create agent WITHOUT tools
        agent = AzureOpenAIChatClient(credential=AzureCliCredential()).as_agent(
            name="DocsAgent",
            instructions="You are a helpful assistant that answers questions using Microsoft documentation.",
        )

        query = "How can I use Playwright for AI-enabled software testing?"
        print(f"User: {query}\n")
        print(f"{agent.name}: ", end="", flush=True)
        # Pass MCP tool at run time
        async for update in agent.run(query, tools=[mcp_server], stream=True):
            if update.text:
                print(update.text, end="", flush=True)
        print("\n")


if __name__ == "__main__":
    asyncio.run(main())