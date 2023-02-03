# `fakemail`: Fake Email Generator

## Building & Installing

System requirements: NodeJS version 14 or higher, `npm` version 6 or higher.

1. Clone this repo.
1. In the repo folder, run `npm install` to install dependencies.
1. Run `npm run build` to compile TypeScript
1. Run `npm install -g .` to install the CLI tool globally.

## Usage

Run `fakemail` to generate sequentially fake email.

## Development

The un-compiled TypeScript can be invoked by running `npx ts-node src/index.ts` in this folder. This will allow local changes to the TypeScript source to be tested locally without having to recompile.

To recompile changes so that they are available when running `fakemail`, run `npm run build`. Note that when `npm install -g .` was run in during installing, the compiled files were symlinked to the install location, so it is not necessary to reinstall.
