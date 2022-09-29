# Discord-Handlers

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"/></a>

This Module is Licensed Under the [CC-BY-NC-SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/) License. A Copy of the License is Found [Here](https://github.com/ASPNyan/discord-handlers/blob/main/LICENSE.md), As Well As An Easier-to-Read Summary [here](https://github.com/ASPNyan/discord-handlers#License)

---

## About

**discord-handlers Is A [Node.JS](https://nodejs.org) Module, Compatible With JavaScript & TypeScript, Assisting With Creating REST & Non-REST Event Handlers, As Well As Assisting With Creating Slash Commands For Your Discord bot**

- Compatible With (And Uses) [Discord.JS](https:/github/discordjs/discord.js)
- Simple and Easy to Use

---

## Installation

NPM:

```bash
npm i @aspnyan/discord-handlers
```

or

```bash
npm i https://github.com/ASPNyan/discord-handlers
```

Yarn:

```bash
yarn add @aspnyan/discord-handlers
```

or

```bash
yarn add https://github.com/ASPNyan/discord-handlers
```

---

## Setup

(Make Sure You've Already Installed Discord.JS Before Starting This. If you haven't, then run `npm i discord.js`)

### Initial Setup

Do this in your main file (usually `index.js` or `index.ts`)

JavaScript:

- CommonJS:

```javascript
const { Client, Collection } = require("discord.js");
const CMDManager = require("@aspnyan/discord-handlers");
const client = new Client({
  intents: ["Guilds", "GuildMessages"],
});

client.login("token");

export const CMD = new CMDManager(client, {
  CommandDirectory: "./Commands", // This Doesn't Have to be "./Commands", Just Make Sure It Starts With "./"
  EventsDirectory: "./Events", // This Doesn't Have to be "./Events", Just Make Sure It Starts With "./"
  DeveloperServerID: "dev_server_id",
  FileExtension: "CommonJS",
});
```

- ES6:

```javascript
import { Client, Collection } from "discord.js";
import CMDManager from "@aspnyan/discord-handlers";
const client = new Client({
  intents: ["Guilds", "GuildMessages"],
});

client.login("token");

export const CMD = new CMDManager(client, {
  CommandDirectory: "./Commands", // This Doesn't Have to be "./Commands", Just Make Sure It Starts With "./"
  EventsDirectory: "./Events", // This Doesn't Have to be "./Events", Just Make Sure It Starts With "./"
  DeveloperServerID: "dev_server_id",
  FileExtension: "ECMAScript",
});
```

TypeScript:

```typescript
import { Client, Collection } from "discord.js";
import CMDManager from "@aspnyan/discord-handlers";
const client = new Client<boolean>({
  intents: ["Guilds", "GuildMessages"],
});

client.login("token");

export const CMD = new CMDManager(client, {
  CommandDirectory: "./Commands", // This Doesn't Have to be "./Commands", Just Make Sure It Starts With "./"
  EventsDirectory: "./Events", // This Doesn't Have to be "./Events", Just Make Sure It Starts With "./"
  DeveloperServerID: "dev_server_id",
  FileExtension: "TypeScript",
});
```

### Events

Make a new JS/TS file in the folder you stated in your CMDManager Events Directory.
We're Making an Event for "interactionCreate" (We'll need it soon), so call it that, not that it matters.

You should now have a file tree similar to this:

```
Main Folder
|
|- Events -|
|          interactionCreate.js (or .ts for TypeScript)
|
|- index.js (or .ts)
```

Go into the file, and paste the code block of the language you're using

JavaScript:

- CommonJS:

```javascript
const { CMD } = require("../index");

module.exports = {
  name: "interactionCreate",
  once: false,
  rest: false,
  execute: (interaction) => {
    const commands = CMD.CommandCollection;
    const executions = CMD.ExecCollection;
    if (interaction.isChatInputCommand()) {
      const command = commands.get(interaction.commandName);
      if (!command) return;
      const execute = executions.get(interaction.commandName);
      if (!execute || !execute.execute) return;
      execute.execute(interaction.client, interaction, interaction.guild);
    }
  },
};
```

- ES6:

```javascript
import { EventInterface } from "@aspnyan/discord-handlers";
import { CMD } from "../index";

export default {
  name: "interactionCreate",
  once: false,
  rest: false,
  execute: (interaction) => {
    const commands = CMD.CommandCollections;
    const executions = CMD.ExecCollections;
    if (interaction.isChatInputCommand()) {
      const command = commands.get(interaction.commandName);
      if (!command) return;
      const execute = executions.get(interaction.commandName);
      if (!execute || !execute.execute) return;
      execute.execute(interaction.client, interaction, interaction.guild);
    }
  },
};
```

TypeScript:

```typescript
import {
  EventInterface,
  CommandJSONExport,
  CommandInterface,
} from "@aspnyan/discord-handlers";
import { CMD } from "../index";

export default {
  name: "interactionCreate",
  once: false,
  rest: false,
  execute: (interaction) => {
    const commands = CMD.CommandCollections;
    const executions = CMD.ExecCollections;
    if (interaction.isChatInputCommand()) {
      const command: CommandJSONExport | undefined = commands.get(
        interaction.commandName
      );
      if (!command) return;
      const execute: CommandInterface | undefined = executions.get(
        interaction.commandName
      );
      if (!execute || !execute.execute) return;
      execute.execute(interaction.client, interaction, interaction.guild);
    }
  },
} as EventInterface;
```

### Slash Commands

Make a new JS/TS file in the folder you stated in your CMDManager Commands Directory.
We're making a basic "ping" command so call it that, not that it matters.

You should now have a file tree similar to this:

```
Main Folder
|
|- Events -|
|          interactionCreate.js (or .ts for TypeScript)
|
|- Commands -|
|            ping.js (or .ts for TypeScript)
|
|- index.js (or .ts)
```

Go into the file, and paste the code block of the language you're using

JavaScript:

- CommonJS:

```javascript
module.exports = {
  name: "ping",
  description: "Pong!",
  dm_permission: true,
  execute: (client, interaction, guild) => {
    interaction.reply({
      content: "Pong!",
      ephemeral: true,
    });
  },
};
```

- ES6:

```javascript
export default {
  name: "ping",
  description: "Pong!",
  dm_permission: true,
  execute: (client, interaction, guild) => {
    interaction.reply({
      content: "Pong!",
      ephemeral: true,
    });
  },
};
```

TypeScript:

```typescript
import { CommandInterface } from "@aspnyan/discord-handlers";

export default {
  name: "ping",
  description: "Pong!",
  dm_permission: true,
  execute: (client, interaction, guild) => {
    interaction.reply({
      content: "Pong!",
      ephemeral: true,
    });
  },
} as CommandInterface;
```

There's a lot more you can do with Slash Commands and Events that isn't explained here, so make sure to look through all of that. If I have time I might write some documentation for everything, but don't expect it yet.

---

## License

### This Module is Licensed Under A Modified Version of the [CC-BY-NC-SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/) License. A Copy of the License is Found [Here](https://github.com/ASPNyan/discord-handlers/blob/main/LICENSE.md).

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"/></a>

The following is a human-readable summary of (and not a substitute for) the license.

**--Start--**

#### You are free to:

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

- The licensor cannot revoke these freedoms as long as you follow the license terms.

---

#### Under the following terms:

- **Attribution** — You must give [appropriate credit](#), provide a link to the license, and [indicate if changes were made](#). You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- **NonCommercial** — You may not use the material for [commercial purposes](#).
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the [same license](#) as the original.

- **No additional restrictions** — You may not apply legal terms or [technological measures](#) that legally restrict others from doing anything the license permits.

---

#### Notices:

- You do not have to comply with the license for elements of the material in the public domain or where your use is permitted by an applicable [exception or limitation](#).
- No warranties are given. The license may not give you all of the permissions necessary for your intended use. For example, other rights such as [publicity, privacy, or moral rights](#) may limit how you use the material.

**--End--**

To Contact Me About Commercial Use, You Can DM Me on Discord @ `ASP Nyan#1169` (User ID: `387139715301769216`). I am a Part of the Official [Discord.JS Discord Server](https://discord.gg/djs) and [The Coding Den Discord Server](https://discord.gg/code).
