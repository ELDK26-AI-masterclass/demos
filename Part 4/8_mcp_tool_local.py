import asyncio

from agent_framework import MCPStdioTool
from agent_framework.azure import AzureOpenAIChatClient
from azure.identity import AzureCliCredential

"""
Azure OpenAI Chat Client - Local MCP Server via Stdio

This sample demonstrates how to connect an agent to a LOCAL MCP server that runs as a subprocess.
Unlike the HTTP-based MCP tools in Module 7, this uses stdio (standard input/output) to communicate
with a locally running MCP server process.

In this example, we use the Playwright MCP server to automate web browsing tasks.
"""


async def main() -> None:
    """Example showing a local MCP server connected via stdio."""
    print("=== Module 8: Local MCP Server (Stdio) ===\n")

    # MCPStdioTool launches a local process and communicates via stdin/stdout
    async with (
        MCPStdioTool(
            name="Playwright MCP",
            description="Tool to interact with web pages using Playwright MCP server.",
            command="npx",
            args=["@playwright/mcp@latest", "--browser", "msedge"],
            load_prompts=False,  # Playwright MCP doesn't support prompts
        ) as mcp_server,
    ):
        agent = AzureOpenAIChatClient(credential=AzureCliCredential()).as_agent(
            name="BrowserAgent",
            instructions="You are a helpful assistant that can browse the web using Playwright.",
            tools=[mcp_server],
        )

        query = "Open a search engine. Look for three examples of t-shirts in different colors. Provide the links."
        print(f"User: {query}\n")
        print(f"{agent.name}: ", end="", flush=True)
        async for update in agent.run_stream(query):
            if update.text:
                print(update.text, end="", flush=True)
        print("\n")


if __name__ == "__main__":
    asyncio.run(main())