export async function GET() {
  const robotsTxt = `# AI-readable site overview: https://connectingdotserp.com/llms.txt
# Block known AI model-training crawlers; AI search crawlers follow the general policy below.
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: *

Disallow: /terms
Disallow: /privacy
Disallow: /919004002941
Disallow: /wa.me/919004002941
Disallow: /tel:9004008253
Sitemap: https://connectingdotserp.com/sitemap.xml`;

  return new Response(robotsTxt, {
      headers: {
          "Content-Type": "text/plain",
      },
  });
}
