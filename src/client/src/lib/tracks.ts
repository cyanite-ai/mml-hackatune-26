import csv from "../../../../data/tracks.csv?raw"

export interface Track {
  track_id: string
  cyanite_id: string
  name: string
  artist_name: string
  duration: number
  license_ccurl: string
}

function parseCsvLine(line: string) {
  const values: string[] = []
  let value = ""
  let quoted = false

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index]
    const next = line[index + 1]

    if (char === "\"" && quoted && next === "\"") {
      value += "\""
      index += 1
      continue
    }

    if (char === "\"") {
      quoted = !quoted
      continue
    }

    if (char === "," && !quoted) {
      values.push(value)
      value = ""
      continue
    }

    value += char
  }

  values.push(value)
  return values
}

export function parseTracks(rawCsv: string): Track[] {
  const [headerLine, ...rows] = rawCsv.trim().split(/\r?\n/)
  const headers = parseCsvLine(headerLine)

  return rows
    .filter(Boolean)
    .map((row) => {
      const values = parseCsvLine(row)
      const item = Object.fromEntries(
        headers.map((header, index) => [header, values[index] ?? ""]),
      ) as Record<keyof Track, string>

      return {
        track_id: item.track_id,
        cyanite_id: item.cyanite_id,
        name: item.name,
        artist_name: item.artist_name,
        duration: Number(item.duration),
        license_ccurl: item.license_ccurl,
      }
    })
}

export const tracks = parseTracks(csv)
