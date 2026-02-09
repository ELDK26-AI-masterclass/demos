import asyncio

from agent_framework import MCPStreamableHTTPTool
from agent_framework.azure import AzureOpenAIChatClient
from azure.identity import AzureCliCredential

"""
Azure OpenAI Chat Client - MCP Tools on Agent Level

This sample demonstrates how to connect an agent to a remote MCP (Model Context Protocol) server.
MCP servers expose tools that agents can use to access external data and services.
In this example, the agent connects to Microsoft Learn's MCP server to answer documentation questions.

The MCP tool is defined at the agent level, meaning the agent can use it for all queries.
"""


async def main() -> None:
    """Example showing MCP tools defined when creating the agent."""
    print("=== Module 7.1: MCP Tools on Agent Level ===\n")

    # MCP tool is provided when creating the agent
    # The agent can use this tool for any query during its lifetime
    async with (
        MCPStreamableHTTPTool(
            name="Microsoft Learn MCP",
            url="https://learn.microsoft.com/api/mcp",
        ) as mcp_server,
    ):
        agent = AzureOpenAIChatClient(credential=AzureCliCredential()).as_agent(
            name="DocsAgent",
            instructions="You are a helpful assistant that answers questions using Microsoft documentation.",
            tools=[mcp_server],  # MCP tool defined at agent creation
        )

        query = "What is the current time in London?" #"How can I use Playwright for AI-enabled software testing?"
        print(f"User: {query}\n")
        print(f"{agent.name}: ", end="", flush=True)
        async for update in agent.run_stream(query):
            if update.text:
                print(update.text, end="", flush=True)
        print("\n")


if __name__ == "__main__":
    asyncio.run(main())