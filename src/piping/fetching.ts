const json = (promResp: Promise<Response>) => promResp.then(resp => resp.json())

/* prettier-ignore */
export const fetchAsJson = (what: any) => what |> fetch |> json;