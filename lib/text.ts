export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function shortTitle(title: string) {
  return title.replace(/\s+with\s+/i, " + ");
}
