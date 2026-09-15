"use strict";

function kitFiles(product, platform, edition) {
  const year = new Date().getFullYear();
  const compose = `# ${product.name} — ${edition} · v${product.version}
# Starter compose. Full images are pulled on first launch with a license.

services:
  app:
    image: registry.fodigits.com/${product.slug}:${product.version}
    restart: unless-stopped
    ports:
      - "8080:8080"
    env_file: .env
    volumes:
      - data:/var/lib/${product.slug}

volumes:
  data:
`;

  const env = `LICENSE_KEY=
APP_URL=http://localhost:8080
TZ=Africa/Johannesburg
`;

  const readme = `${product.name}
${"=".repeat(product.name.length)}

Version     ${product.version}
Edition     ${edition}
Platform    ${platform.label}
Released    ${product.released}

${product.description}

Install
-------
1. Copy .env.example to .env and set LICENSE_KEY.
2. docker compose up -d
3. Open http://localhost:8080

Requirements
------------
${product.requirements}

Runtime images are pulled on first launch.

© ${year} FoDigits. All rights reserved.
`;

  const license = `FoDigits End-User License (summary)

License covers installation on infrastructure you operate.
Redistribution of binaries requires a white-label agreement.
Terms: https://fodigits.com/licenses
`;

  const prefix = `${product.slug}-${product.version}/`;
  return [
    { name: prefix + "README.txt", data: readme },
    { name: prefix + "LICENSE.txt", data: license },
    { name: prefix + "docker-compose.yml", data: compose },
    { name: prefix + ".env.example", data: env },
  ];
}

function fileName(product, platform) {
  const ext = platform.ext || "zip";
  return `fodigits-${product.slug}-${product.version}-${platform.id}.${ext}`;
}

module.exports = { kitFiles, fileName };
