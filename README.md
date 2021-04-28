# towait

A two-way template engine, has 0 or 1 header section and 1 or more bodies. Specifications are currently under development, subject to change in the future.

## Install

```shell
npm install towait
```

## Usage

### JavaScript

```js
const { towait } = require('towait')

// custom filter
towait.let('locale', n => n.toLocaleString())

// Reads data from template and Renders the template with the given data
const email = towait.readFromFile('template.tw', { user: { name: "Sue", gender: "woman" }, points: 1000})
```

### TypeScript

```ts
import { towait } from 'towait'

// custom filter
towait.let('locale', n => n.toLocaleString())

// Reads data from template and Renders the template with the given data
const email = towait.readFromFile('template.tw', { user: { name: "Sue", gender: "woman" }, points: 1000})
```

## Template example

```txt
from: from@mail.address
subject: Welcome to My service

--- html
::: let honorific = switch user.gender
:::   case "man": "Mr."
:::   case "woman": "Ms."
:::   default: "Mx."
::: end
Welcome to My service, {| honorific |} {| user.name |}!

Bonus Points: <b>{| points |> locale |}</b>

<div>
  ::: import 'signature.tw'
</div>
```

## Subset

Towait have a subset for the situation. These are also available in the browser.

### towait/titan

The titan is a template engine that has no data read and import statements.

### towait/tiny

The tiny is a template engine that has no data read, import statements and control syntax.

### towait/t

The t is a minimal template engine with only unhashed inline variables and pipelines.

### towait/y

The y is a data-serialization language similar to YAML but different.
