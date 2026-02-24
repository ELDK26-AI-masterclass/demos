# Part 4: Building Agents with Microsoft Agent Framework

Microsoft Agent Framework is a powerful SDK for building AI agents that can connect to a wide variety of AI providers, including Azure OpenAI, OpenAI, GitHub Copilot, Anthropic Claude, Ollama, and more. In this workshop, we'll use the **OpenAI Chat Completion API** hosted in **Microsoft Foundry** to power our agents.

## Prerequisites

Before you begin, ensure you have the following prerequisites:

### Microsoft Foundry Resource

You'll need a Microsoft Foundry resource with a deployed model. Follow the [Quickstart: Create Foundry resources](https://learn.microsoft.com/en-us/azure/ai-foundry/tutorials/quickstart-create-foundry-resources?view=foundry&tabs=portal) tutorial to set up:

- A Microsoft Foundry resource
- A project
- A deployed model (e.g., `gpt-4.1`)

### Development Environment

- [Python 3.10 or later](https://www.python.org/downloads/)
- [Azure CLI installed](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) and [authenticated](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli)

### Python Dependencies

Install the required packages from the repository root:

```bash
pip install -r requirements.txt
```

### Azure Permissions

Your user account must have one of the following roles assigned for the Azure OpenAI resource:
- **Cognitive Services OpenAI User** - for read-only access
- **Cognitive Services OpenAI Contributor** - for full access

See [Role-based access control for Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/role-based-access-control) for more details.

### Environment Configuration

1. Copy `.env.example` to `.env` in the repository root
2. Update the values with your Microsoft Foundry endpoint and deployment name:

```dotenv
AZURE_OPENAI_ENDPOINT="https://<your-foundry-resource>.cognitiveservices.azure.com/"
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME="gpt-4.1"
```

---

## Module 1: Creating Your First Agent

In this module, you'll learn how to create a simple agent using Microsoft Agent Framework and authenticate with Azure OpenAI.

### Understanding the Components

The Agent Framework uses a **Chat Client** to communicate with an AI model. For Azure OpenAI, we use `AzureOpenAIChatClient`, which handles:

- **Authentication** - Uses Azure credentials to securely access your deployed model
- **API Communication** - Manages the HTTP requests to the Azure OpenAI service
- **Response Handling** - Parses and returns the model's responses

### Authentication with Azure CLI

The samples in this workshop use `AzureCliCredential` for authentication. This means you authenticate once via the Azure CLI, and the SDK automatically uses those credentials.

To authenticate:

```bash
az login
```

This opens a browser window where you sign in with your Azure account. Once authenticated, the SDK will use these credentials automatically.

### Sample: 1.1_create_agent_verbose.py

This sample demonstrates the simplest possible agent - a basic prompt and response interaction. It uses a verbose style that explicitly shows each step of creating an agent.

**Key concepts:**
1. **Load environment variables** - The `.env` file contains your endpoint and deployment name
2. **Create credentials** - `AzureCliCredential()` uses your Azure CLI login
3. **Create a chat client** - `AzureOpenAIChatClient` connects to your Azure OpenAI deployment
4. **Create an agent** - The `.as_agent()` method wraps the client with agent capabilities
5. **Run the agent** - Send a prompt and receive a response

**Run the sample:**

```bash
python 1.1_create_agent_verbose.py
```

### Sample: 1.2_create_agent_compact.py

This sample does exactly the same thing as 1.1, but uses a more compact, fluent coding style that chains the calls together. This is the style you'll see most often in real-world code.

**Run the sample:**

```bash
python 1.2_create_agent_compact.py
```

**Expected output (both samples):**

```
=== Module 1.x: Creating an Azure OpenAI Chat Agent ===

User: What does the T in t-shirt stand for?

Agent: The "T" in t-shirt refers to the shape of the garment...
```

### Hands-on Exercise

1. Run the sample as-is to verify your setup works
2. Modify the `instructions` parameter to give the agent a different personality (e.g., "You are a pirate who speaks in nautical terms")
3. Change the `query` to ask a different question
4. Observe how the agent's response changes based on the instructions

### Using Other AI Providers

This workshop uses Azure OpenAI, but Microsoft Agent Framework supports many other providers including:

- OpenAI (direct)
- GitHub Copilot
- Anthropic Claude
- Ollama (local models)

If you're using a different AI provider, you can find samples at:
https://github.com/microsoft/agent-framework/tree/main/python/samples/getting_started/agents

---

## Module 2: Streaming Responses

In Module 1, we received the complete response at once after the agent finished processing. In this module, you'll learn how to stream responses - receiving text as it's generated, which provides a more responsive user experience.

### Why Streaming?

- **Better UX** - Users see text appearing immediately rather than waiting for the full response
- **Faster perceived performance** - The first token arrives quickly even for long responses
- **Real-time feedback** - Users can see the agent "thinking" and can cancel if needed

### Sample: 2_streaming.py

This sample demonstrates streaming with the `run(..., stream=True)` method.

**Key concepts:**
1. **`run(..., stream=True)`** - Returns an async iterator that yields updates as they arrive
2. **Checking for text** - Each update may or may not contain text content
3. **Flush output** - Use `flush=True` to ensure text appears immediately
4. **Model parameters** - Control output with `max_tokens` and `temperature`

**Run the sample:**

```bash
python 2_streaming.py
```

**Expected output:**

```
=== Module 2: Streaming Responses ===

User: Write a creative marketing text for a new collection of Hawaiian shirts...

Agent: [Text streams in real-time, word by word...]
```

### Hands-on Exercise

1. Run the sample and observe how the text streams in progressively
2. Experiment with `max_tokens`:
   - Try `max_tokens=100` for a shorter response
   - Try `max_tokens=1000` for a longer response
3. Experiment with `temperature`:
   - Try `temperature=0.0` for more deterministic, focused output
   - Try `temperature=1.0` for more creative, varied output
4. Run the same prompt multiple times with different temperature values and compare the results

---

## Module 3: Multi-Turn Conversations

In the previous modules, each interaction was standalone - the agent didn't remember previous exchanges. In this module, you'll learn how to create multi-turn conversations where the agent maintains context.

### The Problem: No Memory

Sample 3.1 demonstrates what happens without conversation context. The agent writes a marketing slogan, but when you provide feedback, it has no memory of what slogan it created. Try saying "translate it to Danish" - the agent won't know what you're referring to.

### Sample: 3.1_human_reply.py

This sample shows a simple back-and-forth but **without** conversation history.

**Run the sample:**

```bash
python 3.1_human_reply.py
```

**Try this:** After the agent creates a slogan, type "translate it to Danish" - notice the agent doesn't remember what slogan it created.

### The Solution: Sessions

Sample 3.2 introduces **sessions** - a way to persist conversation history so the agent remembers the context.

**Key concepts:**
1. **`create_session()`** - Creates a new session to store conversation history
2. **`session=session`** - Pass the session to each `run()` call
3. **Conversation persistence** - The session automatically tracks the exchange history

### Sample: 3.2_sessions.py

This sample demonstrates multi-turn conversation **with** session context.

**Run the sample:**

```bash
python 3.2_sessions.py
```

**Try this:** After the agent creates a slogan, type "translate it to Danish" - now the agent remembers the original slogan and can refine it!

### Hands-on Exercise

1. Run sample 3.1 and provide feedback like "translate it to Danish" - observe that it doesn't remember the slogan
2. Run sample 3.2 and provide the same feedback - observe that it now remembers and refines the slogan thanks to sessions

---

## Module 4: Image Input

Modern AI models can understand images as well as text. In this module, you'll learn how to include images in your prompts, enabling the agent to analyze visual content and generate descriptions based on what it sees.

### Use Cases for Image Input

- **Product descriptions** - Generate marketing copy based on product photos
- **Content moderation** - Analyze images for appropriate content
- **Accessibility** - Generate alt text for images
- **Visual Q&A** - Answer questions about images

### Sample: 4_image_input.py

This sample demonstrates how to send an image URL along with a text prompt to generate a product description.

**Key concepts:**
1. **`Message`** - Create a message with multiple content types
2. **`Content.from_text()`** - Add text content to the message
3. **`Content.from_uri()`** - Add an image by URL with its media type
4. **`role="user"`** - Specify this is a user message

**Run the sample:**

```bash
python 4_image_input.py
```

**Expected output:**

```
=== Module 4: Image Input ===

User: Write a product description for this t-shirt for an online store.

[Image: White t-shirt]

Agent: **Classic White Crewneck T-Shirt**

Refresh your essentials with our Classic White Crewneck T-Shirt...
```

### Hands-on Exercise

1. Run the sample and observe how the agent describes the t-shirt image
2. Change the prompt to ask for different content (e.g., "Write a social media post about this t-shirt")
3. Try a different image URL - find an image online and update the `uri` parameter

---

## Module 5: Tools (Function Calling)

So far, our agents can only respond based on their training data. But what if you need the agent to access real-time data, query a database, or perform actions? This is where **tools** come in.

### What Are Tools?

Tools are Python functions that the agent can call to:
- **Retrieve data** - Look up prices, inventory, user information
- **Perform actions** - Send emails, create records, trigger workflows
- **Access external systems** - APIs, databases, file systems

The agent decides when to call a tool based on the user's request, executes the function, and incorporates the result into its response.

### Sample: 5.1_tools.py

This sample demonstrates a simple product price lookup tool.

**Key concepts:**
1. **`@tool` decorator** - Marks a function as available to the agent
2. **Type annotations** - Tell the agent what parameters the function expects
3. **`Field(description=...)`** - Help the agent understand when to use the tool
4. **`tools=[...]`** - Pass the tools when creating the agent

**Run the sample:**

```bash
python 5.1_tools.py
```

**Expected output:**

```
=== Module 5.1: Tools (Function Calling) ===

User: What is the price of product TSH-001 and TSH-003?

Agent: Here are the prices for the requested products:

- Product TSH-001 (Basic White T-Shirt): $19.99
- Product TSH-003 (V-Neck Gray T-Shirt): $24.99
```

### Sample: 5.2_tools_class.py

When you have multiple related tools, it's useful to organize them in a class. This sample shows how to create a `ProductTools` class with multiple methods.

**Key concepts:**
1. **Class-based organization** - Group related tools together
2. **Shared state** - Tools in a class can share data (e.g., a product database)
3. **Multiple tools** - Pass multiple tool methods to the agent

**Run the sample:**

```bash
python 5.2_tools_class.py
```

**Expected output:**

```
=== Module 5.2: Tools in a Class ===

User: What's the price of TSH-002 and is it in stock?

Agent: The Premium Black T-Shirt (TSH-002) is priced at $29.99 and there are 75 units currently in stock.
```

### How It Works

1. User asks about product prices and stock
2. Agent recognizes it needs data and calls the appropriate tools
3. The functions return the requested information
4. Agent incorporates the data into a natural language response

### Sample: 5.3_agent_tool.py

The Agent Framework supports **multi-agent collaboration** by allowing you to use one agent as a tool for another. This is powerful for creating specialized agents that handle specific domains.

**Key concepts:**
1. **Specialized agents** - Create agents focused on specific tasks (e.g., pricing, inventory, recommendations)
2. **`name` and `description`** - Help the main agent understand what the sub-agent does
3. **`as_tool()`** - Converts an agent into a tool that another agent can call
4. **Delegation** - The main agent decides when to delegate to specialized agents

**Run the sample:**

```bash
python 5.3_agent_tool.py
```

**Expected output:**

```
=== Module 5.3: Agent as Tool ===

User: What is the price of product TSH-002?

Agent: The price of product TSH-002 (Premium Black T-Shirt) is $29.99.
```

### How Agent-as-Tool Works

1. **PricingAgent** is created with the `get_product_price` tool and specialized instructions
2. **PricingAgent** is converted to a tool using `.as_tool()`
3. **Main Agent** receives the user query and decides to delegate to PricingAgent
4. **PricingAgent** executes, using its tool to look up the price
5. **Main Agent** receives the result and formats the final response

### Hands-on Exercise

1. Run sample 5.1 and ask for a product that doesn't exist (e.g., "What is the price of TSH-999?")
2. Run sample 5.2 and ask about stock for TSH-003 (which is out of stock)
3. In sample 5.3, try modifying the query to ask about multiple products
4. Add a new tool to the `ProductTools` class (e.g., `get_product_description()`)

---

## Module 6: DevUI - Visualizing Agent Interactions

When developing and debugging agents, it's helpful to see exactly what's happening under the hood. **DevUI** provides a web-based interface that visualizes agent interactions, tool calls, and message flows in real-time.

### Why DevUI?

- **Debug tool calls** - See which tools the agent calls and what parameters it passes
- **Inspect events** - View the full event stream of agent interactions
- **Multi-agent visibility** - Observe how agents delegate to each other
- **Interactive testing** - Chat with your agents through a web interface

### Sample: 6_devui.py

This sample launches a DevUI server with two agents: a main ShoppingAssistant and a specialized PricingAgent.

**Key concepts:**
1. **`serve()`** - Launches the DevUI web server
2. **`entities=[...]`** - Register agents to be available in DevUI
3. **Named agents** - Use `name=` to identify agents in the UI
4. **Multi-agent setup** - Observe delegation between agents

**Run the sample:**

```bash
python 6_devui.py
```

Then open http://127.0.0.1:8080 in your browser.

To stop the server, press `Ctrl+C` in the terminal.

### Using DevUI

1. **Select an agent** - Choose "ShoppingAssistant" or "PricingAgent" from the dropdown
2. **Chat interface** - Type your questions in the input box
3. **Events panel** - See the real-time event stream on the right
4. **Tools panel** - Observe which tools are called and their results

### Hands-on Exercise

1. Start the DevUI server and open http://127.0.0.1:8080
2. Select "ShoppingAssistant" and ask: "What's the stock of TSH-003?"
3. Observe the **Events** and **Tools** panels on the right to see:
   - The ShoppingAssistant delegating to PricingAgent
   - PricingAgent calling the `check_stock` tool
   - The tool returning "OUT OF STOCK"
   - The response flowing back through the agents
4. Try asking about multiple products and watch the tool calls in real-time
5. Stop the server by pressing `Ctrl+C` in the terminal.

---

## Module 7: MCP (Model Context Protocol) Tools

The **Model Context Protocol (MCP)** is an open standard that allows AI agents to connect to external tools and data sources. Instead of defining tools as Python functions, you can connect to remote MCP servers that expose tools over HTTP.

### Why MCP?

- **Standardized protocol** - MCP is an open standard supported by many AI platforms
- **Remote tools** - Connect to tools hosted anywhere on the internet
- **Pre-built servers** - Use existing MCP servers (like Microsoft Learn) without writing tool code
- **Separation of concerns** - Tool implementation is decoupled from agent logic

### Sample: 7.1_mcp_tool_agent.py

This sample connects to Microsoft Learn's MCP server to answer documentation questions. The MCP tool is defined at the **agent level**.

**Key concepts:**
1. **`MCPStreamableHTTPTool`** - Connects to an MCP server over HTTP
2. **`url`** - The endpoint of the MCP server
3. **`async with`** - MCP tools require context manager for connection lifecycle
4. **Agent-level tools** - Tools defined when creating the agent are available for all queries

**Run the sample:**

```bash
python 7.1_mcp_tool_agent.py
```

### Sample: 7.2_mcp_tool_run.py

This sample shows an alternative approach where MCP tools are provided at **run time** instead of agent creation.

**Key concepts:**
1. **Run-level tools** - Pass tools to `run()` instead of at agent creation
2. **Flexibility** - Different queries can use different tools
3. **Dynamic tool selection** - Decide which tools to use based on the query

**Run the sample:**

```bash
python 7.2_mcp_tool_run.py
```

### Agent-Level vs Run-Level Tools

| Aspect | Agent-Level (7.1) | Run-Level (7.2) |
|--------|-------------------|-----------------|
| Definition | `Agent(tools=[...])` | `run(tools=[...])` |
| Availability | All queries | Specific query only |
| Use case | Tools always needed | Conditional tool use |

### Hands-on Exercise

1. Run sample 7.1 and observe how the agent uses Microsoft Learn to answer questions
2. Run sample 7.2 and compare the behavior - the result should be similar
3. Try asking a question that's NOT in Microsoft documentation and see how the agent responds

---

## Module 8: Local MCP Servers (Stdio)

In Module 7, we connected to remote MCP servers over HTTP. But MCP servers can also run **locally** as subprocesses, communicating via stdin/stdout (stdio). This is useful for tools that need to run on your machine, like browser automation.

### HTTP vs Stdio MCP

| Aspect | HTTP (Module 7) | Stdio (Module 8) |
|--------|-----------------|------------------|
| Location | Remote server | Local subprocess |
| Connection | `MCPStreamableHTTPTool` | `MCPStdioTool` |
| Use case | Cloud services, APIs | Local tools, browsers |
| Example | Microsoft Learn | Playwright |

### Sample: 8_mcp_tool_local.py

This sample uses the **Playwright MCP server** to automate web browsing. The agent can navigate to websites, interact with pages, and extract information.

**Prerequisites:**
- Node.js installed (for `npx`)
- Microsoft Edge browser

**Key concepts:**
1. **`MCPStdioTool`** - Launches a local MCP server as a subprocess
2. **`command`** - The executable to run (e.g., `npx`)
3. **`args`** - Command-line arguments for the MCP server
4. **Browser automation** - The agent can browse the web and extract information

**Run the sample:**

```bash
python 8_mcp_tool_local.py
```

**Expected behavior:**
1. The Playwright MCP server starts as a subprocess
2. Microsoft Edge opens (controlled by Playwright)
3. The agent opens a search engine
4. The agent searches for t-shirts in different colors
5. The agent provides links to the results
6. The browser closes when done

### Hands-on Exercise

1. Run the sample and watch Edge open and navigate automatically
2. Try different queries like "Go to wikipedia.org and summarize the article of the day"

---

## Final Exercise: AI-Powered Testing of Your Application

Now it's time to bring everything together! In this exercise, you'll use the Playwright MCP agent to test a web application.

### Instructions

1. **Start your web application** in a separate terminal and note the URL where it's running (typically `http://localhost:5000` or similar).

2. **Modify sample 8** to test your application. Update the query to something like:

   ```python
   query = """
   Go to http://localhost:5000. 
   Perform the following tests and provide a report:
   1. Check if the homepage loads correctly
   2. Verify that the main heading is visible
   3. Test the navigation links - do they work?
   4. Fill out any forms on the page and submit them
   5. Check for any error messages or broken elements
   
   Provide a summary report with:
   - Tests passed
   - Tests failed
   - Any issues or recommendations
   """
   ```

3. **Run the test agent:**
   ```bash
   python 8_mcp_tool_local.py
   ```

4. **Watch the AI tester in action** - observe how the agent:
   - Navigates to your application
   - Interacts with UI elements
   - Validates functionality
   - Generates a test report

### What You've Learned

Congratulations! You've completed the workshop and learned how to:

- ✅ Create AI agents with Microsoft Agent Framework
- ✅ Stream responses for better user experience
- ✅ Maintain conversation context with sessions
- ✅ Process images as input
- ✅ Extend agents with custom tools
- ✅ Use agents as tools for multi-agent collaboration
- ✅ Visualize agent behavior with DevUI
- ✅ Connect to remote MCP servers (Microsoft Learn)
- ✅ Use local MCP servers for browser automation (Playwright)
- ✅ Perform AI-powered testing of web applications
