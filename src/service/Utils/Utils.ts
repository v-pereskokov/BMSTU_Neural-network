export function changeDate(date: string, from: string = '-', to: string = '.'): string {
  if (!date) {
    return '';
  }

  return date.indexOf(from) !== -1
    ? date.split(from).reverse().join(to)
    : date;
}
