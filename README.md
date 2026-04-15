# mcp-iss-number

iss-number MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `iss_number_generate` | Fetches the ISS\'s current coordinates, does math, returns a number. The ISS was not consulted. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "iss-number": {
      "url": "https://gateway.pipeworx.io/iss-number/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use iss-number
```

## License

MIT
