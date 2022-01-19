import * as pokemons from "./models/kindergartens";

export const resolvers: any = {
  Query: {
    kindergartens: (_source: any, args: any) => pokemons.query(args),
  }
};