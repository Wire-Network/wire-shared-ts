import Tracer from "tracer"

const GLOBAL_CATEGORY = "GLOBAL"

export function getInternalLogger(category: string = GLOBAL_CATEGORY) {
  category = category.split("/").pop().replace(/\.[a-z]+$/,"") ?? GLOBAL_CATEGORY
  return Tracer.console({
    format: `{{timestamp}} [${category}] <{{level}}> {{file}}:{{line}} ({{method}}) {{message}}`
  })
}