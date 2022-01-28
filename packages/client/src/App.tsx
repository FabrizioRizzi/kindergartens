import { useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Connection, Kindergarten } from "@kindergarten/server/types";
import Table, { ColumnsType } from "antd/lib/table";

export const GET_ALL_POKEMONS = gql`
  query Query($limit: Int, $after: Int) {
    kindergartens(limit: $limit, after: $after) {
      edges {
        node {
          DENOMINAZIONE
          CODICE
        }
      }
    }
  }
`;

const App = () => {
  const [q, setQ] = useState<string>("");

  const { loading, data } = useQuery<{
    kindergartens: Connection<Kindergarten>;
  }>(GET_ALL_POKEMONS, { variables: { q } });

  const dataSource = data?.kindergartens.edges.map((pokemon) => pokemon.node);

  const columns: ColumnsType<Kindergarten> = useMemo(
    () => [
      {
        title: "Codice",
        dataIndex: "CODICE",
        key: "CODICE",
      },
      {
        title: "Denominazione",
        dataIndex: "DENOMINAZIONE",
        key: "DENOMINAZIONE",
      },
    ],
    []
  );
  return (
    <div className="App">
      <Table
        dataSource={dataSource}
        pagination={false}
        columns={columns}
        rowKey="CODICE"
        loading={loading}
      />
    </div>
  );
};

export default App;
