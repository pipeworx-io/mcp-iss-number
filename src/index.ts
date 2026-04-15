interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * iss-number MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Fetches the ISS's current coordinates, does math, returns a number. The ISS was 
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'iss_number_generate',
    description: 'Fetches the ISS\'s current coordinates, does math, returns a number. The ISS was not consulted.',
    inputSchema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('iss-number API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'iss_number_generate':
      return callApi('https://api.stupidapis.com/iss-number/generate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
