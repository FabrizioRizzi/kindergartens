import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import { identity } from "fp-ts/lib/function";
import { data } from "../data/kindergartens";
import { toConnection, slice } from "../functions";
import { Connection, Kindergarten } from "../types";

const SIZE = 10;

export function query(args: {
  after?: number;
  limit?: number;
  q?: string;
}): Connection<Kindergarten> {
  const { after, q, limit = SIZE } = args;

  const filterByQ: (as: Kindergarten[]) => Kindergarten[] =
    // filter only if q is defined
    q === undefined
      ? identity
      : A.filter(p => p.DENOMINAZIONE.toLowerCase().includes(q.toLowerCase()));

  const sliceByAfter: (as: Kindergarten[]) => Kindergarten[] =
    // filter only if after is defined
    after === undefined
      ? identity
      : as =>
        pipe(
          as,
          A.findIndex(a => a.CODICE === after),
          O.map(a => a + 1),
          O.fold(() => as, idx => as.slice(idx))
        );

  const results: Kindergarten[] = pipe(
    data,
    filterByQ,
    sliceByAfter,
    // slicing limit + 1 because the `toConnection` function should known the connection size to determine if there are more results
    slice(0, limit + 1)
  );
  return toConnection(results, limit);
}
