export interface Edge<A> {
  cursor: number
  node: A
}

export interface PageInfo {
  endCursor?: number
  hasNextPage: boolean
}

export interface Connection<A> {
  edges: Array<Edge<A>>
  pageInfo: PageInfo
}

export interface Kindergarten {
  ANNOSCOL: number
  CODICE: number
  DENOMINAZIONE: string
  GRADO: string
  TIPO: string
  PARITARIA: string
  INDIRIZZO: string
  CODVIA: number | null
  MUNICIPIO: number | null
  ID_NIL: number
  NIL: string,
  LONG_X_4326: number | null
  LAT_Y_4326: number | null
  Location: string
}
